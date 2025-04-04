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
let startMessage = document.getElementById("startMessage");


// const gameAreaWidth = gameAreaElement.clientWidth;
// const gameAreaHeight = gameAreaElement.clientHeight;
// console.log("gameAreaWidth ;",gameAreaWidth)
// console.log("gameAreaHeight ;",gameAreaHeight)

const speedPaddle = 5;
let moveLeftRight = false;
let animationIdPaddle = null;
let animationIdBall = null;
let isPaused = false;
const bricks=[]

const gameManager = new GameManager(gameAreaElement,paddleElement,ballElement,bricks,pauseButton,restartButton,startMessage);

// Create the bricks when you need them
gameManager.createBricks();


let paddle = new Paddle(paddleElement, speedPaddle, gameAreaElement);
let ball = new Ball(ballElement, gameAreaElement, paddleElement, bricks);

// ball movement 
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        gameManager.startGame();
    }
});
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



// Reset game state


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

