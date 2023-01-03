"use strict"

function allClearBtn(obj) {
     obj.numFirst = '';
     obj.numLast = '';
     obj.curNumStr = '';
     obj.firstOperator = null;
     obj.lastOperator = null;
     obj.displayValue("0");
     return obj;
}

function addOperator(operator, obj) {
    obj.curNumStr = '';

    if (obj.firstOperator !== null)
        obj.lastOperator = operator;
    else 
        obj.firstOperator = operator;
    return obj;
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

function limitNumber(strExpr) {
    /*matches numbers, period, letter and non alpha numeric letters
      and returns a string with length from 1 to 10 */
    return strExpr.match(/^-*[\d\.\w\\W]{1,10}/g).join('');
}

function addNum(obj) {
    if (obj.firstOperator !== null)
        obj.numLast = obj.curNumStr;
    else    
        obj.numFirst = obj.curNumStr;
    
    return obj;
}

function checkNum(num, obj) {
    if ((obj.curNumStr === '' || obj.curNumStr === '0') && num === '0')
        obj.curNumStr = '';
    else {
        obj.curNumStr += num;
        const value = limitNumber(obj.curNumStr);
        obj.displayValue(value);
        addNum(obj);
    }

    return obj;
}

function addPercent(obj) {
    if (obj.curNumStr === '')
        obj.curNumStr = obj.displayValue();
    
    obj.curNumStr = ((+obj.curNumStr) / 100).toString();
    
    const value = checkForLen(obj.curNumStr);
    
    obj.displayValue(value);
    addNum(obj);

    return obj;
}

function checkBtnClass(btn, obj) {
    if (btn.classList.contains("btn_operand"))
        return checkNum(btn.textContent, obj);

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

    let calValue = {
        numFirst: '',
        numLast: '', 
        curNumStr: '',
        firstOperator: null,
        lastOperator: null,
        displayValue: function (val = "0") {
           return display.textContent = val;
        },
    }

    function mediator(e) {
        const btn = e.target;
        calValue = checkBtnClass(btn, calValue);
    }

    button.forEach(button => addEventListener("pointerdown", mediator))
}

main();