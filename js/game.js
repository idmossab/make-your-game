// Define variables
 // DOM Elements
 const gameAreaElement = document.getElementById('gameArea');
 const paddleElement = document.getElementById('paddle');
 const ballElement = document.getElementById('ball');
 const pauseButton = document.getElementById('pauseButton');
 const restartButton = document.getElementById('restartButton');
 const xpElement = document.getElementById('xp');
 const heartsElement = document.getElementById('hearts');
 const timerElement = document.getElementById('timer');
 const startMessage = document.getElementById("startMessage");

const speedPaddle = 5;
const bricks=[];
let moveLeftRight = false;
let animationIdPaddle = null;
let animationIdBall = null;
let isPaused = false;
let canStart = true;
let timerInterval;
let timeLeft = 30; 
let xp = 0;
let hearts = 3;

const gameManager = new GameManager(gameAreaElement,paddleElement,ballElement,bricks,pauseButton,restartButton,startMessage);

gameManager.createBricks();

let paddle = new Paddle(paddleElement, speedPaddle, gameAreaElement);
let ball = new Ball(ballElement, gameAreaElement, paddleElement, bricks);

// ball movement 
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !animationIdBall && canStart) {
        clearInterval(timerInterval);
        gameManager.startGame();
        timerInterval = setInterval(updateTimer, 1000);
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

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        clearInterval(timerInterval);
        startMessage.textContent = "Time's up! Game Over. - Click Restart";
        startMessage.style.display = 'block';
        pauseButton.disabled = true;
        canStart = false;
        cancelAnimationFrame(animationIdBall);
        return;
    }
}
