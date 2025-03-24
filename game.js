// تعريف المتغيرات
let gameArea = document.getElementById('gameArea').getBoundingClientRect();
let paddleElement = document.getElementById('paddle');

// إنشاء الكائنات باستخدام المتغيرات المعرفة سابقًا
let paddle = new Paddle(paddleElement, 20, gameArea);
// let ball = new Ball('ball', 5);

// إدارة الحركة
document.addEventListener('keydown', function(event) {
    paddle.move(event);
});

// // حركة الكرة
// setInterval(function() {
//     ball.move();
// }, 20);