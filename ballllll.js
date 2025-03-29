class Ball {
    constructor(ballElement, gameAreaElement, paddleElement, bricks) {
        this.ballElement = ballElement;
        this.gameAreaElement = gameAreaElement;
        this.paddleElement = paddleElement;
        this.bricks = bricks;

        // تحويل السرعة لتكون نسبة مئوية من أبعاد منطقة اللعبة
        this.dx = 0.4; // السرعة الأفقية كنسبة مئوية من عرض منطقة اللعبة
        this.dy = -0.4; // السرعة الرأسية كنسبة مئوية من ارتفاع منطقة اللعبة
        this.remainingBricks = bricks.length; // تتبع عدد الطوب المتبقية

        // تعيين الموضع الأولي للكرة (وسط أعلى المضرب)
        this.setInitialPosition();
    }

    // وظيفة لتعيين الموضع الأولي للكرة
    setInitialPosition() {
        // تحديد موضع أولي للكرة فوق المضرب مباشرة
        const gameArea = this.gameAreaElement.getBoundingClientRect();
        const ball = this.ballElement.getBoundingClientRect();

        // حساب الموضع الأولي كنسبة مئوية
        const initialLeft = 50; // في وسط منطقة اللعبة أفقياً
        const initialTop = 85; // قريب من المضرب

        // تعيين الموضع
        this.ballElement.style.left = `${initialLeft}%`;
        this.ballElement.style.top = `${initialTop}%`;
    }

    checkBrickCollision() {
        let ball = this.ballElement.getBoundingClientRect();
        let gameArea = this.gameAreaElement.getBoundingClientRect();

        for (let i = this.bricks.length - 1; i >= 0; i--) {
            let brick = this.bricks[i].element.getBoundingClientRect();

            // فحص التصادم مع الطوبة
            if (
                ball.right >= brick.left &&
                ball.left <= brick.right &&
                ball.bottom >= brick.top &&
                ball.top <= brick.bottom
            ) {
                // تدمير الطوبة
                this.bricks[i].destroy();
                this.bricks.splice(i, 1);
                this.remainingBricks--;

                // عكس اتجاه الكرة
                this.dy = -this.dy;

                // فحص شرط الفوز
                if (this.remainingBricks === 0) {
                    alert('good! you win ');
                    return false;
                }

                break; // الخروج بعد أول تصادم
            }
        }

        return true;
    }

    moveBall() {
        // الحصول على الأبعاد
        let ball = this.ballElement.getBoundingClientRect();
        let gameArea = this.gameAreaElement.getBoundingClientRect();
        let paddle = this.paddleElement.getBoundingClientRect();

        // تحويل الموضع الحالي إلى نسبة مئوية
        const currentLeftPercent = (this.ballElement.offsetLeft / gameArea.width) * 100;
        const currentTopPercent = (this.ballElement.offsetTop / gameArea.height) * 100;

        // حساب الموضع الجديد كنسبة مئوية
        let newLeftPercent = currentLeftPercent + this.dx;
        let newTopPercent = currentTopPercent + this.dy;

        // حساب عرض وارتفاع الكرة كنسبة مئوية
        const ballWidthPercent = (ball.width / gameArea.width) * 100;
        const ballHeightPercent = (ball.height / gameArea.height) * 100;

        // فحص التصادم مع الجدران وعكس الاتجاه إذا لزم الأمر
        if (newLeftPercent <= 0 || newLeftPercent + ballWidthPercent >= 100) {
            this.dx = -Math.abs(this.dx);
        }
        if (newTopPercent <= 0) {
            this.dy = -this.dy;
        }

        // فحص التصادم مع المضرب وعكس الاتجاه
        const paddleTopPercent = ((paddle.top - gameArea.top) / gameArea.height) * 100;
        const paddleLeftPercent = ((paddle.left - gameArea.left) / gameArea.width) * 100;
        const paddleWidthPercent = (paddle.width / gameArea.width) * 100;
        const paddleHeightPercent = (paddle.height / gameArea.height) * 100;

        if (
            newTopPercent + ballHeightPercent >= paddleTopPercent &&
            newTopPercent + ballHeightPercent <= paddleTopPercent + paddleHeightPercent &&
            newLeftPercent + ballWidthPercent >= paddleLeftPercent &&
            newLeftPercent <= paddleLeftPercent + paddleWidthPercent
        ) {
            // حساب موضع الاصطدام على المضرب لتغيير زاوية الارتداد
            const hitPosition = (newLeftPercent + (ballWidthPercent / 2) - paddleLeftPercent) / paddleWidthPercent;
            this.dx = 0.8 * (hitPosition - 0.5); // 0.5 تجعل المنتصف يعطي dx=0
            this.dy = -Math.abs(this.dy); // دائمًا ترتد للأعلى
        }

        // فحص التصادم مع الطوب
        if (!this.checkBrickCollision()) {
            return;
        }

        // انتهاء اللعبة إذا سقطت الكرة أسفل منطقة اللعبة
        if (newTopPercent + ballHeightPercent >= 100) {
            alert('Game Over');
            return;
        }

        // تحديث موضع الكرة واستمرار الحركة
        this.ballElement.style.left = `${newLeftPercent}%`;
        this.ballElement.style.top = `${newTopPercent}%`;

        requestAnimationFrame(() => this.moveBall());
    }

    // وظيفة لبدء تحريك الكرة
    start() {
        this.setInitialPosition();
        this.moveBall();
    }
}