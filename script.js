// Select the ball element
let ball = document.getElementById('ball');
let fps = 0; // Variable to count the number of frames
let lastFrameTime = performance.now(); // Store the time of the last frame

// Set the ball's speed
let dx = 2; // Ball speed in the horizontal direction
let dy = -2; // Ball speed in the vertical direction (moving upwards)

// Function to update the ball's position
function moveBall() {
    let ballPosition = ball.getBoundingClientRect(); // Get the current position of the ball
    let gameArea = document.getElementById('gameArea').getBoundingClientRect(); // Get the game area's dimensions

    // Calculate the new position of the ball based on its speed
    let newLeft = ball.offsetLeft + dx;
    let newTop = ball.offsetTop + dy;

    // Update the ball's position on the screen
    ball.style.left = newLeft + 'px';
    ball.style.top = newTop + 'px';

    // Check if the ball hits the left or right wall
    if (newLeft <= 0 || newLeft + ball.offsetWidth >= gameArea.width) {
        dx = -dx; // Reverse the horizontal direction
    }

    // Check if the ball hits the top wall
    if (newTop <= 0) {
        dy = -dy; // Reverse the vertical direction
    }

    // Check if the ball hits the bottom wall (game over condition)
    if (newTop + ball.offsetHeight >= gameArea.height) {
        // Trigger game over logic (e.g., display an alert)
        alert('Game Over');
        return; // Stop further execution of the game loop
    }

    // Count the frames for FPS calculation
    fps++;
    let now = performance.now(); // Get the current time
    if (now - lastFrameTime >= 1000) { // If one second has passed
        console.log("FPS:", fps); // Log the FPS count to the console
        fps = 0; // Reset the FPS counter
        lastFrameTime = now; // Update the last frame time
    }

    // Continue updating the ball's movement in the next animation frame
    requestAnimationFrame(moveBall);
}

// Start the ball movement
moveBall();
//----------------------------------
let paddle = document.getElementById('paddle');
let paddleSpeed = 20; // سرعة حركة الـ Paddle

document.addEventListener('keydown', function(event) {
    // let paddlePosition = paddle.getBoundingClientRect();
    let gameArea = document.getElementById('gameArea').getBoundingClientRect();

    if (event.key === 'ArrowLeft') {
        let newLeft = paddle.offsetLeft - paddleSpeed;
        if (newLeft > paddleSpeed) {
            paddle.style.left = newLeft + 'px';
        }
    } else if (event.key === 'ArrowRight') {
        let newLeft = paddle.offsetLeft + paddleSpeed;
        if (newLeft + paddle.offsetWidth <= gameArea.width + paddleSpeed * 3) {
            paddle.style.left = newLeft + 'px';
        }
    }
});