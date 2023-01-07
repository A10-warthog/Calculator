"use strict"

function allClearBtn(obj) {
     for (let key in obj) {
        if (typeof obj[key] === 'function')
            obj[key]().textContent = '0';
        //check for number
        else if ((/\d/).test(obj[key]) === true)
            obj[key] = '';
        //check for sign
        else if ((/\W|\w/).test(obj[key]) === true)
            obj[key] = null;
     }
     return obj;
}

function addOperator(operator, obj) {
    obj.curNumStr = '';
    //enable backspace
    const back =  document.querySelector(".btn_back");
        back.disabled = false;
    if (obj.numLast !== '')
        obj.lastOperator = operator;
    else if (obj.numFirst !== '')
        obj.firstOperator = operator;
    return obj;
}

function calculateNum(a, sign, b) {
    switch(sign) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/': 
            return a / b; 
    }
}

function limitNumber(strExpr) {
    /*matches numbers, period, letter and non alpha numeric letters
    *return string with length from 1 to 10 
    */
    return strExpr.match(/^-*[\d\.\w\W]{1,10}/g).join('');
}

function removeNum(obj) {
    //disabled for 1st operand if first operator is present 
    if (obj.firstOperator !== null && obj.curNumStr === '') 
        return obj;

    const numArr = checkForLen(obj.curNumStr).split('');
    numArr.pop();
    obj.curNumStr = numArr.join('');
    obj.displayNum().textContent = obj.curNumStr;
    if (obj.curNumStr === '') {
        obj.displayNum().textContent = '0';
        if (obj.firstOperator !== null)
            obj.numLast = '0'
        return obj;
    }
    obj = addNum(obj);
    return obj;
}

function addPeriod(obj) {
    if (obj.curNumStr === '')
        obj.curNumStr = '0';
    if (obj.curNumStr.includes("."))
        obj.curNumStr += '';
    else
        obj.curNumStr += '.';
    obj.displayNum().textContent = obj.curNumStr;
    obj = addNum(obj);
    return obj;
}

function addNum(obj) {    
    //check if - operator is in front
    if ((/^-/).test(obj.curNumStr)=== true && obj.numLast === '') {
        obj.numFirst = obj.curNumStr;
        return obj;
    }
    if (obj.firstOperator !== null)
        obj.numLast = obj.curNumStr;
    else    
        obj.numFirst = obj.curNumStr;  
    return obj;
}

function checkNum(num, obj) {
    obj.curNumStr += num;
    //replace every zero after 1st zero
    if ((/^0(?=\d)/).test(obj.curNumStr) === true)
        obj.curNumStr = obj.curNumStr.replace((/^0/), '');
    obj.curNumStr = limitNumber(obj.curNumStr);
    obj.displayNum().textContent = obj.curNumStr;
    obj = addNum(obj);
    return obj;
}

