// Define variables
let gameAreaElement = document.getElementById('gameArea');
let paddleElement = document.getElementById('paddle');
const brickWidth = 60;
const brickHeight = 20;
const cols = 8;
const rows = 4;
const padding = 17.1; // Padding between bricks

// Create multiple bricks using rows and columns
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        // Determine the position of each brick
        const x = col * (brickWidth + padding);
        const y = row * (brickHeight + padding);

        // Create a new brick
        const brick = new Brick(x, y);
        brick.render(gameAreaElement); // Add the brick element to the game area
    }
}

// Create a paddle object using the paddle element
let paddle = new Paddle(paddleElement, 20, gameAreaElement);

// Handle paddle movement on keydown event
document.addEventListener('keydown', function(event) {
    paddle.move(event); // Move the paddle based on the key pressed
});