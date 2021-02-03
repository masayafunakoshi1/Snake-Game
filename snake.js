import { getInputDirection } from "./input.js";

//Using import and export to connect functions and values from one document to another

//How fast the snake moves per sec
export const snakeSpeed = 7;
const snakeBody = [
    {x: 11, y: 11},
]
let newSegments = 0

export function update(){
    addSegments();

    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--){
        //+1 to get the last item of snakebody, then have it equal to the 2nd to last snakebody item
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    //The length of snake body
    snakeBody.forEach(segment => {
        //adds the rows and columns based on our css grid x and y coordinates
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x
        //snake body color
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
    // console.log('draw snake')
}

export function expandSnake(amount) {
    newSegments += amount
}

//Identify where the snake's position is
export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    })
}

//Gets the postion of the head of the snake
export function getSnakeHead() {
    return snakeBody[0];
}

//Identifies if snake head touches snake body, besides the head
export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true})
    //Added ignoreHead parameter to onSnake function 
}


function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

//Adds segments to snake body
function addSegments() {
    for(let i =0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
    }

    newSegments = 0
}

