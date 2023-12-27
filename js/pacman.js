'use strict'

var PACMAN = '<img src="img/pacman_left.gif">'
var gPacman
var isSuper = false

var gEatenGhosts = []

// var PACMAN_IMG_UP
// var PACMAN_IMG_DOWN
// var PACMAN_IMG_LEFT
// var PACMAN_IMG_RIGHT = '<img src="img/snorlax_right.gif">'

// delete ghost
// push deleted ghost to eatenGhost
// spread (...) check

function createPacman(board) {
  // TODO: initialize gPacman...
  gPacman = {
    location: { i: 3, j: 5 },
    isSuper: false,
  }
  board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
  if (!gGame.isOn) return
  // TODO: use getNextLocation(), nextCell
  const nextLocation = getNextLocation(ev)
  if (!nextLocation) return

  const nextCell = gBoard[nextLocation.i][nextLocation.j]
  console.log('nextCell:', nextLocation.i)

  // TODO: return if cannot move
  if (nextCell === WALL) return

  // TODO: hitting a ghost? call gameOver
  if (nextCell === GHOST && !isSuper) {
    gameOver()
    return
  }
  if (nextCell === GHOST && isSuper) {
    const eatGhostAudio = new Audio('../audio/GhostEaten.mp3')
    eatGhostAudio.play()
    const ghostIdx = getGhostIdxByLocation(nextLocation)
    const eatenGhost = gGhosts[ghostIdx]
    gGhosts.splice(ghostIdx, 1)
    gEatenGhosts.push(eatenGhost)
    setTimeout(() => {
      gEatenGhosts.shift()
    }, 5000)
    setTimeout(() => {
      gGhosts.splice(ghostIdx, 0, eatenGhost)
    }, 5000)
  }
  // TODO: hitting food? call updateScore
  if (nextCell === FOOD) {
    updateScore(1)
    const eatFoodAudio = new Audio('../audio/Chomp.mp3')
    eatFoodAudio.play()
  }

  if (nextCell === SUPER_FOOD) {
    if (isSuper) return
    isSuper = true
    setTimeout(() => {
      isSuper = false
    }, 5000)
    powerUp()
  }

  if (nextCell === CHERRY) {
    const eatCherryAudio = new Audio('../audio/Fruit.mp3')
    eatCherryAudio.play()
    updateScore(10)
  }
  console.log('isSuper:', isSuper)

  // TODO: moving from current location:
  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY)

  // TODO: Move the pacman to new location:
  // TODO: update the model
  gPacman.location = nextLocation
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
  // TODO: update the DOM
  console.log('PACMAN:', PACMAN)
  switch (ev.key) {
    case 'ArrowLeft':
      PACMAN = '<img src="img/pacman_left.gif">'
      break
    case 'ArrowRight':
      PACMAN = '<img src="img/pacman_right.gif">'
      break
    case 'ArrowUp':
      PACMAN = '<img src="img/pacman_up.gif">'
      break
    case 'ArrowDown':
      PACMAN = '<img src="img/pacman_down.gif">'
      break
  }
  renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
  const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

  switch (eventKeyboard.key) {
    case 'ArrowUp':
      nextLocation.i--
      break

    case 'ArrowDown':
      nextLocation.i++
      break

    case 'ArrowLeft':
      nextLocation.j--
      break

    case 'ArrowRight':
      nextLocation.j++
      break

    default:
      return null
  }
  return nextLocation
}

function powerUp() {
  const audio = new Audio('../audio/Power Up.mp3')
  audio.play()
}

function ghostEaten() {
  const ghostIdx = getGhostIdxByLocation(nextLocation)
  const eatenGhost = gGhosts[ghostIdx]
  gGhosts.splice(ghostIdx, 1)
  gEatenGhosts.push(eatenGhost)
  setTimeout(() => {
    gEatenGhosts.shift()
  }, 5000)
  setTimeout(() => {
    gGhosts.splice(ghostIdx, 0, eatenGhost)
  }, 5000)
}
