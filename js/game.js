// Define variables
let gameAreaElement = document.getElementById('gameArea');
let paddleElement = document.getElementById('paddle');
let ballElement = document.getElementById('ball');
const pauseButton = document.getElementById('pauseButton');
const restartButton = document.getElementById('restartButton');
// Game state elements
const xpElement = document.getElementById('xp');
const heartsElement = document.getElementById('hearts');
const timerElement = document.getElementById('timer');

// const gameAreaWidth = gameAreaElement.clientWidth;
// const gameAreaHeight = gameAreaElement.clientHeight;
// console.log("gameAreaWidth ;",gameAreaWidth)
// console.log("gameAreaHeight ;",gameAreaHeight)

const speedPaddle = 5;
let moveLeftRight = false;
let animationIdPaddle = null;
let animationIdBall = null;
let isPaused = false;
// Brick Dimensions and Paddings
const cols = 3;
const rows = 1;
const brickColor = '#33cc33';
const bricks = []; // Create an array to store brick objects
const totalPaddingPercent = 16;
const availableWidthPercent = 100 - totalPaddingPercent;
const brickWidthPercent = availableWidthPercent / cols;
const brickHeightPercent = 5;
const paddingPercent = totalPaddingPercent / (cols + 1);

function createBricks() {
    // Calculate paddings x,y
    const horizontalPadding = paddingPercent;
    const verticalPadding = paddingPercent + 1;

    // Create multiple bricks using rows and columns
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = horizontalPadding + col * (brickWidthPercent + horizontalPadding);
            const y = verticalPadding + row * (brickHeightPercent + verticalPadding);
            // Create a new brick
            const brick = new Brick(x, y, brickWidthPercent, brickHeightPercent, brickColor);
            brick.render(gameAreaElement);
            bricks.push(brick);
        }
    }
}

createBricks();

let paddle = new Paddle(paddleElement, speedPaddle, gameAreaElement);
let ball = new Ball(ballElement, gameAreaElement, paddleElement, bricks);

// ball movement 
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        startGame();
    }
});

function startGame() {
    let startMessage = document.getElementById("startMessage");
    startMessage.style.display = "none"; 
    ball.moveBall();
}
// Handle paddle movement
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (!moveLeftRight) {
        moveLeftRight = true;
        paddle.move(event);
    }
}
function handleKeyUp() {
    moveLeftRight = false;
    cancelAnimationFrame(animationIdPaddle);
}

// pauseButton
pauseButton.addEventListener('click', togglePause);

function togglePause() {
    if (!isPaused) {
        // Game is now paused
        pauseButton.textContent = 'Resume';
        if (animationIdBall) {
            cancelAnimationFrame(animationIdBall);
            animationIdBall = null;
            isPaused = true
        }
    } else {
        // Game is now resumed
        pauseButton.textContent = 'Pause';
        isPaused = false
        ball.moveBall();
    }
}

// Reset game state
restartButton.addEventListener('click', restartGame);

function restartGame() {
    // Stop current animation
    if (animationIdBall) {
        cancelAnimationFrame(animationIdBall);
        animationIdBall = null;
    }
    if (animationIdPaddle) {
        cancelAnimationFrame(animationIdPaddle);
        animationIdPaddle = null;
    }
    // Reset game state
    moveLeftRight = false;
    isPaused = false;
    pauseButton.textContent = 'Pause';
    // Clear existing bricks
    bricks.forEach(brick => {
        if (brick.element && brick.element.parentNode) {
            brick.element.parentNode.removeChild(brick.element);
        }
    });
    bricks.length = 0;

    // Recreate bricks
    createBricks();
    // Reset ball position (center above paddle)
    const gameAreaRect = gameAreaElement.getBoundingClientRect();
    paddleElement.style.left = (gameAreaRect.width / 2) + 'px';
    ballElement.style.left = (gameAreaRect.width / 2) + 'px';
    ballElement.style.top = (gameAreaRect.height - 55) + 'px';
    // Create new ball instance with updated bricks
    ball = new Ball(ballElement, gameAreaElement, paddleElement, bricks);
    ball.moveBall();
}

let timeLeft = 180; 
let xp = 0;
let hearts = 3;

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        alert("Time's up! Game Over.");
        clearInterval(timerInterval);
    }
}

const timerInterval = setInterval(updateTimer, 1000);