function negativeNum(obj) {
    obj.curNumStr = obj.displayNum().textContent;
    if ((/^-/).test(obj.curNumStr) === false)
        obj.curNumStr = '-' + obj.curNumStr;
    else 
        obj.curNumStr = obj.curNumStr.replace((/^-/), '');
    if (obj.curNumStr === '-0')
        obj.curNumStr = '0'
    obj.displayNum().textContent = limitNumber(obj.curNumStr);
    obj = addNum(obj);         
    return obj;
}
//round number to 5th digits after decimal point
function roundNum(numStr) {
    let str = numStr, rest = '0', eSign = '+', frontSign = '';
    let firstNum = 0, modifyNum = 0, numStrLen = 0;
    let allZero = true, allNine = true;
    let numStrArr = [];
    if (numStr.indexOf(".") < (numStr.length / 2))
        eSign = '-';
    //matches front operator
    if ((/^-/).test(str) === true)
        frontSign = '-';
    //replace front operator and period
    str = str.replace((/^-|\./g), '');
    /*match first 6 digit
    *Convert string digit to integer with unary operator
    */
    numStrArr = str.match(/^\d{6}/g)[0].split('').map(num => +num);

    if (numStr.includes("e")) 
    //match integer after e letter 
        numStrLen = str.match(/\d+$/g)[0];
    else
        numStrLen = str.length - 1;

    modifyNum = numStrArr.pop();
    //First digit of the string
    firstNum = numStrArr.shift();
    allZero = numStrArr.every(num => num === 0);
    allNine = numStrArr.every(num => num === 9);
    if (modifyNum > 4 && allNine === true) 
        firstNum += 1;
    //assign string joined value of numStrArr
    else if ((modifyNum < 4 && (allNine === true || allNine === false)) ||
              (modifyNum > 4 && allZero === true))
        rest = numStrArr.reduce((acc, cur) => acc.toString() + cur.toString());
    //remove last number of arr if it is 9 or above
    //increment second last number 
    else if (modifyNum > 4 && (allNine === false || allZero === false)) {
        let len = numStrArr.length - 1;
        numStrArr[len] += 1;
        while (numStrArr[len] >= 9) {
            numStrArr.pop();
            len = numStrArr.length - 1;
            numStrArr[len] += 1;
        }
        rest = numStrArr.reduce((acc, cur) => acc.toString() + cur.toString());
    }
    return `${frontSign}${firstNum}.${rest}e${eSign}${numStrLen}`;
}

function checkForLen(numStr) {
    const len = numStr.match(/\d*/g).join('').length;
    if (len > 10) 
        return roundNum(numStr);
    return numStr;
}

function addPercent(obj) {
    //disable backspace button
    document.querySelector(".btn_back").disabled = true;
    if (obj.curNumStr === '')
        obj.curNumStr = obj.displayNum().textContent;
    //use unary operator to convert string into number
    obj.curNumStr = ((+obj.curNumStr) / 100).toString();
    const value = checkForLen(obj.curNumStr);
    obj.displayNum().textContent = value;
    obj = addNum(obj);
    return obj;
}

function equateExpr(obj) {
    let result = '';
    let {numFirst, numLast, firstOperator, lastOperator} = obj;
    if (numLast === '0' && firstOperator === '/') {
        if (numFirst === '0')
            obj.displayNum().textContent = "undefined";
        else 
            obj.displayNum().textContent = "Infinity";
        const value = obj.displayNum().textContent;
        obj = allClearBtn(obj);
        obj.displayNum().textContent = value;
        return obj;
    }
    if (firstOperator === null) 
        return obj;
    result = calculateNum(+numFirst, firstOperator, +numLast);
    obj = allClearBtn(obj);
    obj.numFirst = result.toString();
    obj.firstOperator = lastOperator;
    obj.displayNum().textContent = checkForLen(obj.numFirst);
    
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
        return negativeNum(obj);
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
    const [...button] = document.querySelectorAll(".btn");
    const display = document.querySelector(".display");
    let calValue = {
        numFirst: '',
        numLast: '', 
        curNumStr: '',
        firstOperator: null,
        lastOperator: null,
        displayNum() {
           return display;
        },
    }

    function mediator(e) {
        const btn = e.target;
        calValue = checkBtnClass(btn, calValue);
        if (calValue.lastOperator !== null)
            calValue = equateExpr(calValue);
        console.table(calValue);
    }

    function keySupport(e) {
        const key = document.querySelector(`.btn[data-key="${e.key}"]`);
        if (!key)
            return;
        //end btn transition
        if (key.classList.contains("btn--press")) {
            key.classList.remove("btn--press");
            return;
        }
        key.addEventListener("click", mediator);
        key.click();
        key.classList.add("btn--press");
    }

    button.forEach(button => button.addEventListener("click", mediator));
    //call mediator function when key matches data key
    window.addEventListener("keydown", keySupport);
    //remove btn--press class if present
    window.addEventListener("keyup", keySupport);
}
main();