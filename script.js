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

function addNum(obj) {

}

function addPercent(obj) {

}

function addOperator(obj) {

}

function checkBtn(btn) {
    if (btn.classList.contains("btn_operand"))
        return "operand";

    if (btn.classList.contains("btn_percent"))
        return "percent";

    if (btn.classList.contains("btn_equal"))
        return "equal";

    if (btn.classList.contains("btn_negation"))
        return "negation";

    if (btn.classList.contains("btn_period"))
        return "period";

    if (btn.classList.contains("btn_back"))
        return "backspace";

    if (btn.classList.contains("btn_clear"))
        return "clear";

    if (btn.classList.contains("btn_operator"))
        return "operator";
}

function main() {

    const button = document.querySelectorAll(".btn");
    
    const calValue = {
        numFirst: '',
        numLast: '', 
        curNumSt: '',
        operator: null,
        lastOperator: null, 
    }

    function mediator(e) {
        const btn = e.target;
        const callFunc = checkBtn(btn);

    }

    button.forEach(button => addEventListener("pointerdown", mediator))
}

main();