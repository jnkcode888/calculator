let screen = document.getElementById('screen');
let currentInput = '';
let operator = '';
let previousInput = '';
let operatorPressed = false;

function appendNumber(number) {
    if (operatorPressed) {
        currentInput = '';  // Start fresh for new input after an operator
        operatorPressed = false;
    }
    currentInput += number;
    updateScreen();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;  // Prevent operator input with nothing in the screen
    if (operatorPressed) {
        operator = op;  // Change the operator if another operator is pressed
        updateScreen(); 
        return;
    }
    if (currentInput !== '') {
        if (previousInput !== '') calculateResult();  // If operator is pressed after two inputs, calculate first
        operator = op;
        previousInput = currentInput;
        operatorPressed = true;
        updateScreen();
    }
}

function updateScreen() {
    if (operatorPressed) {
        screen.textContent = previousInput + ' ' + operator;  // Show previous input and operator
    } else {
        screen.textContent = currentInput || '0';  // Show current input
    }
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operator = '';
    operatorPressed = false;
    updateScreen();
}

function deleteLast() {
    if (!operatorPressed) {
        currentInput = currentInput.slice(0, -1);  // Only delete if we're editing the current input
    }
    updateScreen();
}

function calculateResult() {
    if (previousInput === '' || currentInput === '') return;  // Prevent calculation without both inputs
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }
    currentInput = result.toString();  // Store the result as the new current input
    previousInput = '';
    operator = '';
    updateScreen();
}
