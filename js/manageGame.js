class GameManager {
    constructor(gameAreaElement, paddleElement, ballElement, bricks, pauseButton, restartButton, startMessage) {
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.ballElement = ballElement;
        this.bricks = bricks;
        this.pauseButton = pauseButton;
        this.restartButton = restartButton;
        this.startMessage = startMessage;
        this.pauseButton.addEventListener('click', () => this.togglePause());
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    // This method will be called to create the bricks
    createBricks() {
        const cols = 3;
        const rows = 1;
        const brickColor = '#33cc33';
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
                const brick = new Brick(x, y, brickWidthPercent, brickHeightPercent, brickColor);
                brick.render(this.gameAreaElement);
                this.bricks.push(brick);
            }
        }
    }
    startGame() {
        if (this.startMessage) {
            this.startMessage.style.display = "none";
        }
        if (!animationIdBall) {
            ball.moveBall();
        }
    }
    togglePause() {
        if (!isPaused) {
            // Game is now paused
            pauseButton.textContent = 'Resume';
            if (animationIdBall) {
                cancelAnimationFrame(animationIdBall);
                animationIdBall = null;
                isPaused = true
            }
        } else {
            // Game is now resumed
            pauseButton.textContent = 'Pause';
            isPaused = false
            ball.moveBall();
        }
    }
    restartGame() {
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
        this.pauseButton.textContent = 'Pause';
        // Reset hearts
        hearts = 3;
        heartsElement.textContent = `❤ ${hearts}`;
        // Allow starting with space again if needed
        canStart = false; 
        // Hide start message
        this.startMessage.style.display = 'none';
        // Clear existing bricks
        this.bricks.forEach(brick => {
            if (brick.element && brick.element.parentNode) {
                brick.element.parentNode.removeChild(brick.element);
            }
        });
        this.bricks.length = 0;
 
        // Recreate bricks
        this.createBricks();
        // Reset ball position (center above paddle)
        const gameAreaRect = this.gameAreaElement.getBoundingClientRect();
        this.paddleElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.top = (gameAreaRect.height - 55) + 'px';
        // Create new ball instance with updated bricks
        ball = new Ball(this.ballElement, this.gameAreaElement, this.paddleElement, this.bricks);
        ball.moveBall();

    }
}
