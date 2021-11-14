// let calcInput = "";
// let display = document.getElementById('calculator-display')

function calculate(input) {
    return new Function('return ' + input)();
}

function calcButtons() {
    let calcInput = '0';
    let calcResult = 0;
    let prevAns;
    let display = document.getElementById('calculator-display')
    let buttons = Array.from(document.getElementsByClassName('calculator-button'));
    let calcReg = /[+\-*\/%.]/;
    for (const button of buttons) {
        button.addEventListener('click', (e) => {
            let newInput = button.value;
            let calcTest = calcReg.test(String(calcInput).charAt(calcInput.length - 1));
            switch(newInput) {
                case ('+'):
                case ('-'):
                case ('*'):
                case ('/'):
                case ('%'):
                case ('.'):
                    // If the last character in the equation is any of the above symbols, prevent repeat inputs (and only allow one decimal input per number)
                    if (calcTest) { 
                        calcInput = calcInput;
                        display.innerText = calcInput;
                    } else {
                        if (newInput == '.') {
                            let inputArr = calcInput.split(' ');
                            if (String(inputArr.at(-1)).includes('.')) {
                            } else {
                                calcInput = calcInput + newInput;
                            }
                        } else {
                        calcInput = calcInput + ' ' + newInput;
                        }
                    }
                    display.innerText = calcInput;
                    break;
                case 'AC':
                    calcInput = '0';
                    calcResult = 0;
                    display.innerText = 0;
                    break;
                case '+/-':
                    if (calcInput.charAt(0) == '-') {
                        calcInput = calcInput.substring(1);
                        display.innerText = calcInput; 

                    } else if (calcInput == 0) {
                    } else {
                        calcInput = '-' + calcInput;
                        display.innerText = calcInput;
                    }
                    break;
                case 'Ans':
                    if (calcResult != 0 && calcInput != '0' ) {
                        if (calcTest) {
                                calcInput = String(calcInput) + ' ' + String(prevAns);
                        } else {
                            calcInput = String(calcInput) + String(prevAns);
                        }
                    } else if (calcResult != 0 && calcInput == '0' ) {
                        calcInput = prevAns;
                    }
                    display.innerText = calcInput;
                    break;
                case '=':
                    if (calcInput) {
                        calcResult = calculate(calcInput);
                        console.log(calcResult)
                        calcInput = calcResult;
                        prevAns = calcResult;
                        display.innerText = calcResult;
                    }
                    
                    break;
                default:
                    if (calcInput == '0') {
                        calcInput = newInput;
                    } else {
                        if (calcTest) { 
                            if (calcInput.charAt(calcInput.length - 1) == '.') {
                                calcInput = calcInput + newInput;
                            } else {
                                calcInput = calcInput + ' ' + newInput;
                            }
                        } else {
                            calcInput = calcInput + newInput;
                        }
                    }
                    display.innerText = calcInput;
            }
        })
    }
};

// Look into how to dynamically shrink display text to fit div, example: https://stackoverflow.com/questions/20565201/how-to-make-the-long-text-to-fit-inside-a-small-div

calcButtons();
