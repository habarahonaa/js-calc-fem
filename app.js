// JS for the dark mode switch

// Gets the current state of the checkbox, when its state changes, the bg-color is modified to the bg-dark value


const checkSwitch = document.getElementById('switch');

checkSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode')
});

//Calculator functionality

let runningNumber = 0;
let buffer = "0";
let currentOperator = null;
const calcScreen = document.querySelector('.calculator__display');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleOperator(value);
    } else {
        handleOperand(value);
    }
    reRender();
}

function handleOperator(value) {
    switch (value) {
        case 'AC':
            buffer = "0";
            runningNumber = 0;
            currentOperator = null;
            break;
    
        case '=':
            if (currentOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            currentOperator = null;
            buffer = "" + runningNumber;
            runningNumber = 0;
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const screenValue = parseInt(buffer);
    if (runningNumber === 0) {
        runningNumber = screenValue;
    } else {
        flushOperation(screenValue);
    }
    currentOperator = value;
    buffer = "0";
}

function flushOperation(screenValue) {
    if (currentOperator === "+") {
        runningNumber += screenValue;
    } else if (currentOperator === "-") {
        runningNumber -= screenValue;
    } else if (currentOperator === "x") {
        runningNumber *= screenValue;
    } else {
        runningNumber /= screenValue;
    }
}

function handleOperand(value) {
    if(buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function reRender() {
    calcScreen.innerText = buffer;
}

document.querySelector('.calculator__keys').addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
})




