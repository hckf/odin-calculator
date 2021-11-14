// let calcInput = "";
// let display = document.getElementById('calculator-display')

function calculate(input) {
    return new Function('return ' + input)();
}

function calcButtons() {
    let calcInput = '0';
    let calcResult = 0;
    let prevAns = '0';
    let display = document.getElementById('calculator-display')
    let buttons = Array.from(document.getElementsByClassName('calculator-button'));
    let calcReg = /[+\-*\/%.]/;
    for (const button of buttons) {
        button.addEventListener('click', (e) => {
            let newInput = button.value;
            // If the last character is + - * / or .
            let calcTest = calcReg.test(String(calcInput).charAt(calcInput.length - 1));
            
            

            // If most recent input is + - * / or .
            if (newInput == '+' || newInput == '-' || newInput == '*' || newInput == '/' || newInput == '%' || newInput == '.') {
                // If the last character in the calculation string isn't a number
                if (calcTest) { 
                    // Do nothing
                } else {
                    let calcArray = calcInput.toString().split(' ');
                    if (calcArray.length > 1) {
                        if (newInput == '.') {
                            calcInput = calcInput + newInput;
                        } else {
                        calcInput = calculate(calcInput);
                        display.innerText = calcInput;
                        calcInput = calcInput + ' ' + newInput;
                        }
                    } else {
                        if (newInput == '.') {
                            calcInput = calcInput + newInput;
                        } else {
                            if (!calcInput == '0') {
                                calcInput = calcInput + ' ' + newInput;
                            }
                        }
                    }
                    
                }
                        
            } else if (newInput == '1' || newInput == '2' || newInput == '3' || newInput == '4' || newInput == '5' || newInput == '6' || newInput == '7' || newInput == '8' || newInput == '9' || newInput == '0') {
                if (calcInput == '0') {
                    calcInput = newInput;
                } else {
                    // If the last character is + - * / or .
                    if (calcTest) {
                        if (calcInput.charAt(calcInput.length - 1) == '.') {
                            calcInput = calcInput + newInput;
                        } else {
                            calcInput = calcInput + ' ' + newInput;
                        }
                    } else {
                        calcInput = calcInput + newInput;
                        // display.innerText = calcInput
                    }
                }
            } else if (newInput == 'AC') {
                calcInput = '0';
                calcResult = '0';
                prevAns = '0';
            } else if (newInput == '+/-') {
                if (calcInput.charAt(0) == '-') {
                    calcInput = calcInput.substring(1);
                } else if (calcInput == 0) {
                } else {
                    calcInput = '-' + calcInput;
                }
            } else if (newInput == 'Ans') {
                if (prevAns == '0') {
                } else {
                    if (calcInput == '0') {
                        calcInput = prevAns;
                    } else if (checkLastInput(calcInput, 'num')) {
                        calcInput = prevAns;
                    } else if (checkLastInput(calcInput, '.')) {
                        calcInput = calcInput + prevAns;
                    } else {
                        calcInput = calcInput + ' ' + prevAns;
                    }
                }

            } else if (newInput == '=') {
                calcResult = calculate(calcInput);
                calcInput = calcResult;
                prevAns = calcResult;
            }

            let calcArray = calcInput.toString().split(' ');
            let lastNum;
            if (calcArray.at(-1) == '+' || calcArray.at(-1) == '-' || calcArray.at(-1) == '*' || calcArray.at(-1) == '/' || calcArray.at(-1) == '%') {
            } else if (calcArray.at(-1) == '0') {
                display.innerText = prevAns;
            } else {
                lastNum = calcArray.at(-1);
                display.innerText = lastNum;
            }
        });
        for (const button of buttons) {
            button.addEventListener('mousedown', (e) => {
                button.style.backgroundColor = 'grey';
            }
        )};
        for (const button of buttons) {
            button.addEventListener('mouseup', (e) => {
                button.style.backgroundColor = 'darkgrey';
            }
        )}
    }
};

// Check if last input in the calculator sequence is a number or not.
function checkLastInput(calcInputArray, idString) {
    let calcArray = calcInputArray.toString().split(' ');
    if (idString == 'num') {
        if (calcArray.at(-1) == '+' || calcArray.at(-1) == '-' || calcArray.at(-1) == '*' || calcArray.at(-1) == '/' || calcArray.at(-1) == '%') {
            return false;
        } else {
            return true;
        }    
    } else if (idString == '.') {
        if (calcArray.at(-1) == '.') {
            return true;
        } else {
            return false;
        }
    }
    
}

// Look into how to dynamically shrink display text to fit div, example: https://stackoverflow.com/questions/20565201/how-to-make-the-long-text-to-fit-inside-a-small-div

calcButtons();
