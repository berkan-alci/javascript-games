import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
const body = [
    { x: 11, y: 11 },
];
let newSegments = 0;

export function updateSnake() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = body.length - 2; i >= 0; i--) {
        body[i + 1] = { ...body[i] };
    }

    body[0].x += inputDirection.x;
    body[0].y += inputDirection.y;
};

export function drawSnake(board) {
    body.forEach(segment => {
        const snakeEl = document.createElement('div');
        snakeEl.style.gridColumnStart = segment.x;
        snakeEl.style.gridRowStart = segment.y;
        snakeEl.classList.add('snake');
        board.appendChild(snakeEl);
    });
};

export function expandSnake(amount) {
    newSegments += amount;
};

export function onSnake(pos, { ignoreHead = false } = {}) {
    return body.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return positionCheck(segment, pos);
    });
};

export function getSnakeHead() {
    return body[0];
}

export function snakeIntersection() {
    return onSnake(body[0], { ignoreHead: true })
}

function positionCheck(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
};

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        body.push({ ...body[body.length - 1] });
    }

    newSegments = 0;
};