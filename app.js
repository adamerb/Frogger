const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

// Current Index value decides where the frog starts in the grid
let currentIndex = 76
const width = 9
let timerId
let outcomeTimerId
let currentTime = 30

const moveFrog = (e) => {
    squares[currentIndex].classList.remove('frog')
    squares[currentIndex].style.backgroundColor=''
    squares[currentIndex].style.background=''

    
    switch(e.key){
        case 'ArrowLeft' :
            if (currentIndex % width !== 0){
                currentIndex -= 1
            }
            break;
        case 'ArrowUp' :
            if (currentIndex - width >=0){
                currentIndex -= width
            }
            
            break;
        case 'ArrowDown' :
            if (currentIndex + width < width * width){
                currentIndex += width
            }
           
            break;
        case 'ArrowRight' :
            if (currentIndex % width < width-1){
                currentIndex += 1
            }
            break; 
    }
   
    console.log('current index: ',currentIndex)
        if (currentIndex>=63 || currentIndex>=36 && currentIndex<=44 || currentIndex<=17){
            squares[currentIndex].style.backgroundColor='green'
            squares[currentIndex].classList.add('frog')
        } else if (currentIndex<63 && currentIndex>=45){
            squares[currentIndex].style.backgroundColor='gray'
            squares[currentIndex].classList.add('frog')
        } else if (currentIndex<36 && currentIndex>=18 && squares[currentIndex].classList.contains('l4')||squares[currentIndex].classList.contains('l5')){
            squares[currentIndex].style.backgroundColor='aqua'
            squares[currentIndex].classList.add('frog')
        } else if (currentIndex<36 && currentIndex>=18 && squares[currentIndex].classList.contains('l1')||squares[currentIndex].classList.contains('l2')||squares[currentIndex].classList.contains('l3')){
            squares[currentIndex].style.background='no-repeat center/100% url("./images/frog.png"),no-repeat center/500% url("./images/log.png")'   
            squares[currentIndex].classList.add('frog')       
        } 
        
        // squares[currentIndex].classList.add('frog')

}


const autoMoveElements = () => {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
    lose()
    win()
}

const checkOutcomes = () => {
    lose()
    win()
}

// Moves the top row of logs to the left
const moveLogLeft = (logLeft) => {
    switch(true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

// Moves the bottom row of logs to the right
const moveLogRight = (logRight) => {
    switch(true) {
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
    }
}

const moveCarLeft = (carLeft) => {
    switch(true) {
        case carLeft.classList.contains('cl1'):
            carLeft.classList.remove('cl1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('cl1')
            break
    }
}

const moveCarRight = (carRight) => {
    switch(true) {
        case carRight.classList.contains('cr1'):
            carRight.classList.remove('cr1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('cr1')
            break
    }
}

const lose = () => {
    if (
        squares[currentIndex].classList.contains('cl1') ||
        squares[currentIndex].classList.contains('cr1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
        ){
        squares[currentIndex].classList.remove('frog')
        squares[currentIndex].style.background=null
        resultDisplay.textContent = 'You Lose!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}


const win = () => {
    if (squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'You Win!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}
startPauseButton.addEventListener('click',() => {
    if (timerId) {
        clearInterval(timerId)  
        clearInterval(outcomeTimerId) 
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog )
    }
})