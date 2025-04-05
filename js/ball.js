class Ball {
    constructor(ballElement, gameAreaElement, paddleElement, bricks) {
        this.ballElement = ballElement;
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.bricks = bricks
        this.dx = 2; // Horizontal speed
        this.dy = -2; // Vertical speed
        this.remainingBricks = bricks.length; // Track remaining bricks
    }
    checkBrickCollision() {
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
                this.bricks.splice(i, 1);
                this.remainingBricks--;
                //update xp
                xp += 100;
                xpElement.textContent = `XP: ${xp}`;
                // Reverse ball direction
                this.dy = -this.dy;

                // Check for win condition
                if (this.remainingBricks === 0) {
                    alert('good! you win ');
                    return false;
                }

                break; // Exit after first collision
            }
        }

        return true;
    }

    moveBall() {
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
            console.log("paddleCenter :", ballCenter - paddleCenter)
            console.log("ballCenter :", ballCenter)

            let impactPoint = (ballCenter - paddleCenter) / (paddle.width / 2);//value between -1_1
            console.log("imp :", impactPoint)

            let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy); // theoreme de pythagore
            let angle = Math.PI / 4 * impactPoint; // Max angle of ±45 degrees pi radians=180 degrés

            // Set new dx and dy while maintaining speed
            /*
                 y  |    
                    |   * (ball)
                    |  /  
                    | / θ (angle)
                    |/_________ x
            
            cos(θ)= adjacent/hypotenuse
            sin(𝜃)=opposite/hypotenuse 
            */
            this.dx = speed * Math.sin(angle);
            this.dy = -speed * Math.cos(angle);

            //error vitesse
            // this.dx = impactPoint * 3; 
            // this.dy = -Math.abs(this.dy); 
        }


        // Check for brick collisions
        if (!this.checkBrickCollision()) {
            return;
        }
        // End the game if the ball falls below the game area
        if (newTop + ball.height >= gameArea.height) {
            hearts--;
            heartsElement.textContent = `❤ ${hearts}`;

            if (hearts <= 0) {
                clearInterval(timerInterval);
                startMessage.textContent = 'Game Over - Press Restart';
                startMessage.style.display = 'block';
                canStart = false;
                return;
            }

            this.ballElement.style.left = (gameArea.width / 2) + 'px';
            this.ballElement.style.top = (gameArea.height - 50) + 'px';
            this.paddleElement.style.left = (gameArea.width / 2) + 'px';
            cancelAnimationFrame(animationIdBall);  
            animationIdBall = null;
            // Show the "Press Space" message again
            startMessage.textContent = 'Press Space to Start';
            startMessage.style.display = 'block';
            canStart = true;
            return
        }
        // Update the ball's position and continue the animation
        this.ballElement.style.left = newLeft + 'px';
        this.ballElement.style.top = newTop + 'px';

        animationIdBall = requestAnimationFrame(() => this.moveBall());
    }
}