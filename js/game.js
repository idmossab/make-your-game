// Define variables
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
const bricks = [];
let moveLeftRight = false;
let animationIdPaddle = null;
let animationIdBall = null;
let isPaused = false;
let canStart = true;
let timerInterval;
let timeLeft = 30;
let xp = 0;
let hearts = 3;

const gameManager = new GameManager(gameAreaElement, paddleElement, ballElement, bricks, pauseButton, restartButton, startMessage);

// Initialize game
gameManager.init();

// ball movement 
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !animationIdBall && canStart) {
        clearInterval(timerInterval);
        gameManager.startGame();
        timerInterval = setInterval(()=> gameManager.updateTimer(), 1000);
    }
});

// Handle paddle movement
document.addEventListener('keydown', (event) => gameManager.handleKeyDown(event));
document.addEventListener('keyup', () => gameManager.handleKeyUp());

