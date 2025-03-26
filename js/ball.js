class Ball {
    constructor(ballElement, gameAreaElement, paddleElement) {
        this.ballElement = ballElement;
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.dx = 2; // Horizontal speed
        this.dy = -2; // Vertical speed
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
        if (newLeft <= 0 || newLeft + ball.width >= gameArea.width) {
            this.dx = -this.dx;
        }
        if (newTop <= 0) {
            this.dy = -this.dy;
        }

        // Check for paddle collision and reverse direction
        if (
            ball.bottom >= paddle.top &&
            ball.right >= paddle.left &&
            ball.left <= paddle.right
        ) {
            this.dy = -Math.abs(this.dy);
        }

        // End the game if the ball falls below the game area
        if (newTop + ball.height >= gameArea.height) {
            alert('Game Over');
            return;
        }

        // Update the ball's position and continue the animation
        this.ballElement.style.left = newLeft + 'px';
        this.ballElement.style.top = newTop + 'px';

        requestAnimationFrame(() => this.moveBall());
    }
}