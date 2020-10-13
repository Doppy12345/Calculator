// Global variable for the calculator's display element
let display = document.querySelector('div[data-function=disp]');
// Global variable for the list of all the operation button elemnts on the calculator
const operationButtons = Array.from(document.querySelectorAll('.operator'))

// Biggest and smallest displayable number for the calculator without exceeding the maximum number of digits before using scientific notation
const biggestDisplayableNum = 999999999
const smallestDisplayableNum = 0.0000001

// The currently saved terms that will be used in an operation along with the operation function
let storedValues = {firstNum: undefined, secondNum: undefined, operation: null}
// Global bool that defines if the value in the calculators display will be overwritten 
let canOverwriteDisp = true


//Basic arithmetic functions
const divide = (num1, num2 = num1) => num2 ? num1 / num2 : 'Error'
const multiply = (num1, num2 = num1) => num1 * num2
const subtract = (num1, num2= num1) => num1 - num2
const add = (num1, num2 = num1) => num1 + num2

//implements the +/- calculator button functionality
const negate = () => {
    display.textContent *= -1 
    canOverwriteDisp = false
}

//implements the % calculator button functionality
const toPercent = () => {
    display.textContent  = formatNumber(parseFloat(display.textContent) / 100)
    canOverwriteDisp = false
}

//implements the AC calculator button functionality
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
//Takes in a number and formats it so that it fits properly in the calculator's display
const formatNumber = num => {
    console.log(num)
    if(num != 0 && (Math.abs(num) < smallestDisplayableNum || Math.abs(num)  > biggestDisplayableNum)){
        num = num.toExponential(2)
    } else if(num.toString().length > 9){
         num = num.toFixed(8)
    }
    return num
}
// Operate takes in a bool to determine whether it is performing a chain of operations or if it is performing one single operation
// It then gets the data in storedValues and executes the corresponding arithmetic operation
const operate = (chaining) => {

    let result = storedValues.operation(storedValues.firstNum, storedValues.secondNum)
    //Formats the result to fit the calc display
     result = formatNumber(result)
    
    display.textContent = result
    // If chaining is true it will set the first num to the result of the operation in order to allow for the next operation to chain off of this current one
    chaining ? storedValues.firstNum = parseFloat(display.textContent): storedValues.firstNum = undefined
    
    storedValues.secondNum = undefined
    storedValues.operation = null
    unselectOtherOperations(operationButtons)
    canOverwriteDisp = true
 
 }

 // Function that returns a bool for whether or not  a operation can already be performed
 const canOperate = () => !(storedValues.firstNum == undefined || canOverwriteDisp)

// Function that takes in an imput value and populates the  calculators display with that value
const populate = (input) =>  {
    // Checks if the calculator's display only has  zero  and sets canOverwrite display to true so that a n input other than zero must be  given for the display to update
    if(display.textContent === '0'){
        canOverwriteDisp = true
    }
    //Checks  if the decimal point is the first value and updates the display to reflect that
    if(input == '.' && canOverwriteDisp){
        display.textContent = '0.'
        canOverwriteDisp = false
        return
    }
    // Checks to see if the display already contains a decimal  and if it does it doesn't add  another one
    else if(input=='.' && display.textContent.includes('.')){
        return
    }
    // Checks to see if the display is full while still allowiing for an operation to be selected and a second value to be inputted
    if(display.textContent.length <= 8 && !canOverwriteDisp){
        display.textContent += input 
    }else if(canOverwriteDisp){
        display.textContent = input
        canOverwriteDisp = false
    }
}

// Removes the operated selected CSS style from all the operators 
const unselectOtherOperations = () => operationButtons.forEach(operator => operator.classList.remove('operator-selected')) 

// Sets up the calculator by creating all necessary event listeners and implementing their functionality
function setUpCalculator(){

    // Adds an event listen for all keyboard keys with a corresponding calculator input
    // Excludes AC, and +/- calculator buttons
    window.addEventListener('keypress', e => {
        // The pressed key is stored as the input
        const input = document.querySelector(`[data-key="${e.key}"]`)
        
        //  If the input is a num-input key populate the corresponding number into the display
        if(input.className == 'num-input'){
        input.classList.add('num-input-pressed')
        populate(input.textContent)
        }

        // If the input is an operator  perform or select the operation depending on if an operation can already be performed
        else if(input.className == 'operator' ){
            // Performs a specific action depending on which operator was pressed
            switch(input.getAttribute('data-function')){
                case 'multiply':
                    // Check to see if an operation can already be performed
                        if(!canOperate()){
                            storedValues.firstNum = parseFloat(display.textContent) 
                            canOverwriteDisp = true
                        }
                        // If an operation can already be performed, perform that operation in chaining mode 
                        else{
                           storedValues.secondNum = parseFloat(display.textContent)
                           operate(true)
                        }
                        // Select  this operation and unselect all other operations
                        storedValues.operation = multiply
                        input.classList.add('operator-clicked')
                        unselectOtherOperations()
                        input.classList.add('operator-selected')
                    break
                // Do the same for each other operation as in multiply    
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

    // Gets a list of all html elements corresponding to a keyboard key and removes the completed animation class from each of  their classLists
    const keys = Array.from(document.querySelectorAll('[name="key"]'))
    keys.forEach(key => {
        key.addEventListener('animationend', e =>{
            const baseClass = e.target.classList[0]
            e.target.classList.remove(baseClass + '-pressed',baseClass+"-clicked");
        })
    })
    
    // Gets a list of all num-input keys and adds a onclick event listener to each of them similar to the on press event listener
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
    
    // adds an on click event listener to all the operation buttons on the calculator similar to their corresponding  keypress event listener functionality
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


// Sets up the calculator 
setUpCalculator();
