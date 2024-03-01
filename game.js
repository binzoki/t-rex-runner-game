const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    velocityY: 0,
    jumpPower: -4.5,
    gravity: 0.25,
    onGround: true,
};

// Correctly combining the ground object definitions
let ground = {
    x: 0,
    y: canvas.height - 20, // Position the ground near the bottom of the canvas
    speed: 2, // Speed at which the ground moves
    height: 2, // Height of the ground line
};

function drawDino() {
    ctx.fillStyle = 'black';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function updateDino() {
    dino.velocityY += dino.gravity;
    dino.y += dino.velocityY;

    if (dino.y >= canvas.height - dino.height) {
        dino.y = canvas.height - dino.height;
        dino.velocityY = 0;
        dino.onGround = true;
    } else {
        dino.onGround = false;
    }
}

function jump() {
    if (dino.onGround) {
        dino.velocityY = dino.jumpPower;
        dino.onGround = false;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp' || event.keyCode === 38) {
        jump();
    }
});

// Function to draw and move the ground for a seamless loop
function drawAndMoveGround() {
    ground.x -= ground.speed; // Speed of the ground movement
    if (ground.x <= -canvas.width) ground.x = 0;

    // Correcting the loop effect by drawing two sets of lines
    for (let i = ground.x; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, ground.y);
        ctx.lineTo(i + 10, ground.y); // Length of each line segment
        ctx.strokeStyle = "#000";
        ctx.lineWidth = ground.height;
        ctx.stroke();
    }
}

// The main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    
    drawAndMoveGround(); // Draw and move the ground
    updateDino(); // Update the dino's position and check for gravity
    drawDino(); // Draw the dino in its new position
    
    requestAnimationFrame(gameLoop); // Continue the loop
}

gameLoop();
