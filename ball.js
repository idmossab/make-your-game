class Ball {
    constructor(ballElement, gameAreaElement, paddleElement, bricks) {
        this.ballElement = ballElement;
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.bricks = bricks;
        this.dx = 2; // Horizontal speed
        this.dy = -2; // Vertical speed
        this.remainingBricks = bricks.length; // Track remaining bricks
    }

    checkBrickCollision(gameState, updateXP) {
        let ball = this.ballElement.getBoundingClientRect();

        for (let i = this.bricks.length - 1; i >= 0; i--) {
            let brick = this.bricks[i].element.getBoundingClientRect();

            // Check for collision with brick
            if (
                ball.right >= brick.left &&
                ball.left <= brick.right &&
                ball.bottom >= brick.top &&
                ball.top <= brick.bottom
            ) {
                // Destroy the brick
                this.bricks[i].destroy();
                this.remainingBricks--;
                
                // Update XP
                gameState.xp += 100;
                updateXP();
                
                // Reverse ball direction
                this.dy = -this.dy;

                // Check for win condition
                if (this.remainingBricks === 0) {
                    clearInterval(gameState.timerInterval);
                    startMessage.textContent = "Good! You win - Click Restart";
                    startMessage.style.display = 'block';
                    pauseButton.disabled = true;
                    gameState.canStart = false;
                    cancelAnimationFrame(gameState.animationIdBall);
                    return false;
                }

                break; // Exit after first collision
            }
        }

        return true;
    }

    moveBall(gameState, startMessage, pauseButton, updateXP) {
        // Get dimensions
        let ball = this.ballElement.getBoundingClientRect();
        let gameArea = this.gameAreaElement.getBoundingClientRect();
        let paddle = this.paddleElement.getBoundingClientRect();

        // Calculate new position
        let newLeft = this.ballElement.offsetLeft + this.dx;
        let newTop = this.ballElement.offsetTop + this.dy;

        // Check for wall collisions and reverse direction if needed
        if (newLeft <= ball.width / 2) {
            this.dx = Math.abs(this.dx);
        }
        if (newLeft >= gameArea.width - ball.width / 2) {
            this.dx = -Math.abs(this.dx);
        }
        if (newTop <= 0) {
            this.dy = Math.abs(this.dy);
        }

        // Check for paddle collision
        if (
            ball.bottom >= paddle.top &&
            ball.right >= paddle.left &&
            ball.left <= paddle.right
        ) {
            let paddleCenter = paddle.left + paddle.width / 2;
            let ballCenter = ball.left + ball.width / 2;

            let impactPoint = (ballCenter - paddleCenter) / (paddle.width / 2); // Value between -1 and 1

            let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy); // Pythagorean theorem
            let angle = Math.PI / 4 * impactPoint; // Max angle of ±45 degrees

            // Set new dx and dy while maintaining speed
            this.dx = speed * Math.sin(angle);
            this.dy = -speed * Math.cos(angle);
        }

        // Check for brick collisions
        if (!this.checkBrickCollision(gameState, updateXP)) {
            return;
        }

        // End the game if the ball falls below the game area
        if (newTop + ball.height >= gameArea.height) {
            gameState.hearts--;
            document.getElementById('hearts').textContent = `❤ ${gameState.hearts}`;

            if (gameState.hearts <= 0) {
                clearInterval(gameState.timerInterval);
                startMessage.textContent = 'Game Over - Click Restart';
                startMessage.style.display = 'block';
                pauseButton.disabled = true;
                gameState.canStart = false;
                return;
            }

            this.ballElement.style.left = (gameArea.width / 2) + 'px';
            this.ballElement.style.top = (gameArea.height - 50) + 'px';
            this.paddleElement.style.left = (gameArea.width / 2) + 'px';
            cancelAnimationFrame(gameState.animationIdBall);  
            gameState.animationIdBall = null;
            
            // Show the "Press Space" message again
            startMessage.textContent = 'Press Space to Start';
            startMessage.style.display = 'block';
            gameState.canStart = true;
            return;
        }
        
        // Update the ball's position and continue the animation
        this.ballElement.style.left = newLeft + 'px';
        this.ballElement.style.top = newTop + 'px';

        gameState.animationIdBall = requestAnimationFrame(() => this.moveBall(gameState, startMessage, pauseButton, updateXP));
    }
}