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

function main() {
    let numFirst = '';
    let numLast = '';
    let strNumber = '';
    let operator = null;
    let lastOperator = null;
    const button = document.querySelectorAll(".btn");
}