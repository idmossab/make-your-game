class GameManager {
    constructor(gameAreaElement, paddleElement, ballElement, bricks, startMessage, startMessageText, menuButtons, resumeButton, restartButton) {
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.ballElement = ballElement;
        this.bricks = bricks;
        this.startMessage = startMessage;
        this.startMessageText = startMessageText;
        this.menuButtons = menuButtons;
        this.resumeButton = resumeButton;
        this.restartButton = restartButton;
        // Game objects
        this.paddle = null;
        this.ball = null;
        this.resumeButton.addEventListener('click', () => this.resumeGame());
        this.restartButton.addEventListener('click', () => this.restartGame());
    }
    init() {
        // Create game objects
        this.paddle = new Paddle(this.paddleElement, speedPaddle, this.gameAreaElement);
        this.createBricks();
        this.ball = new Ball(this.ballElement, this.gameAreaElement, this.paddleElement, this.bricks);
    }
    // This method will be called to create the bricks
    createBricks() {
        const cols = 6;
        const rows = 4;
        const totalPaddingPercent = 16;
        const availableWidthPercent = 100 - totalPaddingPercent;
        const brickWidthPercent = availableWidthPercent / cols;
        const brickHeightPercent = 5;
        const paddingPercent = totalPaddingPercent / (cols + 1);
        const horizontalPadding = paddingPercent;
        const verticalPadding = paddingPercent + 1;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = horizontalPadding + col * (brickWidthPercent + horizontalPadding);
                const y = verticalPadding + row * (brickHeightPercent + verticalPadding);
                const brick = new Brick(x, y, brickWidthPercent, brickHeightPercent);
                brick.render(this.gameAreaElement);
                this.bricks.push(brick);
            }
        }
    }
    startGame() {
        if (isGameOver) {
            this.restartGame();
            return;
        }
        // Hide start message
        this.startMessage.style.display = "none";
        
         // Start the game if not already running
         if (!animationIdBall && canStart) {
            isPaused = false;
            this.ball.moveBall();
            if (!timerInterval) {
                timerInterval = setInterval(() => this.updateTimer(), 100);
            }
        }
    }
    togglePause() {
        if (isGameOver) return;
        
        if (!isPaused) {
            this.pauseGame();
        } else {
            this.resumeGame();
        }
    }
    pauseGame() {
        if (!isPaused) {
            // Game is now paused
            pauseButton.textContent = 'Resume';
            if (animationIdBall) {
                clearInterval(timerInterval);
                cancelAnimationFrame(animationIdBall);
                animationIdBall = null;
                isPaused = true
            }
        } else {
            clearInterval(timerInterval);
            // Game is now resumed
            pauseButton.textContent = 'Pause';
            timerInterval = setInterval(() => this.updateTimer(), 100);
            isPaused = false
            this.ball.moveBall();
        }
    }
    restartGame() {
        // Clear timers and animations
        clearInterval(timerInterval);
        // Stop current animation
        if (animationIdBall) {
            cancelAnimationFrame(animationIdBall);
            animationIdBall = null;
        }
        if (animationIdPaddle) {
            cancelAnimationFrame(animationIdPaddle);
            animationIdPaddle = null;
        }
        // Reset game state
        moveLeftRight = false;
        isPaused = false;
        canStart = false;
        isGameOver = false;
        hearts = 3;
        xp = 0;
        timeLeft = 180;

        this.pauseButton.textContent = 'Pause';
        this.pauseButton.disabled = false;
        heartsElement.textContent = `❤ ${hearts}`;
        xpElement.textContent = `XP: ${xp}`;
        this.updateTimer();
        this.startMessage.style.display = 'none';
        // Clear existing bricks
        this.bricks.forEach(brick => {
            if (brick.element && brick.element.parentNode) {
                brick.element.parentNode.removeChild(brick.element);
            }
        });
        this.bricks.length = 0;
        this.createBricks();
        // Reset ball position (center above paddle)
        const gameAreaRect = this.gameAreaElement.getBoundingClientRect();
        this.paddleElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.top = (gameAreaRect.height - 55) + 'px';
        // Create new ball instance with updated bricks
        this.ball = new Ball(this.ballElement, this.gameAreaElement, this.paddleElement, this.bricks);
        this.ball.moveBall();
        timerInterval = setInterval(() => this.updateTimer(), 100);
    }
    handleKeyDown(event) {
        if (!moveLeftRight) {
            moveLeftRight = true;
            this.paddle.move(event);
        }
    }

    handleKeyUp() {
        moveLeftRight = false;
        cancelAnimationFrame(animationIdPaddle);
    }
    updateTimer() {
        if (timeLeft > 0.1) {
            timeLeft -= 0.1; // Decrease by 0.1 seconds since interval is 100ms
            let minutes = Math.floor(timeLeft / 60);
            let seconds = Math.floor(timeLeft % 60);
            // let tenths = Math.floor((timeLeft % 1) * 10);/*.${tenths}*/
            timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            clearInterval(timerInterval);
            startMessage.textContent = "Time's up! Game Over. - Click Restart";
            startMessage.style.display = 'block';
            pauseButton.disabled = true;
            canStart = false;
            cancelAnimationFrame(animationIdBall);
            return;
        }
    }
}
