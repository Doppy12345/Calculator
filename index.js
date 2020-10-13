let display = document.querySelector('div[data-function=disp]');
const operationButtons = Array.from(document.querySelectorAll('.operator'))

const biggestDisplayableNum = 999999999
const smallestDisplayableNum = 0.0000001

let storedValues = {firstNum: undefined, secondNum: undefined, operation: null}
let canOverwriteDisp = true

const operate = (chaining) => {


   let result = storedValues.operation(storedValues.firstNum, storedValues.secondNum)

    result = formatNumber(result)

   display.textContent = result

   chaining ? storedValues.firstNum = parseFloat(display.textContent): storedValues.firstNum = undefined
   
   storedValues.secondNum = undefined
   storedValues.operation = null
   unselectOtherOperations(operationButtons)
   canOverwriteDisp = true

}
//Basic arithmetic functions
const divide = (num1, num2 = num1) => num2 ? num1 / num2 : 'Error'
const multiply = (num1, num2 = num1) => num1 * num2
const subtract = (num1, num2= num1) => num1 - num2
const add = (num1, num2 = num1) => num1 + num2

const formatNumber = num => {
    console.log(num)
    if(num != 0 && (Math.abs(num) < smallestDisplayableNum || Math.abs(num)  > biggestDisplayableNum)){
        num = num.toExponential(2)
    } else if(num.toString().length > 9){
         num = num.toFixed(8)
    }
    return num
}

const negate = () => {
    display.textContent *= -1 
    canOverwriteDisp = false
}

const toPercent = () => {
    display.textContent  = formatNumber(parseFloat(display.textContent) / 100)
    canOverwriteDisp = false
}

const clear = () => {
    if(canOverwriteDisp){
        storedValues.firstNum = undefined
        storedValues.secondNum = undefined
        storedValues.operation = null
        display.textContent = 0
        unselectOtherOperations()
    } else{
        display.textContent = 0
    }
    canOverwriteDisp = true
}


const unselectOtherOperations = () => operationButtons.forEach(operator => operator.classList.remove('operator-selected')) 


const populate = (input) =>  {
    if(display.textContent === '0'){
        canOverwriteDisp = true
    }
    if(input == '.' && canOverwriteDisp){
        display.textContent = '0.'
        canOverwriteDisp = false
        return
    }
    else if(input=='.' && display.textContent.includes('.')){
        return
    }
    if(display.textContent.length <= 8 && !canOverwriteDisp){
        display.textContent += input 
    }else if(canOverwriteDisp){
        display.textContent = input
        canOverwriteDisp = false
    }
}

const canOperate = () => !(storedValues.firstNum == undefined || canOverwriteDisp)



