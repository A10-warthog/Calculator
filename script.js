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

function checkBtnClass(btn, obj) {
    if (btn.classList.contains("btn_operand"))
        return addNum(obj);

    if (btn.classList.contains("btn_percent"))
        return addPercent(obj);

    if (btn.classList.contains("btn_equal"))
        return equateExpr(obj);

    if (btn.classList.contains("btn_negation"))
        return negateNum(obj);

    if (btn.classList.contains("btn_period"))
        return addPeriod(obj);

    if (btn.classList.contains("btn_back"))
        return removeNum(obj);

    if (btn.classList.contains("btn_clear"))
        return allClear(obj);

    if (btn.classList.contains("btn_operator"))
        return addOperator(obj);
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
        calValue = checkBtnClass(btn, calValue);
    }

    button.forEach(button => addEventListener("pointerdown", mediator))
}

main();