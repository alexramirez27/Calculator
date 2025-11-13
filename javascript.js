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
    if (b === 0) return "Division by 0 is undefined!";
    return a / b;
}

let firstNumber;
let operator;
let secondNumber;

let sign = 1;

function operate(operator, numA, numB) {
    switch (operator) {
        case '+':
            return add(numA, numB);
        case '-':
            return subtract(numA, numB);
        case '*':
            return multiply(numA, numB);
        case '/':
            return divide(numA, numB);
    }
}

const screen = document.querySelector(".screen");
const allBtns = document.querySelectorAll(".btn");
let stackLength = 0;
let computed = false;

allBtns.forEach(currBtn => {
    currBtn.addEventListener("click", () => {
        // If the length of the current result is greater than 4, clear
        if (stackLength === 1 && screen.textContent.length > 5) {
            screen.textContent = "";
            firstNumber = undefined;
            secondNumber = undefined;
            operator = undefined;
            stackLength = 0;
        }

        // Input is the first number
        if (stackLength === 0 && !isNaN(currBtn.textContent)) {
            screen.textContent = currBtn.textContent;
            firstNumber = Number(currBtn.textContent);
            stackLength++;
        // User wants to compute something new
        } else if (stackLength === 1 && !isNaN(currBtn.textContent) && computed === true) {
            screen.textContent = currBtn.textContent;
            firstNumber = Number(currBtn.textContent);
            computed = false;
            // The first number is multiple digits long
        } else if (stackLength === 1 && !isNaN(currBtn.textContent) && firstNumber.toString().length < 4) {
            screen.textContent += currBtn.textContent;
            firstNumber = Number(firstNumber + currBtn.textContent);
        // The second number is multiple digits long
        } else if (stackLength === 3 && !isNaN(currBtn.textContent) && secondNumber.toString().length < 4) {
            screen.textContent += currBtn.textContent;
            secondNumber = Number(secondNumber + currBtn.textContent);
        // Input is the operator
        } else if (stackLength === 1 && (currBtn.textContent === '+' || currBtn.textContent === '-'
            || currBtn.textContent === '*' || currBtn.textContent === '/')) {
            let temp = firstNumber.toString();
            if (temp.at(-1) === '.') temp += '0';
            firstNumber = Number(temp);
            screen.textContent = firstNumber; 
            screen.textContent += ` ${currBtn.textContent} `;
            operator = currBtn.textContent;
            stackLength++;
        // Pressed the delete button with stackLength equal to 1
        } else if (stackLength === 1 && currBtn.className === "btn delete") {
            screen.textContent = "";
            firstNumber = undefined;
            stackLength--;
        // Pressed the delete button with stackLength equal to 2
        } else if (stackLength === 2 && currBtn.className === "btn delete") {
            screen.textContent = screen.textContent.slice(0, -3);
            operator = undefined;
            stackLength--;
        // Pressed the delete button with stackLength equal to 3
        } else if (stackLength === 3 && currBtn.className === "btn delete") {
            const secondNumberLength = secondNumber.toString().length;
            screen.textContent = screen.textContent.slice(0, -secondNumberLength);
            secondNumber = undefined;
            stackLength--;
        // Pressed x^2 with stackLength equal to 1
        } else if (stackLength === 1 && currBtn.className === "btn squared") {
            let temp = firstNumber * firstNumber;
            if (!Number.isInteger(temp)) temp = Number(temp.toFixed(2));
            firstNumber = temp;
            screen.textContent = firstNumber;
        // Pressed x^2 with stackLength equal to 2
        } else if (stackLength === 3 && currBtn.className === "btn squared") {
            let temp = secondNumber * secondNumber;
            if (!Number.isInteger(temp)) temp = Number(temp.toFixed(2));
            secondNumber = temp;
            const secondNumberLength = secondNumber.toString().length - 1;
            screen.textContent = screen.textContent.slice(0, -secondNumberLength) + secondNumber;
        // Pressed the +/- button
        } else if((stackLength === 1 || stackLength === 3) && currBtn.textContent === "+/-") {
            firstNumber *= -1;
            screen.textContent = firstNumber;
        // Pressed clear or another number overriding the first number
        } else if (currBtn.textContent === "CLR") {
            firstNumber = undefined;
            operator = undefined;
            secondNumber = undefined;
            screen.textContent = "";
            stackLength = 0;
        // Pressed the second number
        } else if (stackLength === 2 && !isNaN(currBtn.textContent)) {
            secondNumber = Number(currBtn.textContent);
            screen.textContent += secondNumber;
            stackLength++;
        // Pressed =
        } else if (stackLength === 3 && currBtn.textContent === '=' && !isNaN(firstNumber) && !isNaN(secondNumber)) {
            let temp = operate(operator, firstNumber, secondNumber);
            if (temp === "Division by 0 is undefined!") {
                firstNumber = undefined;
                secondNumber = undefined;
                operator = undefined;
                stackLength = 0;
                screen.textContent = "Undefined!";
            } else {
                if (!Number.isInteger(temp)) temp = Number(temp.toFixed(2));
                firstNumber = temp;
                screen.textContent = firstNumber;
                operator = undefined;
                secondNumber = undefined;
                stackLength = 1;
                computed = true;
            }
        // Pressed . with stackLength equal to 1
        } else if (stackLength === 1 && currBtn.textContent === '.' && firstNumber.toString().length < 3 && 
        !firstNumber.toString().includes('.')) {
            firstNumber = firstNumber.toString() + '.';
            screen.textContent = firstNumber; 
        // Pressed . with stackLength equal to 3   
        } else if (stackLength === 3 && currBtn.textContent === '.' && secondNumber.toString().length < 3 && 
        !secondNumber.toString().includes('.')) {
            secondNumber = secondNumber.toString() + '.';
            const secondNumberLength = secondNumber.toString().length - 1;
            screen.textContent = screen.textContent.slice(0, -secondNumberLength) + secondNumber;
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    switch (event.key) {
        case '0':
            document.getElementById("zero").click();
            break;
        case '1':
            document.getElementById("one").click();
            break;
        case '2':
            document.getElementById("two").click();
            break;
        case '3':
            document.getElementById("three").click();
            break;
        case '4':
            document.getElementById("four").click();
            break;
        case '5':
            document.getElementById("five").click();
            break;
        case '6':
            document.getElementById("six").click();
            break;
        case '7':
            document.getElementById("seven").click();
            break;
        case '8':
            document.getElementById("eight").click();
            break;
        case '9':
            document.getElementById("nine").click();
            break;
        case '/':
            document.getElementById("divides").click();
            break;
        case '*':
            document.getElementById("times").click();
            break;
        case '-':
            document.getElementById("minus").click();
            break;
        case '+':
            document.getElementById("plus").click();
            break;
        case '.':
            document.getElementById("dot").click();
            break;
        case "Backspace":
            document.getElementById("delete").click();
            break;
        case "Enter":
            document.getElementById("equals").click();
            break;
    }
});
