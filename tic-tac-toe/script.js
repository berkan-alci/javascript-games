board = document.querySelector("[data-board]");
cells = document.querySelectorAll("[data-cell]");
restartBox = document.querySelector("[data-winning-message]");
restartMsg = document.querySelector("[data-winning-text]");
restartBtn = document.getElementById('restart');

const X_CLASS = 'x';
const O_CLASS = 'o';
const CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
let oTurn;

start();
restart();



function start() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    })
    setBoardHover();
    restartBox.classList.remove('show');
}

function restart() {
    restartBtn.addEventListener('click', start);
};

function handleClick(e) {
    const cell = e.target;
    const currClass = oTurn ? O_CLASS : X_CLASS;

    place(cell, currClass);
    if (checkWin(currClass)) {
        end(false)
    } else if (draw()) {
        end(true)
    } else {
        turn();
        setBoardHover()
    }

}

function place(cell, currClass) {
    cell.classList.add(currClass);
}

function turn() {
    oTurn = !oTurn;
}

function setBoardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currClass) {
    return CONDITIONS.some(c => {
        return c.every(i => {
            return cells[i].classList.contains(currClass);
        });
    });
}

function end(bool) {
    if (bool) {
        restartMsg.innerText = 'Draw!';
    } else {
        restartMsg.innerText = `${oTurn ? "O's Win!" : "X's Win!"}`;
    }

    restartBox.classList.add('show');
}

function draw(bool) {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

