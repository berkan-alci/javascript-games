import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';
let food = getRandomFood();
const EXPANSION = 1;

export function updateFood() {
    if (onSnake(food)) {
        expandSnake(EXPANSION);
        food = getRandomFood();
    }
};

export function drawFood(board) {

    const foodEl = document.createElement('div');
    foodEl.style.gridColumnStart = food.x;
    foodEl.style.gridRowStart = food.y;
    foodEl.classList.add('food');
    board.appendChild(foodEl);

};

function getRandomFood() {
    let newFood;

    while (newFood == null || onSnake(newFood)) {
        newFood = randomGridPosition();
    }
    return newFood;
}