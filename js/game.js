// Define variables
const gameAreaElement = document.getElementById('gameArea');
const paddleElement = document.getElementById('paddle');
const ballElement = document.getElementById('ball');
const xpElement = document.getElementById('xp');
const heartsElement = document.getElementById('hearts');
const timerElement = document.getElementById('timer');
const startMessage = document.getElementById("startMessage");
const startMessageText = document.getElementById("startMessageText");
const menuButtons = document.getElementById("menuButtons");
const resumeButton = document.getElementById("resumeButton");
const restartButton = document.getElementById('restartButton');
const howToPlayButton = document.getElementById('howToPlayButton');
const howToPlayModal = document.getElementById('howToPlayModal');
const closeModalButton = document.querySelector('.close');

// Game variables
const speedPaddle = 5;
const bricks = [];
let moveLeftRight = false;
let animationIdPaddle = null;
let animationIdBall = null;
let isGameOver = false;
let isPaused = false;
let canStart = true;
let timerInterval;
let timeLeft = 180;
let xp = 0;
let hearts = 3;

// Initialize game manager
const gameManager = new GameManager(
    gameAreaElement, 
    paddleElement, 
    ballElement, 
    bricks, 
    startMessage,
    startMessageText,
    menuButtons,
    resumeButton,
    restartButton
);
// Initialize game
gameManager.init();

// Key event listeners
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        gameManager.handleSpaceKey();
    }
});

// Handle paddle movement
document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        gameManager.handleKeyDown(event);
    }
});document.addEventListener('keyup', () => gameManager.handleKeyUp());

// How to play modal
howToPlayButton.addEventListener('click', () => {
    howToPlayModal.style.display = "block";
    // Pause game when modal is shown
    if (!isPaused && animationIdBall) {
        gameManager.pauseGame();
    }
});

closeModalButton.addEventListener('click', () => {
    howToPlayModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === howToPlayModal) {
        howToPlayModal.style.display = "none";
    }
});