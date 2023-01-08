# Calculator

## Description

A calculator with basic functionality to do addition, subtraction,
multiplication and division. HTML is used to give structure, CSS 
for styling and Javascript to build logic. It can be used with 
both mouse and keyboard.

## Logic

+ **Immediate Execution Logic** :
 Calculator input logic uses _immediate execution logic_. In this, the input is processed as soon as it is entered.

**EXAMPLE** : `3 + 2 - 1 x 2 / 4 =`<br>
&nbsp;&nbsp;&nbsp;&nbsp;**Immediate Execution Logic** : `2`<br>
&nbsp;&nbsp;&nbsp;&nbsp;**Expression/Formula Logic** : `5.5`
  
+ **Regular expressions** :
This is used to limit length of digits as well as round long numbers.

## Results 
- **Expect** 
    *  3 + 2  = 5
    *  3 - 2  = 1
    *  3 * 2  = 6
    *  3 / 2  = 1.5
    * -3 + 2  = -1
    * -3 + -2 = -5
    * -3 * 2  = -6
    * -3 * -2 = 6
    *  3 %    = 0.03 
    * -3 %    = -0.03
    *  0 / 0  = undefined
    *  3 / 0  = infinity
    *  3 +    = 3

  __Round Number__ _only if number is larger than set limit_
   * 3.999999999e-2 = 4.0e-2
   * 39999999999999 = 4.0e-13

## Credit

The Odin Project - Foundation Course