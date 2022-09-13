const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const valoresSalvosTextElement = document.querySelector('[data-valores-salvos]');
const valoresDigitadosTextElement = document.querySelector("[data-valores-digitados]");

class Calculator {
    constructor(valoresSalvosTextElement, valoresDigitadosTextElement) {
        this.valoresSalvosTextElement = valoresSalvosTextElement;
        this.valoresDigitadosTextElement = valoresDigitadosTextElement;
        this.clear();
    }

    calculate() {
        let result;
        
        const _valoresSalvos = parseFloat(this.valoresSalvos);
        const _valoresDigitados = parseFloat(this.valoresDigitados);

        if (isNaN(_valoresDigitados) || isNaN(_valoresSalvos)) return;

        switch(this.operation) {
            case '+':
                result = _valoresSalvos + _valoresDigitados;
                break;
            case '-':
                result = _valoresSalvos - _valoresDigitados;
                break;
            case 'X':
                result = _valoresSalvos * _valoresDigitados;
                break;
            case '÷':
                result = _valoresSalvos / _valoresDigitados;
                break;
            default:
                return;
        }

        this.valoresDigitados = result;
        this.operation = undefined;
        this.valoresSalvos = '';
    }

    chooseOperation(operation) {
        if(this.valoresSalvos !== '') {
            this.calculate();
        }
        this.operation = operation;

        this.valoresSalvos = this.valoresDigitados;
        this.valoresDigitados = '';
    }
    
    appendNumber(number) {
        if ((this.valoresDigitados.includes('.') || this.valoresDigitados === '') && number === '.') return;

        this.valoresDigitados = `${this.valoresDigitados}${number.toString()}`;
    }
    
    delete() {
        this.valoresDigitados = this.valoresDigitados.slice(0,-1);
    }

    clear() {
        this.valoresSalvos = "";
        this.valoresDigitados = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.valoresSalvosTextElement.innerText = `${this.valoresSalvos} ${this.operation || ''}`;
        this.valoresDigitadosTextElement.innerText = this.valoresDigitados;
    }
}

const calculator = new Calculator(
    valoresSalvosTextElement,
    valoresDigitadosTextElement
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', () => {
        calculator.chooseOperation(operatorButton.innerText);
        calculator.updateDisplay();
    })
}

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});