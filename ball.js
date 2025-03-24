class Ball {
    constructor(ballElement) {
        // تحديد عنصر الكرة
        this.ball = ballElement;
        this.dx = 2; // سرعة الكرة في الاتجاه الأفقي
        this.dy = -2; // سرعة الكرة في الاتجاه الرأسي (صاعدة)
        this.fps = 0; // عداد الإطارات
        this.lastFrameTime = performance.now(); // وقت آخر إطار
    }

    // دالة لتحريك الكرة
    moveBall() {
        let gameArea = document.getElementById('gameArea').getBoundingClientRect(); // الحصول على أبعاد منطقة اللعبة

        // حساب الموقع الجديد للكرة بناءً على السرعة
        let newLeft = this.ball.offsetLeft + this.dx;
        let newTop = this.ball.offsetTop + this.dy;

        // تحديث موقع الكرة على الشاشة
        this.ball.style.left = newLeft + 'px';
        this.ball.style.top = newTop + 'px';

        // التحقق من تصادم الكرة بالجدار الأيسر أو الأيمن
        if (newLeft <= 0 || newLeft + this.ball.offsetWidth >= gameArea.width) {
            this.dx = -this.dx; // عكس الاتجاه الأفقي
        }

        // التحقق من تصادم الكرة بالجدار العلوي
        if (newTop <= 0) {
            this.dy = -this.dy; // عكس الاتجاه الرأسي
        }

        // التحقق من تصادم الكرة بالجدار السفلي (نهاية اللعبة)
        if (newTop + this.ball.offsetHeight >= gameArea.height) {
            alert('Game Over');
            return; // إيقاف تنفيذ المزيد من الحركات
        }

        // حساب عدد الإطارات (FPS)
        this.fps++;
        let now = performance.now(); // الحصول على الوقت الحالي
        if (now - this.lastFrameTime >= 1000) { // إذا مرّ ثانية كاملة
            console.log("FPS:", this.fps); // عرض عدد الإطارات في الثانية في الـ console
            this.fps = 0; // إعادة تعيين عداد الإطارات
            this.lastFrameTime = now; // تحديث وقت آخر إطار
        }

        // الاستمرار في تحريك الكرة في الإطار التالي
        requestAnimationFrame(() => this.moveBall());
    }
}

// لإنشاء الكرة وبدء حركتها