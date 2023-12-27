'use strict'

function renderBoard(mat, selector) {
  var strHTML = '<table><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  // const elCell = document.querySelector(`[data-i="${location.i}"][data-j="${location.j}"]`)
  elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function modalOpen() {
  var strHTML = ''
  strHTML += ` <div class="modal">
    <h1>Game Over</h1>`
  if (gGame.score === 60) {
    strHTML += `<h2>You Won!!</h2>
    <button class="button" onclick="onPlayAgain()">Play again</button>`
  } else {
    strHTML += `<h2>Score:${gGame.score}</h2>
        <button class="button" onclick="onPlayAgain()">Play again</button>
    </div>`
  }

  const elContainer = document.querySelector('.board-container')
  elContainer.innerHTML = strHTML
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getEmptyCell(board) {
  const emptyCells = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === EMPTY || board[i][j] === FOOD) {
        emptyCells.push({ i, j })
      }
    }
  }
  if (!emptyCells.length) return null
  const randomIdx = getRandomIntInclusive(0, emptyCells.length - 1)
  return emptyCells[randomIdx]
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}
