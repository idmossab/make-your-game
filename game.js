// Import classes
// In a real project, use proper imports. For demo, assume classes are already available

// Initialize the game when the document is loaded
document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
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

    // Game state
    const gameState = {
        xp: 0,
        hearts: 3,
        timeLeft: 30,
        isPaused: false,
        canStart: true,
        timerInterval: null,
        animationIdBall: null,
        animationIdPaddle: null,
        moveLeftRight: false,
        bricks: []
    };

    // Create game manager and game objects
    const gameManager = new GameManager(
        gameAreaElement, paddleElement, ballElement, 
        gameState, pauseButton, restartButton, startMessage,
        xpElement, heartsElement, timerElement
    );

    // Initialize game
    gameManager.init();

    // Event listeners
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space" && !gameState.animationIdBall && gameState.canStart) {
            clearInterval(gameState.timerInterval);
            gameManager.startGame();
            gameState.timerInterval = setInterval(() => gameManager.updateTimer(), 1000);
        }
    });

    document.addEventListener('keydown', (event) => gameManager.handleKeyDown(event));
    document.addEventListener('keyup', () => gameManager.handleKeyUp());
}