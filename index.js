let display = document.querySelector('div[data-function=disp]');
let operate = (num1, operator, num2) => {
    operator(num1, num2)
}
//Basic arithmetic functions
const divide = (num1, num2) => num1 / num2
const multiply = (num1, num2) => num1 * num2
const subtract = (num1, num2) => num1 - num2
const add = (num1, num2) => num1 + num2


const populate = (input) =>  {
    if(input == '.' && display.textContent === '0'){
        display.textContent = '0.'
        return
    }
    else if(input=='.' && display.textContent.includes('.')){
        return
    }
    (display.textContent === '0') ?  display.textContent = input : display.textContent += input 
}
function setUpCalculator(){

    window.addEventListener('keydown', e => {
        const input = document.querySelector(`[data-key="${e.key}"]`)
        if(input.className == 'num-input'){
        input.classList.add('num-input-pressed')
        populate(input.textContent)
        }
    })

    
    let numButtons = Array.from(document.querySelectorAll('.num-input'))
    
    numButtons.forEach(button => {
        button.addEventListener('click', e => {
            populate(e.target.textContent)
        })
    })
}



setUpCalculator();

