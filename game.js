const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800; // Ensure the canvas has a set width
canvas.height = 200; // Ensure the canvas has a set height

let dino = {
    x: 50,
    y: canvas.height - 60, // Adjust the Y position so the dino is above the ground
    width: 20,
    height: 20,
    velocityY: 0,
    jumpPower: -10,
    gravity: 0.5,
    onGround: false,
};

let ground = {
    x: 0,
    y: canvas.height - 10,
    width: canvas.width,
    height: 10,
};

// Simplified mountains for the background with parallax effect
let mountains = [
    {x: 0, speed: 0.2, color: '#999'},
    {x: 0, speed: 0.4, color: '#666'},
    {x: 0, speed: 0.6, color: '#333'},
];

function drawDino() {
    ctx.beginPath();
    // Head
    ctx.moveTo(dino.x + 10, dino.y);
    ctx.lineTo(dino.x + 16, dino.y - 5);
    ctx.lineTo(dino.x + 20, dino.y - 2);
    ctx.lineTo(dino.x + 22, dino.y - 10);
    ctx.lineTo(dino.x + 24, dino.y - 2);
    ctx.lineTo(dino.x + 28, dino.y - 5);
    ctx.lineTo(dino.x + 34, dino.y);

    // Body
    ctx.lineTo(dino.x + 34, dino.y + 10);
    ctx.lineTo(dino.x + 10, dino.y + 10);

    // Legs
    ctx.lineTo(dino.x + 8, dino.y + 15);
    ctx.lineTo(dino.x + 14, dino.y + 15);
    ctx.lineTo(dino.x + 16, dino.y + 10);
    ctx.lineTo(dino.x + 22, dino.y + 10);
    ctx.lineTo(dino.x + 24, dino.y + 15);
    ctx.lineTo(dino.x + 30, dino.y + 15);
    ctx.lineTo(dino.x + 32, dino.y + 10);

    // Close the path and fill
    ctx.closePath();
    ctx.fillStyle = 'green';
    ctx.fill();
}

function updateDino() {
    if (!dino.onGround) {
        dino.velocityY += dino.gravity;
        dino.y += dino.velocityY;
    }

    if (dino.y >= canvas.height - dino.height - ground.height) {
        dino.y = canvas.height - dino.height - ground.height;
        dino.velocityY = 0;
        dino.onGround = true;
    }
}

function jump() {
    if (dino.onGround) {
        dino.velocityY = dino.jumpPower;
        dino.onGround = false;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp') {
        jump();
    }
});

function drawAndMoveGround() {
    ground.x -= 2;
    if (ground.x <= -canvas.width) {
        ground.x = 0;
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
    ctx.fillRect(ground.x + canvas.width, ground.y, ground.width, ground.height); // Draw a second ground to loop seamlessly
}

function drawAndMoveMountains() {
    mountains.forEach((mountain, index) => {
        ctx.fillStyle = mountain.color;
        let mountainWidth = canvas.width / (mountains.length - index); // Decrease width for mountains further back
        let mountainHeight = canvas.height / 4 * (index + 1); // Increase height for mountains further back

        ctx.beginPath();
        ctx.moveTo(mountain.x, canvas.height);
        ctx.lineTo(mountain.x + mountainWidth / 2, canvas.height - mountainHeight); // Peak
        ctx.lineTo(mountain.x + mountainWidth, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Move and loop
        mountain.x -= mountain.speed;
        if (mountain.x + mountainWidth <= 0) {
            mountain.x = 0;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawAndMoveMountains(); // Parallax mountains
    drawAndMoveGround(); // Moving ground
    updateDino(); // Dino physics
    drawDino(); // Dino character
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