function setUpCalculator(){

    window.addEventListener('keypress', e => {
        const input = document.querySelector(`[data-key="${e.key}"]`)
        
        if(input.className == 'num-input'){
        input.classList.add('num-input-pressed')
        populate(input.textContent)
        }

        else if(input.className == 'operator' ){
            switch(input.getAttribute('data-function')){
                case 'multiply':
                        if(!canOperate()){
                            storedValues.firstNum = parseFloat(display.textContent) 
                            canOverwriteDisp = true
                        }else{
                           storedValues.secondNum = parseFloat(display.textContent)
                           operate(true)
                        }
    
                        storedValues.operation = multiply
                        input.classList.add('operator-clicked')
                        unselectOtherOperations()
                        input.classList.add('operator-selected')
                    break
                case 'divide':
                        if(!canOperate()){
                            storedValues.firstNum = parseFloat(display.textContent) 
                            canOverwriteDisp = true
                        }else{
                           storedValues.secondNum = parseFloat(display.textContent)
                           operate(true)
                        }
    
                        storedValues.operation = divide
                        input.classList.add('operator-clicked')
                        unselectOtherOperations()
                        input.classList.add('operator-selected')
                    break
                case 'subtract':
                        if(!canOperate()){
                            storedValues.firstNum = parseFloat(display.textContent) 
                            canOverwriteDisp = true
                        }else{
                           storedValues.secondNum = parseFloat(display.textContent)
                           operate(true)
                        }
                        storedValues.operation = subtract
                        input.classList.add('operator-clicked')
                        unselectOtherOperations()
                        input.classList.add('operator-selected')
                    break
                case 'add':
                        if(!canOperate()){
                            storedValues.firstNum = parseFloat(display.textContent) 
                            canOverwriteDisp = true
                        }else{
                           storedValues.secondNum = parseFloat(display.textContent)
                           operate(true)
                        }
    
                        storedValues.operation = add
                        input.classList.add('operator-clicked')
                        unselectOtherOperations()
                        input.classList.add('operator-selected')
                    break
                case 'equals':
                    if(storedValues.operation != null){
                        storedValues.secondNum = parseFloat(display.textContent) 
                        operate(false)
                    }
                    input.classList.add('operator-clicked')
                    break    
            }
        }
    })

    const keys = Array.from(document.querySelectorAll('[name="key"]'))
    keys.forEach(key => {
        key.addEventListener('animationend', e =>{
            const baseClass = e.target.classList[0]
            e.target.classList.remove(baseClass + '-pressed',baseClass+"-clicked");
        })
    })
    
    let numButtons = Array.from(document.querySelectorAll('.num-input'))
    
    numButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.target.classList.add('num-input-clicked')
            populate(e.target.textContent)
        })
    })

    // Adds functionality for the AC button on clicks
    document.querySelector('[data-function="clear"]').addEventListener('click', e =>{
        e.target.classList.add('special-function-clicked')
        clear()
    })

    // Adds functionality for the +/- button on clicks
    document.querySelector('[data-function="negate"]').addEventListener('click', e =>{
        e.target.classList.add('special-function-clicked')
        negate()
    })

        // Adds functionality for the % button on clicks
        document.querySelector('[data-function="percent"]').addEventListener('click', e =>{
            e.target.classList.add('special-function-clicked')
            toPercent()
        })
    

    operationButtons.forEach(button => {
        switch(button.getAttribute('data-function')){
            case 'multiply':
                button.addEventListener('click', e => {
                    if(!canOperate()){
                        storedValues.firstNum = parseFloat(display.textContent) 
                        canOverwriteDisp = true
                    }else{
                       storedValues.secondNum = parseFloat(display.textContent)
                       operate(true)
                    }

                    storedValues.operation = multiply
                    button.classList.add('operator-clicked')
                    unselectOtherOperations()
                    button.classList.add('operator-selected')
                    
                })
                break
            case 'divide':
                button.addEventListener('click', e => {
                    if(!canOperate()){
                        storedValues.firstNum = parseFloat(display.textContent) 
                        canOverwriteDisp = true
                    }else{
                       storedValues.secondNum = parseFloat(display.textContent)
                       operate(true)
                    }

                    storedValues.operation = divide
                    button.classList.add('operator-clicked')
                    unselectOtherOperations()
                    button.classList.add('operator-selected')
                })
                break
            case 'subtract':
                button.addEventListener('click', e => {
                    if(!canOperate()){
                        storedValues.firstNum = parseFloat(display.textContent) 
                        canOverwriteDisp = true
                    }else{
                       storedValues.secondNum = parseFloat(display.textContent)
                       operate(true)
                    }

                    storedValues.operation = subtract
                    button.classList.add('operator-clicked')
                    unselectOtherOperations()
                    button.classList.add('operator-selected')
                })
                break
            case 'add':
                button.addEventListener('click', e => {
                    if(!canOperate()){
                        storedValues.firstNum = parseFloat(display.textContent) 
                        canOverwriteDisp = true
                    }else{
                       storedValues.secondNum = parseFloat(display.textContent)
                       operate(true)
                    }

                    storedValues.operation = add
                    button.classList.add('operator-clicked')
                    unselectOtherOperations()
                    button.classList.add('operator-selected')
                })
                break
            case 'equals':
            button.addEventListener('click' , e => {
                if(storedValues.operation != null){
                    storedValues.secondNum = parseFloat(display.textContent) 
                    operate(false)
                }
                button.classList.add('operator-clicked')
            })
                break    
        }
    })
}



setUpCalculator();
