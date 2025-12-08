const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake;
let food;
let velocityX;
let velocityY;
let score;
let game;
let gamePaused = true;
let gameOver = false;

document.addEventListener("keydown", changeDirection);

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    food = randomFood();
    velocityX = box;
    velocityY = 0;
    score = 0;
    document.getElementById("score").innerText = score;
    gamePaused = true;
    gameOver = false;
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function startGame() {
    if (gameOver) resetGame();
    gamePaused = false;
    if (!game) game = setInterval(draw, 250);
}

function togglePause() {
    gamePaused = !gamePaused;
}

function restartGame() {
    clearInterval(game);
    game = null;
    resetGame();
    startGame();
}

function changeDirection(e) {
    if (e.key === "ArrowUp" && velocityY === 0) velocityX = 0, velocityY = -box;
    if (e.key === "ArrowDown" && velocityY === 0) velocityX = 0, velocityY = box;
    if (e.key === "ArrowLeft" && velocityX === 0) velocityX = -box, velocityY = 0;
    if (e.key === "ArrowRight" && velocityX === 0) velocityX = box, velocityY = 0;
}

function draw() {
    if (gamePaused || gameOver) return;

    ctx.fillStyle = "#0b0b0bff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "#00ff00";
    snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

    let head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = randomFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ) {
        gameOver = true;
        alert("Game Over! Score: " + score);
    }
}

resetGame();