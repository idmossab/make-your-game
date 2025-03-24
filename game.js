// Define variables
let gameAreaElement = document.getElementById('gameArea');
let paddleElement = document.getElementById('paddle');

// Create objects using the defined variables
let paddle = new Paddle(paddleElement, 20, gameAreaElement);

// Manage movement
document.addEventListener('keydown', function(event) {
    paddle.move(event);
});