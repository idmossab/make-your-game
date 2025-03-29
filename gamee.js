// Define variables
let gameAreaElement = document.getElementById('gameArea');
let paddleElement = document.getElementById('paddle');
let ballElement = document.getElementById('ball');

const gameAreaWidth = gameAreaElement.clientWidth;
const gameAreaHeight = gameAreaElement.clientHeight;
console.log(gameAreaWidth)

const cols = 7;
const rows = 4;
const brickColor = '#33cc33';
const bricks = []; // Create an array to store brick objects
let moveLeftRight = false;
let animationId = null;

// إعادة حساب أبعاد الطوب لتغطية منطقة اللعبة بالكامل
const totalPaddingPercent = 16; // إجمالي المساحة للتباعدات (البادينج) كنسبة مئوية
const availableWidthPercent = 100 - totalPaddingPercent; // المساحة المتاحة بعد طرح التباعدات
const brickWidthPercent = availableWidthPercent / cols; // توزيع المساحة المتاحة بالتساوي على عدد الأعمدة
const paddingPercent = totalPaddingPercent / (cols + 1); // توزيع التباعد بالتساوي بين الأعمدة

const brickHeightPercent = 5; // نسبة مئوية من ارتفاع منطقة اللعبة
const verticalPaddingPercent = 3; // التباعد الرأسي بين الصفوف

const speedPaddle = 5;

// تحديث حجم عناصر اللعبة عند تغيير حجم النافذة
window.addEventListener('resize', updateGameDimensions);

function updateGameDimensions() {
    // إعادة إنشاء الطوب بعد تغيير حجم النافذة
    resetBricks();
}

function resetBricks() {
    // إزالة جميع الطوب الموجود
    while (bricks.length > 0) {
        const brick = bricks.pop();
        brick.destroy();
    }

    // إعادة إنشاء الطوب بالأبعاد الجديدة
    createBricks();
}

function createBricks() {
    // حساب المساحة المتاحة والتباعدات
    const horizontalPadding = paddingPercent;

    // Create multiple bricks using rows and columns
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // حساب الموضع بناءً على رقم العمود والصف مع مراعاة التباعدات
            const x = horizontalPadding + col * (brickWidthPercent + horizontalPadding);
            const y = verticalPaddingPercent + row * (brickHeightPercent + verticalPaddingPercent);

            // Create a new brick
            const brick = new Brick(x, y, brickWidthPercent, brickHeightPercent, brickColor);
            brick.render(gameAreaElement);
            bricks.push(brick);
        }
    }
}

// إنشاء الطوب الأولي
createBricks();

let paddle = new Paddle(paddleElement, speedPaddle, gameAreaElement);
let ball = new Ball(ballElement, gameAreaElement, paddleElement, bricks);

ball.moveBall();


// Handle paddle movement on keydown event
document.addEventListener('keydown', function(event) {
    if (!moveLeftRight) {
        moveLeftRight = true;
        paddle.move(event); // Move the paddle based on the key pressed
    }
});

document.addEventListener('keyup', () => {
    moveLeftRight = false;
    cancelAnimationFrame(animationId);
});