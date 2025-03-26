// Define variables
let gameAreaElement = document.getElementById('gameArea');
let paddleElement = document.getElementById('paddle');
let ballElement = document.getElementById('ball')

const brickWidth = 60;
const brickHeight = 20;
const brickColor = '#33cc33'
const cols = 8;
const rows = 4;
const padding = 17.1; // Padding between bricks
const speedPaddle = 20;
const bricks = []; // Create an array to store brick objects

// Create multiple bricks using rows and columns
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

        const x = col * (brickWidth + padding);
        const y = row * (brickHeight + padding);

        // Create a new brick
        const brick = new Brick(x, y, brickWidth, brickHeight, brickColor);
        brick.render(gameAreaElement);
        bricks.push(brick);
    }
}

let paddle = new Paddle(paddleElement, speedPaddle, gameAreaElement);
let ball = new Ball(ballElement, gameAreaElement, paddleElement, bricks);

ball.moveBall();

// Handle paddle movement on keydown event
document.addEventListener('keydown', function(event) {
    paddle.move(event); // Move the paddle based on the key pressed
});