// Get the canvas element and its drawing context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the dinosaur (dino) object with properties for position, size, velocity, jump power, gravity, and a flag to check if it's on the ground
let dino = {
    x: 50, // X position
    y: 150, // Y position (start higher to see the jump effect)
    width: 20, // Width of the dino
    height: 20, // Height of the dino
    velocityY: 0, // Vertical velocity
    jumpPower: -150, // Power of the jump (negative to move up)
    gravity: 0.25, // Gravity applied to the dino
    onGround: true, // Is the dino on the ground?
};

// Draw the dinosaur on the canvas
function drawDino() {
    ctx.fillStyle = 'black'; // Set the color of the dino
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height); // Draw the dino as a rectangle
}

// Update the dinosaur's position and apply gravity
function updateDino() {
    dino.velocityY += dino.gravity; // Apply gravity
    dino.y += dino.velocityY; // Update the position based on velocity

    // Check if the dino is on the ground
    if (dino.y >= canvas.height - dino.height) { // Allow dino to be considered on the ground even if slightly overshooting
        dino.y = canvas.height - dino.height; // Correct the position to make sure it's on the ground
        dino.velocityY = 0; // Stop moving when on the ground
        dino.onGround = true; // The dino is on the ground
    } else {
        dino.onGround = false; // The dino is not on the ground
    }
}

// Make the dinosaur jump
function jump() {
    if (dino.onGround) {
        dino.velocityY = dino.jumpPower;
        dino.onGround = false;
    }
}

// Listening for the spacebar press to initiate the jump
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp' || event.keyCode === 38) {
        jump();
    }
});

// The main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    
    updateDino(); // Update the dino's position and check for gravity
    drawDino(); // Draw the dino in its new position
    
    requestAnimationFrame(gameLoop); // Continue the loop
}

gameLoop(); // Start the game loop