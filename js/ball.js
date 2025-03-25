class Ball {
    constructor(ballElement, gameAreaElement, paddleElement) {
        this.ball = ballElement;
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement
        this.dx = 2;
        this.dy = -2;
        this.fps = 0; // Frame counter
        this.lastFrameTime = performance.now(); // Time of the last frame
    }

    moveBall() {
        let gameArea = this.gameAreaElement.getBoundingClientRect();
        let paddle = this.paddleElement.getBoundingClientRect();
        let ball = this.ball.getBoundingClientRect();

        // Calculate the new position of the ball based on its speed
        let newLeft = this.ball.offsetLeft + this.dx;
        let newTop = this.ball.offsetTop + this.dy;

        // Check if the ball hits the left wall
        if (newLeft <= 0) {
            this.dx = Math.abs(this.dx); // Ensure moving right
        }

        // Check if the ball hits the right wall
        if (newLeft + ball.width >= gameArea.width) {
            this.dx = -Math.abs(this.dx); // Ensure moving left
        }

        // Check if the ball hits the top wall
        if (newTop <= 0) {
            this.dy = Math.abs(this.dy); // Ensure moving down
        }

        // Check if the ball hits the bottom wall (game over condition)
        if (newTop + ball.height >= gameArea.height) {
            alert('Game Over');
            return;
        }

        // Paddle collision detection
        if (
            // Check if ball's bottom is at or below paddle's top
            ball.bottom >= paddle.top &&
            // Check if ball's horizontal range overlaps with paddle
            ball.right >= paddle.left &&
            ball.left <= paddle.right
        ) {
            // Reverse vertical direction when hitting paddle
            this.dy = -Math.abs(this.dy); // Ensure upward movement

            // Optional: Add some horizontal variation
            let paddleCenter = paddle.left + (paddle.width / 2);
            let ballCenter = ball.left + (ball.width / 2);

            // Add slight horizontal angle based on where the ball hits the paddle
            if (ballCenter < paddleCenter) {
                // Ball hits left side of paddle
                this.dx = -Math.abs(this.dx);
            } else {
                // Ball hits right side of paddle
                this.dx = Math.abs(this.dx);
            }
        }

        // Update ball position
        this.ball.style.left = newLeft + 'px';
        this.ball.style.top = newTop + 'px';

        // Continue animation
        requestAnimationFrame(() => this.moveBall());
    }
}