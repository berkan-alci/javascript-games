import Calculator from './calc.js';

const numBtn = document.querySelectorAll('[data-number]');
const opBtn = document.querySelectorAll('[data-operation]');
const eqBtn = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOpTextEl = document.querySelector('[data-previous-operand]');
const currOpTextEl = document.querySelector('[data-current-operand]');

const calc = new Calculator(prevOpTextEl, currOpTextEl)

numBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.appendNum(btn.innerText);
        calc.updateDisplay();
    })
});

opBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.operations(btn.innerText);
        calc.updateDisplay();
    })
});


eqBtn.addEventListener('click', () => {
    calc.compute()
    calc.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calc.clear()
    calc.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calc.delete()
    calc.updateDisplay()
})