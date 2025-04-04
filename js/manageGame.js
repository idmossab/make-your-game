// manageGame.js

class ManageGame {
    constructor(gameAreaElement, paddleElement, ballElement, pauseButton, restartButton, xpElement, heartsElement, timerElement, bricks, paddle, ball) {
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.ballElement = ballElement;
        this.pauseButton = pauseButton;
        this.restartButton = restartButton;
        this.xpElement = xpElement;
        this.heartsElement = heartsElement;
        this.timerElement = timerElement;
        this.bricks = bricks;
        this.paddle = paddle;
        this.ball = ball;

        this.isPaused = false;
        this.animationIdBall = null;
        this.animationIdPaddle = null;
        this.moveLeftRight = false;
        this.timeLeft = 180;

        this.addListeners();
    }

    addListeners() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                this.startGame();
            } else {
                this.handleKeyDown(e);
            }
        });

        document.addEventListener("keyup", () => this.handleKeyUp());
        this.pauseButton.addEventListener("click", () => this.togglePause());
        this.restartButton.addEventListener("click", () => this.restartGame());
    }

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
        document.getElementById("startMessage").style.display = "none";
        this.ball.moveBall();
    }

    handleKeyDown(event) {
        if (!this.moveLeftRight) {
            this.moveLeftRight = true;
            this.paddle.move(event);
        }
    }

    handleKeyUp() {
        this.moveLeftRight = false;
        cancelAnimationFrame(this.animationIdPaddle);
    }

    togglePause() {
        if (!this.isPaused) {
            this.pauseButton.textContent = 'Resume';
            cancelAnimationFrame(this.animationIdBall);
            this.animationIdBall = null;
            this.isPaused = true;
        } else {
            this.pauseButton.textContent = 'Pause';
            this.isPaused = false;
            this.ball.moveBall();
        }
    }

    restartGame() {
        cancelAnimationFrame(this.animationIdBall);
        cancelAnimationFrame(this.animationIdPaddle);

        this.moveLeftRight = false;
        this.isPaused = false;
        this.pauseButton.textContent = 'Pause';

        this.bricks.forEach(brick => {
            if (brick.element && brick.element.parentNode) {
                brick.element.parentNode.removeChild(brick.element);
            }
        });
        this.bricks.length = 0;

        this.createBricks();

        const gameAreaRect = this.gameAreaElement.getBoundingClientRect();
        this.paddleElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.top = (gameAreaRect.height - 55) + 'px';

        this.ball = new Ball(this.ballElement, this.gameAreaElement, this.paddleElement, this.bricks);
        this.ball.moveBall();
    }

    updateTimer() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            let minutes = Math.floor(this.timeLeft / 60);
            let seconds = this.timeLeft % 60;
            this.timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            alert("Time's up! Game Over.");
            clearInterval(this.timerInterval);
        }
    }
}
