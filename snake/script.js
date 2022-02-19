import { SNAKE_SPEED, updateSnake, drawSnake, getSnakeHead, snakeIntersection } from './snake.js';
import { drawFood, updateFood } from './food.js';
import { outsideGrid } from './grid.js';

const board = document.getElementById('game-board');
let gameOver = false;
let lastTime = 0;

function main(currTime) {

    if (gameOver) {
        if (confirm('You lost. Press ok to restart!')) {
            window.location = '/';
        }
        return;
    }

    window.requestAnimationFrame(main);
    const deltaSeconds = (currTime - lastTime) / 1000;
    if (deltaSeconds < 1 / SNAKE_SPEED) return

    lastTime = currTime;

    update();
    draw();
};

window.requestAnimationFrame(main);

function update() {
    checkDeath();
    updateSnake();
    updateFood();
}

function draw() {
    board.innerHTML = '';
    drawSnake(board);
    drawFood(board);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}