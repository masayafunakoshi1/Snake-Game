import {onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

let food = getRandomFoodPosition()
//How much the snake grows when it eats 
const expansionRate = 3

//If snake is ontop of food, expand the snake and change new food coordinates
export function update() {
    if(onSnake(food)) {
        expandSnake(expansionRate)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard) {
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}