function calculatorMain() {
    let numFirst = null;
        
    const numButton = document.querySelector(".button__number").children;
    const signButton = document.querySelector(".button__sign").children;
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
