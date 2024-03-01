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
    jumpPower: -4.5, // Power of the jump (negative to move up)
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
    if (dino.y < canvas.height - dino.height) { // Check if the dino is in the air
        dino.velocityY += dino.gravity; // Apply gravity
        dino.onGround = false; // The dino is not on the ground
    } else {
        dino.velocityY = 0; // Stop moving when on the ground
        dino.onGround = true; // The dino is on the ground
        dino.y = canvas.height - dino.height; // Correct the position to make sure it's on the ground
    }

    dino.y += dino.velocityY; // Update the position based on velocity
}

// Make the dinosaur jump
function jump() {
    if (dino.onGround) { // Only allow jumping if the dino is on the ground
        dino.velocityY = dino.jumpPower;
        dino.onGround = false; // Dino is jumping, so it's not on the ground
    }
}

// Listening for the spacebar press to initiate the jump
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.keyCode === 32) { // Check both `code` and `keyCode`
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
