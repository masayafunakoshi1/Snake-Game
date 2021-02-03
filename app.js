import {update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection} from '/snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'

// set last render time within the function, so we will constantly have a new render time
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')


// Looping function which requests to render the next frame 
function main(currentTime) {
    if(gameOver){
        if(confirm ('You lost :^( Press OK to restart.')){
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime

    //Evaluates if the snake ate food and got longer, or if we hit a wall and game over
    update()
    //Draws the location of the food, location of the snake, etc...
    draw()
}


// start loop first time on page load
window.requestAnimationFrame(main)

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    //Removes previous pieces of the snake as it renders
    gameBoard.innerHTML = ''
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}