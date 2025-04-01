// Define variables
let gameAreaElement = document.getElementById('gameArea');
let paddleElement = document.getElementById('paddle');
let ballElement = document.getElementById('ball');
const pauseButton = document.getElementById('pauseButton');
const restartButton = document.getElementById('restartButton');

// const gameAreaWidth = gameAreaElement.clientWidth;
// const gameAreaHeight = gameAreaElement.clientHeight;
// console.log("gameAreaWidth ;",gameAreaWidth)
// console.log("gameAreaHeight ;",gameAreaHeight)

const speedPaddle = 5;
let moveLeftRight = false;
let animationIdPaddle = null;
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

// Handle ball movement 
ball.moveBall();

// pauseButton.addEventListener('click', togglePause);

// Handle paddle movement
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

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);