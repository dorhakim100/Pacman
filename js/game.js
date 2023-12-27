'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER_FOOD = '🍕'
const CHERRY = '🍒'

var isRestart = false
var gWinningScore = 60
var gCherryInterval

const gGame = {
  score: 0,
  isOn: false,
}
var gBoard

function init() {
  const audio = new Audio('../audio/Intro.mp3')
  audio.play()
  isRestart = false
  gGame.score = 0

  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)

  renderBoard(gBoard, '.board-container')
  gGame.isOn = true
  gCherryInterval = setInterval(addCherry, 15000)
}

function buildBoard() {
  updateScore(0, gWinningScore)
  const size = 10
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([]) // board[i] = []

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL
      }
    }
  }
  board[1][1] = SUPER_FOOD
  board[1][8] = SUPER_FOOD
  board[8][1] = SUPER_FOOD
  board[8][8] = SUPER_FOOD
  return board
}

function updateScore(diff, winningScore) {
  winningScore = 60
  const elScore = document.querySelector('h2 span')
  console.log('winningScore:', winningScore)
  // Model
  gGame.score += diff
  // DOM
  elScore.innerText = gGame.score
  if (gGame.score > winningScore || gGame.score === winningScore) {
    gameOver()
  }
}

function gameOver() {
  clearInterval(gGhostsInterval)
  if (gGame.score < gWinningScore) {
    var lost = true
  }
  console.log('Game Over')
  if (lost) {
    const audio = new Audio('../audio/Death.mp3')
    audio.play()
  } else {
    const audio = new Audio('../audio/Win.mp3')
    audio.play()
  }
  gGame.isOn = false
  modalOpen()
  gGame.score = 0
}

function onPlayAgain() {
  isRestart = true
  gGhosts = []
  console.log('isRestart:', isRestart)
  console.log('gGame.isOn:', gGame.isOn)
  init()
  console.log('isRestart:', isRestart)
}

function addCherry() {
  console.log('works')
  if (gGame.isOn === false) return
  const cell = getEmptyCell(gBoard)
  if (!cell) return
  gBoard[cell.i][cell.j] = CHERRY
  renderCell(cell, CHERRY)
}
