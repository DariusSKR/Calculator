let zero = document.querySelector('#zero')
let one = document.querySelector('#one')
let two = document.querySelector('#two')
let three = document.querySelector('#three')
let four = document.querySelector('#four')
let five = document.querySelector('#five')
let six = document.querySelector('#six')
let seven = document.querySelector('#seven')
let eight = document.querySelector('#eight')
let nine = document.querySelector('#nine')
let plus = document.querySelector('#plus')
let minus = document.querySelector('#minus')
let multiply = document.querySelector('#multiply')
let divide = document.querySelector('#division')
let equal = document.querySelector('#equal')
let dot = document.querySelector('#dot')
let screen = document.querySelector('#screen')
// let result = document.querySelector('#result')
let display = []
const operations = ['+', '-', '*', '/']
// let numberOfOperations = 0
let num1 = undefined
let num2 = undefined
let opsCounter = 0
let calcCounter = 0
//ai un array, gasesti operatia, dar care nu este cea cu index 0, deoarece primul numar poate sa fie negativ, iar dupa imparti arrayul in doua, adica ['-3','+','5'] faci ca sa fie [-3] si [5]
const addToDisplay = (id) => {
  // for (let i = 0; i < operations.length; i++) {
  //   if (id.innerText == operations[i]) {
  //     numberOfOperations += 1
  //   }
  // }

  // for (let k = 0; k < operations; k++) {
  //   if (operations[k] === id.innerText) {
  //     opsCounter += 1
  //   }
  // }
  if (display.length == 0 && id.innerText == '*') {
  } else if (display.length == 0 && id.innerText == '/') {
  } else if (display.length == 0 && id.innerText == '+') {
  } else {
    display.push(id.innerText)
    // console.log(display)
    // console.log(`display inainte de join: ${display}`)
    // if (display[2] == '*' || display[2] == '/') {
    //   display.pop()
    // }
    // if (display[2] == '-' || display[2] == '+') {
    //   display.pop()
    // }
    if (display[0] == '.') {
      display = ['0', '.']
    }
    if (display.join('') == '0..') {
      display = ['0.']
    }

    // if (display.join('') == '+') {
    //   display.pop()
    // }

    if (display.length > 10) {
      // if(display[0]=='0' &&display[1]=)

      // if (display.length >= 1 && id.innerText == '/') {
      //   display = []
      //   screen.innerText = display
      // }
      // if (display.length >= 1 && id.innerText == '*') {
      //   display = []
      //   screen.innerText = display
      // }
      // console.log(display)
      display.pop()
      // display.pop()
      // display.pop()
      screen.innerText = display.join('')
    }
    if (display[0] == 0 && display.length > 1 && display[1] != '.') {
      console.log(display)
      if (display[1] == '-' || display[1] == '+') {
        display.pop()
      }
      display = ['0', '.', display[1]]
    }

    if (
      id.innerText == '-' ||
      id.innerText == '+' ||
      id.innerText == '/' ||
      id.innerText == '*'
    ) {
      opsCounter++
    }
    // console.log(opsCounter)

    if (opsCounter > 1) {
      // console.log(calcCounter)
      // let firstOp = display.length - 1
      // let secondOp = display.length - 2
      // if (firstOp !== Number && secondOp !== Number) {
      //   display.pop()
      // }
      let lastEl = display[display.length - 1]
      display.pop()
      screen.innerText = calculate(display.join(''))
      display.push(lastEl)
      opsCounter = 1
    }

    screen.innerHTML = display.join('')
  }
}

const calculate = (toCalc) => {
  let ops = ['-', '+', '/', '*']
  let opToDo = []
  console.log(toCalc)

  // if (toCalc[toCalc.length - 1] !== Number && calcCounter == 0) {
  //   toCalc = toCalc + '0'
  //   calcCounter++
  // }

  if (toCalc[0] === '-') {
    toCalc = toCalc.split('')
    toCalc.shift()

    for (let i = 0; i < toCalc.length; i++) {
      for (let j = 0; j < ops.length; j++) {
        if (toCalc[i] == ops[j]) {
          opToDo.push(toCalc[i])
          let index = toCalc.indexOf(toCalc[i])
          num1 = toCalc.slice(0, index)
          num1 = ['-'] + [...num1].join('')
          num2 = toCalc.slice(index + 1).join('')
          toCalc.splice(index, 1)
        }
      }
    }
  } else if (toCalc[0] !== '/' && toCalc[0] !== '*') {
    toCalc = toCalc.split('')
    for (let i = 0; i < toCalc.length; i++) {
      for (let j = 0; j < ops.length; j++) {
        if (toCalc[i] == ops[j]) {
          opToDo.push(toCalc[i])
          let index = toCalc.indexOf(toCalc[i])
          num1 = toCalc.slice(0, index).join('')
          num2 = toCalc.slice(index + 1).join('')
          toCalc.splice(index, 1)
        }
      }
    }
  } else {
    console.log('Typing error!')
  }
  if (opToDo == '+') {
    let result = sum(num1, num2)
    screen.innerText = filterDecimals(result)
    display = []
    display.push(screen.innerText)
  } else if (opToDo == '-') {
    let result = subtract(num1, num2)
    screen.innerText = filterDecimals(result)
    display = []
    display.push(screen.innerText)
  } else if (opToDo == '/') {
    let result = divisionOp(num1, num2)
    screen.innerText = filterDecimals(result)
    display = []
    display.push(screen.innerText)
  } else if (opToDo == '*') {
    let result = multiplyOp(num1, num2)
    screen.innerText = filterDecimals(result)
    display = []
    display.push(screen.innerText)
  }
}

const sum = (num1, num2) => parseFloat(num1) + parseFloat(num2)
const subtract = (num1, num2) => parseFloat(num1) - parseFloat(num2)
const divisionOp = (num1, num2) => parseFloat(num1) / parseFloat(num2)
const multiplyOp = (num1, num2) => parseFloat(num1) * parseFloat(num2)

const clean = () => {
  screen.innerText = 0
  display = []
}
const filterDecimals = (result) => {
  result = result.toString()
  let array = [...result]
  let toReturn = array.join('')
  for (let l = 0; l < array.length; l++) {
    if (array[l] == '.') {
      let dot = array.indexOf('.')
      let numOfDecimals = array.slice(dot + 1)
      // console.log(numOfDecimals)
      if (numOfDecimals.length > 2) {
        let firstPartArr = array.slice(0, dot).join('')
        let secondPartArr = array
          .slice(dot + 1)
          .slice(0, 2)
          .join('')
        toReturn = [firstPartArr, '.', secondPartArr].join('')
        return parseFloat(toReturn)
      }
    }
  }
  return parseFloat(toReturn)
}

//TO DO:
//- MUST IMPLEMENT 3** OR ANY OPERATIONS ERROR. FILTER THE OPERATIONS
