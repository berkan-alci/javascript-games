export default class Calculator {
    constructor(prevOpTextEl, currOpTextEl) {
        this.prevOpTextEl = prevOpTextEl;
        this.currOpTextEl = currOpTextEl;
        this.clear();
    }

    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = 'undefined';
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    };

    appendNum(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    };

    operations(operation) {
        if (this.currOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    };

    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);

        if (isNaN(curr) || isNaN(prev)) return;

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '*':
                computation = prev / curr;
                break;
            default:
                return

        }

        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    };

    getDisplayNum(number) {
        const strNum = number.toString();
        const intDigits = parseFloat(strNum.split('.')[0]);
        const decDigits = strNum.split('.')[1];
        let intDisplay;

        if (isNaN(intDigits)) {
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decDigits != null) {
            return `${intDisplay}.${decDigits}`;
        } else {
            return intDisplay;
        }
    };

    updateDisplay() {

        this.currOpTextEl.innerText = this.getDisplayNum(this.currOperand);

        if (this.operation != null) {
            this.prevOpTextEl.innerText = `${this.getDisplayNum(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOpTextEl.innerText = ''
        }
    };

}
