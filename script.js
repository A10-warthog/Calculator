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
    if (obj.firstOperator !== null || obj.lastOperator !== null)
        return obj;
    if (obj.curNumStr === '')
        obj.curNumStr = '0';
    const numArr = checkForLen(obj.curNumStr).split('');
    numArr.pop();
    obj.curNumStr = numArr.join('');
    obj.displayValue().textContent = obj.curNumStr;
    if (obj.curNumStr === '') {
        obj.displayValue().textContent = '0';
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
    obj.displayValue().textContent = obj.curNumStr;
    obj = addNum(obj);
    return obj;
}

function addNum(obj) {
    if (obj.firstOperator !== null)
        obj.numLast = obj.curNumStr;
    else    
        obj.numFirst = obj.curNumStr;  
    return obj;
}

function checkNum(num, obj) {
    obj.curNumStr += num;
    if ((/^0(?=\d)/).test(obj.curNumStr) === true)
        obj.curNumStr = obj.curNumStr.replace((/^0/), '');
    obj.curNumStr = limitNumber(obj.curNumStr);
    obj.displayValue().textContent = obj.curNumStr;
    obj = addNum(obj);
    return obj;
}

function negateNum(obj) {
    obj.curNumStr = obj.displayValue().textContent;
    if ((/^-/).test(obj.curNumStr) === false)
        obj.curNumStr = '-' + obj.curNumStr;
    else 
        obj.curNumStr = obj.curNumStr.replace((/^-/), '');
    if (obj.curNumStr === '-0')
        obj.curNumStr = '0'
    console.log(obj.curNumStr);
    obj.displayValue().textContent = limitNumber(obj.curNumStr);
    obj = addNum(obj);         
    return obj;
}

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
    console.log(allZero, allNine);
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
    const len = numStr.match(/\d+/g).join('').length;
    if (len > 10) 
        return roundNum(numStr);
    return numStr;
}

function addPercent(obj) {
    if (obj.curNumStr === '')
        obj.curNumStr = obj.displayValue().textContent;
    //using unary operator to convert string into number
    obj.curNumStr = ((+obj.curNumStr) / 100).toString();
    const value = checkForLen(obj.curNumStr);
    obj.displayValue().textContent = value;
    obj = addNum(obj);
    return obj;
}

function equateExpr(obj) {
    let result = '';
    let {numFirst, numLast, firstOperator, lastOperator} = obj;
    
    if (numLast === '0' && firstOperator === '/') {
        if (numFirst === '0')
            obj.displayValue().textContent = "undefined";
        else 
            obj.displayValue().textContent = "Infinity";
        obj = allClearBtn(obj);
        return obj;
    }

    if (firstOperator === null) 
        return obj;
    
    result = calculateNum(+numFirst, firstOperator, +numLast);
    obj = allClearBtn(obj);
    obj.numFirst = result.toString();
    obj.firstOperator = lastOperator;
    obj.displayValue().textContent = checkForLen(obj.numFirst);
    console.log(obj, 'ev');
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
    const [...button] = document.querySelectorAll(".btn");
    const display = document.querySelector(".display");
    const btnData = button.reduce((arr, btn)=> {
        if (btn.getAttribute("data-key") !== null)
            arr.push(btn.getAttribute("data-key"));
        if (btn.getAttribute("data-modify") !== null)
            arr.push(btn.getAttribute("data-modify"));
        return arr; 
    }, []).join(',').split(',');
 
    let calValue = {
        numFirst: '',
        numLast: '', 
        curNumStr: '',
        firstOperator: null,
        lastOperator: null,
        displayValue() {
           return display;
        },
    }

    function mediator(e) {
        const btn = e.target;
        calValue = checkBtnClass(btn, calValue);
        console.table(calValue);
        if (calValue.lastOperator !== null)
            calValue = equateExpr(calValue);
    }

    button.forEach(button => button.addEventListener("pointerdown", mediator));
}

main();