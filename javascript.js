function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by 0!");
    return a / b;
}

let firstNumber = 0;
let operator = '+';
let secondNumber = 0;

function operate(operator, numA, numB) {
    
}