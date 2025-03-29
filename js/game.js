// Define variables
let gameAreaElement = document.getElementById('gameArea');
let paddleElement = document.getElementById('paddle');
let ballElement = document.getElementById('ball');

const gameAreaWidth = gameAreaElement.clientWidth;
const gameAreaHeight = gameAreaElement.clientHeight;

const cols = 7;
const rows = 4;
const brickColor = '#33cc33';
const bricks = []; // Create an array to store brick objects
let moveLeftRight = false;
let animationId = null;

// Recalculate brick dimensions to cover the entire game area
const totalPaddingPercent = 16; // Total space allocated for paddings as a percentage
const availableWidthPercent = 100 - totalPaddingPercent; // Space available after subtracting paddings
const brickWidthPercent = availableWidthPercent / cols; // Distribute available space evenly across the number of columns
const paddingPercent = totalPaddingPercent / (cols + 1); // Distribute padding evenly between columns
const brickHeightPercent = 5; // Percentage of game area height allocated to brick height
const verticalPaddingPercent = 3; // Vertical padding between rows
const speedPaddle = 5;

function createBricks() {
    // Calculate available space and paddings
    const horizontalPadding = paddingPercent;

    // Create multiple bricks using rows and columns
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = horizontalPadding + col * (brickWidthPercent + horizontalPadding);
            const y = verticalPaddingPercent + row * (brickHeightPercent + verticalPaddingPercent);

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

ball.moveBall();


// Handle paddle movement on keydown event
document.addEventListener('keydown', function(event) {
    if (!moveLeftRight) {
        moveLeftRight = true
        paddle.move(event); // Move the paddle based on the key pressed
    }
});
document.addEventListener('keyup', () => {
    moveLeftRight = false
    cancelAnimationFrame(animationId)
})