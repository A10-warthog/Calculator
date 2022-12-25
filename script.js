function calculatorMain() {
    let numFirst = '';
    let numLast = '';
    let strNumber = '';
    let operate = null;
    let lastOperate = null;
        
    const numButton = document.querySelector(".button__number").children;
    const signButton = document.querySelector(".button__sign").children;
    
    function clearBtn() {
        
    }
    
    function operator(a, sign, b) {
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
}
