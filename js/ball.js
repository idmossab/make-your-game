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
            this.dy = -this.dy;
        }

        // Check for paddle collision and reverse direction
        // Check for paddle collision
        if (
            ball.bottom >= paddle.top &&
            ball.right >= paddle.left &&
            ball.left <= paddle.right
        ) {
            // حساب موقع الاصطدام بالنسبة للمضرب
            let paddleCenter = paddle.left + paddle.width / 2;
            let ballCenter = ball.left + ball.width / 2;

            let impactPoint = (ballCenter - paddleCenter) / (paddle.width / 2);

            // ضبط سرعة الكرة بعد الاصطدام
            let maxAngle = Math.PI / 3; // أقصى زاوية (60 درجة)

            let bounceAngle = impactPoint * maxAngle; // حساب الزاوية بناءً على الاصطدام

            let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy); // تثبيت السرعة

            this.dx = speed * Math.sin(bounceAngle); // تحديد السرعة الأفقية
            this.dy = -Math.abs(speed * Math.cos(bounceAngle)); // تحديد السرعة العمودية

            // ضبط سرعة الكرة بعد الاصطدام
           // this.dx = impactPoint * 3;  // 5 هي أقصى سرعة أفقية
            //this.dy = -Math.abs(this.dy);  // الكرة ترتد لأعلى
        }


        // Check for brick collisions
        if (!this.checkBrickCollision()) {
            return;
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