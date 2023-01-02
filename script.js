"use strict"

function clearBtn() {
     numFirst = '';
     numLast = '';
     strNumber = '';
     operator = null;
     lastOperator = null;
}

function addOperator(operateSign) {
    if (operateSign === '%') 
        operateSign = '+';
    strNumber = '';
    
    if (operator !== null && numLast !== '')
        lastOperator = operateSign;
    else 
        operator = operateSign;
}

function operateOnNumber(a, sign, b) {
    switch(sign) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b; 
    }
}

function checkBtn(e) {
    const btn = e.target;
}

function main() {
    let numFirst = '';
    let numLast = '';
    let strNumber = '';
    let operator = null;
    let lastOperator = null;
    const button = document.querySelectorAll(".btn");

    button.forEach(button => addEventListener("pointerdown", checkBtn))
}

main();