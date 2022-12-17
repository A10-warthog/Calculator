function calculatorMain() {    
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
