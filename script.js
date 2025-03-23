// تحديد موقع الكرة
let ball = document.getElementById('ball');

// تحديد السرعة
let dx = 2; // سرعة الكرة في الاتجاه الأفقي
let dy = 2; // سرعة الكرة في الاتجاه العمودي

// تحديث موقع الكرة
function moveBall() {
    let ballPosition = ball.getBoundingClientRect();
    let gameArea = document.getElementById('gameArea').getBoundingClientRect();

    // تحديث موقع الكرة بناءً على السرعة
    ball.style.left = ballPosition.left + dx + 'px';
    ball.style.top = ballPosition.top + dy + 'px';

    // تحقق من الجدران (الجانب الأيمن والأيسر)
    if (ballPosition.left <= gameArea.left || ballPosition.right >= gameArea.right) {
        dx = -dx; // عكس الاتجاه الأفقي
    }

    // تحقق من الجدار العلوي
    if (ballPosition.top <= gameArea.top) {
        dy = -dy; // عكس الاتجاه العمودي
    }

    // تحقق من الجدار السفلي (إذا كانت الكرة قد سقطت خارج اللعبة)
    if (ballPosition.bottom >= gameArea.bottom) {
        // هنا يمكن إضافة منطق "Game Over"
        alert('Game Over');
        return;
    }

    // استمر في تحديث الحركة
    requestAnimationFrame(moveBall);
}

// بدء الحركة
moveBall();