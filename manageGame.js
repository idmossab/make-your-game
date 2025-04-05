class GameManager {
    constructor(gameAreaElement, paddleElement, ballElement, gameState, pauseButton, restartButton, startMessage, xpElement, heartsElement, timerElement) {
        // DOM Elements
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.ballElement = ballElement;
        this.pauseButton = pauseButton;
        this.restartButton = restartButton;
        this.startMessage = startMessage;
        this.xpElement = xpElement;
        this.heartsElement = heartsElement;
        this.timerElement = timerElement;
        
        // Game state (passed as reference)
        this.gameState = gameState;
        
        // Game objects
        this.paddle = null;
        this.ball = null;
        
        // Setup event listeners for buttons
        this.pauseButton.addEventListener('click', () => this.pauseGame());
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    init() {
        // Create game objects
        this.paddle = new Paddle(this.paddleElement, 5, this.gameAreaElement);
        this.createBricks();
        this.ball = new Ball(this.ballElement, this.gameAreaElement, this.paddleElement, this.gameState.bricks);
        
        // Initialize UI
        this.updateHearts();
        this.updateXP();
        this.updateTimer();
    }

    // Create bricks with configurable layout
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
                this.gameState.bricks.push(brick);
            }
        }
    }

    startGame() {
        if (this.startMessage) {
            this.startMessage.style.display = "none";
        }
        if (!this.gameState.animationIdBall) {
            this.ball.moveBall(this.gameState, this.startMessage, this.pauseButton, this.updateXP.bind(this));
        }
    }

    pauseGame() {
        if (!this.gameState.isPaused) {
            // Game is now paused
            this.pauseButton.textContent = 'Resume';
            if (this.gameState.animationIdBall) {
                clearInterval(this.gameState.timerInterval);
                cancelAnimationFrame(this.gameState.animationIdBall);
                this.gameState.animationIdBall = null;
                this.gameState.isPaused = true;
            }
        } else {
            // Game is now resumed
            this.pauseButton.textContent = 'Pause';
            this.gameState.timerInterval = setInterval(() => this.updateTimer(), 1000);
            this.gameState.isPaused = false;
            this.ball.moveBall(this.gameState, this.startMessage, this.pauseButton, this.updateXP.bind(this));
        }
    }

    restartGame() {
        // Clear timers and animations
        clearInterval(this.gameState.timerInterval);
        if (this.gameState.animationIdBall) {
            cancelAnimationFrame(this.gameState.animationIdBall);
            this.gameState.animationIdBall = null;
        }
        if (this.gameState.animationIdPaddle) {
            cancelAnimationFrame(this.gameState.animationIdPaddle);
            this.gameState.animationIdPaddle = null;
        }
        
        // Reset game state
        this.gameState.moveLeftRight = false;
        this.gameState.isPaused = false;
        this.pauseButton.textContent = 'Pause';
        this.pauseButton.disabled = false;
        
        // Reset game values
        this.gameState.hearts = 3;
        this.gameState.xp = 0;
        this.gameState.timeLeft = 30;
        this.updateHearts();
        this.updateXP();
        this.updateTimer();
        
        // Reset UI
        this.gameState.canStart = false;
        this.startMessage.style.display = 'none';
        
        // Clear existing bricks
        this.gameState.bricks.forEach(brick => {
            if (brick.element && brick.element.parentNode) {
                brick.element.parentNode.removeChild(brick.element);
            }
        });
        this.gameState.bricks.length = 0;

        // Recreate bricks
        this.createBricks();
        
        // Reset positions
        const gameAreaRect = this.gameAreaElement.getBoundingClientRect();
        this.paddleElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.left = (gameAreaRect.width / 2) + 'px';
        this.ballElement.style.top = (gameAreaRect.height - 55) + 'px';
        
        // Create new ball instance with updated bricks
        this.ball = new Ball(this.ballElement, this.gameAreaElement, this.paddleElement, this.gameState.bricks);
        this.ball.moveBall(this.gameState, this.startMessage, this.pauseButton, this.updateXP.bind(this));
        this.gameState.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    handleKeyDown(event) {
        if (!this.gameState.moveLeftRight) {
            this.gameState.moveLeftRight = true;
            this.paddle.move(event, this.gameState);
        }
    }

    handleKeyUp() {
        this.gameState.moveLeftRight = false;
        cancelAnimationFrame(this.gameState.animationIdPaddle);
    }

    updateTimer() {
        if (this.gameState.timeLeft > 0) {
            this.gameState.timeLeft--;
            let minutes = Math.floor(this.gameState.timeLeft / 60);
            let seconds = this.gameState.timeLeft % 60;
            this.timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            clearInterval(this.gameState.timerInterval);
            this.startMessage.textContent = "Time's up! Game Over. - Click Restart";
            this.startMessage.style.display = 'block';
            this.pauseButton.disabled = true;
            this.gameState.canStart = false;
            cancelAnimationFrame(this.gameState.animationIdBall);
        }
    }

    updateXP() {
        this.xpElement.textContent = `XP: ${this.gameState.xp}`;
    }

    updateHearts() {
        this.heartsElement.textContent = `❤ ${this.gameState.hearts}`;
    }
}