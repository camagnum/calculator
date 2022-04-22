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

    clear() {
        this.valoresSalvos = "";
        this.valoresDigitados = "";
        this.operation = undefined;
    }

    appendNumber(number) {
        this.valoresDigitados = `${this.valoresDigitados}${number.toString()}`;
    }

    updateDisplay() {
        this.valoresSalvosTextElement.innerText = this.valoresSalvos;
        this.valoresDigitadosTextElement.innerText = this.valoresDigitados;
    }
}

const calculator = new Calculator(
    valoresSalvosTextElement,
    valoresDigitadosTextElement
);

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}