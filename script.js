"use strict"

function allClearBtn(obj) {
     obj.numFirst = '';
     obj.numLast = '';
     obj.curNumStr = '';
     obj.operator = null;
     obj.lastOperator = null;
     obj.displayValue("0");
     return obj;
}

function addOperator(operator, obj) {
    if (operator === '%') 
        operator = '+';
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

function addNum(num, obj) {
    if ((obj.curNumStr === '' || obj.curNumStr === '0') && num === '0')
        obj.curNumStr = '';
    else {
        obj.curNumStr += num;

    }
}

function addPercent(obj) {

}

function addOperator(obj) {

}

function checkBtnClass(btn, obj) {
    if (btn.classList.contains("btn_operand"))
        return addNum(btn.textContent, obj);

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
        return allClearBtn(obj);

    if (btn.classList.contains("btn_operator"))
        return addOperator(btn.textContent, obj);
}

function main() {
    const button = document.querySelectorAll(".btn");
    const display = document.querySelector(".display");

    const calValue = {
        numFirst: '',
        numLast: '', 
        curNumStr: '',
        operator: null,
        lastOperator: null,
        displayValue: function (val = "0") {
            display.textContent = val;
        },
    }

    function mediator(e) {
        const btn = e.target;
        calValue = checkBtnClass(btn, calValue);
    }

    button.forEach(button => addEventListener("pointerdown", mediator))
}

main();