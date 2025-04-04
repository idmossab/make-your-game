class GameManager {
    constructor(gameAreaElement, bricks, pauseButton, ball) {
        this.gameAreaElement = gameAreaElement;
        this.bricks = bricks;
        this.pauseButton = pauseButton;
        this.ball = ball;

        this.pauseButton.addEventListener('click', () => this.togglePause());
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
}
