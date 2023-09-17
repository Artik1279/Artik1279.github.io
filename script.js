var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var size = 20;
var direction;
var snake = [];
var food;

function init() {
    direction = "right";
    createSnake();
    createFood();
    setInterval(gameLoop, 100);
}

function createSnake() {
    var length = 5;
    for (var i = length - 1; i >= 0; i--) {
        snake.push({x: i, y: 0});
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / size)),
        y: Math.floor(Math.random() * (canvas.height / size))
    };
}

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        var snakePart = snake[i];
        context.fillStyle = "green";
        context.fillRect(snakePart.x * size, snakePart.y * size, size, size);
        context.strokeStyle = "white";
        context.strokeRect(snakePart.x * size, snakePart.y * size, size, size);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x * size, food.y * size, size, size);
    context.strokeStyle = "white";
    context.strokeRect(food.x * size, food.y * size, size, size);
}

function updateSnake() {
    var headX = snake[0].x;
    var headY = snake[0].y;

    if (direction === "right") headX++;
    else if (direction === "left") headX--;
    else if (direction === "up") headY--;
    else if (direction === "down") headY++;

    var newHead = {
        x: headX,
        y: headY
    };

    if (headX === food.x && headY === food.y) {
        createFood();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

function checkCollision() {
    var headX = snake[0].x;
    var headY = snake[0].y;

    if (headX < 0 || headX >= canvas.width / size || headY < 0 || headY >= canvas.height / size) {
        clearInterval(gameLoop);
        alert("Игра окончена!");
    }

    for (var i = 1; i < snake.length; i++) {
        if (snake[i].x === headX && snake[i].y === headY) {
            clearInterval(gameLoop);
            alert("Игра окончена!");
            break;
        }
    }
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
    updateSnake();
    checkCollision();
}

function changeDirection(event) {
    var key = event.keyCode;

    if (key === 37 && direction !== "right") direction = "left";
    else if (key === 38 && direction !== "down") direction = "up";
    else if (key === 39 && direction !== "left") direction = "right";
    else if (key === 40 && direction !== "up") direction = "down";
}

document.addEventListener("keydown", changeDirection);
init();
