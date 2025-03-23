const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // خصائص الكرة
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;

// رسم الكرة
function drawBall() {
    ctx.beginPath(); // بدء الرسم
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // رسم دائرة (الكرة)
    ctx.fillStyle = '#0095DD'; // لون الكرة
    ctx.fill(); // ملء الدائرة
    ctx.closePath(); // إنهاء الرسم
}

// استدعاء الدالة لرؤية الكرة
drawBall();