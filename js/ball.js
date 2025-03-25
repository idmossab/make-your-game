class Ball {
    constructor(ballElement, gameAreaElement) {
        this.ball = ballElement;
        this.gameAreaElement = gameAreaElement;
        this.dx = 2;
        this.dy = -2;
        this.fps = 0; // Frame counter
        this.lastFrameTime = performance.now(); // Time of the last frame
    }

    moveBall() {
        let gameArea = this.gameAreaElement.getBoundingClientRect(); // Get the dimensions of the game area

        // Calculate the new position of the ball based on its speed
        let newLeft = this.ball.offsetLeft + this.dx;
        let newTop = this.ball.offsetTop + this.dy;

        // Update the ball's position on the screen
        this.ball.style.left = newLeft + 'px';
        this.ball.style.top = newTop + 'px';

        // Check if the ball hits the left or right wall
        if (newLeft <= 0 || newLeft + this.ball.offsetWidth >= gameArea.width) {
            this.dx = -this.dx;
        }

        // Check if the ball hits the top wall
        if (newTop <= 0) {
            this.dy = -this.dy;
        }

        // Check if the ball hits the bottom wall (game over condition)
        if (newTop + this.ball.offsetHeight >= gameArea.height) {
            alert('Game Over');
            return;
        }

        // Calculate the frame rate (FPS)
        this.fps++;
        let now = performance.now(); // Get the current time
        if (now - this.lastFrameTime >= 1000) { // If one second has passed
            console.log("FPS:", this.fps); // Log the FPS count to the console
            this.fps = 0; // Reset the frame counter
            this.lastFrameTime = now; // Update the last frame time
        }

        // Continue updating the ball's movement in the next animation frame
        requestAnimationFrame(() => this.moveBall());
    }
}