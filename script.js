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

function checkBtn(btn) {
    if (btn.classList.contains("btn_operand"))
        return "operand";
}

function main() {
    const calValue = {
        numFirst: '',
        numLast: '', 
        curNumSt: '',
        operator: null,
        lastOperator: null, 
    }
    const button = document.querySelectorAll(".btn");

    button.forEach(button => addEventListener("pointerdown", mediator))
}

main();