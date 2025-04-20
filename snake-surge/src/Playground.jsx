import { useState, useRef } from "react";
import ControlButtons from "./Control-Buttons";


const BOARD_GRID = Array(15).fill(Array(15).fill(0));


function Playground() {

    let [snake, setSnake] = useState([
        [7, 8],
        [7, 7],
        [7, 6]
    ]);

    let foodLocation = useRef(generateFoodLocation());


    function generateFoodLocation() {
        let r = Math.floor(Math.random() * 15);
        let c = Math.floor(Math.random() * 15);
        
        while (isSnakeBody(r, c)) {
            r = Math.floor(Math.random() * 15);
            c = Math.floor(Math.random() * 15);
        }
        
        return [r, c];
    }

    function isFood(r, c) {
        return r === foodLocation.current[0] && c === foodLocation.current[1];
    }

    let gameInterval = useRef();
    let direction = useRef("right");
    let isRunning = useRef(false);

    // The code to trigger the start of the game by clicking the page.
    window.onclick = function() {
        if (isRunning.current) {
            // clearInterval(gameInterval.current);
            // isRunning.current = false;
        } else {
            gameInterval.current = setInterval(() => {
                main();
            }, 1000)
            isRunning.current = true;
        }
    }


    function handleButtonClick(dir) {
        direction.current = dir;
    }

        
    document.addEventListener('keydown', function(event) {
        if (event.key === 'p' && isRunning.current === true) {
            clearInterval(gameInterval);
            isRunning.current = false;
        }
    })

    function isSnakeBody(r, c) {
        for (let snakeBodyIndex of snake) {
            if (snakeBodyIndex[0] === r && snakeBodyIndex[1] === c) return true;
        }
        return false;
    }


    document.addEventListener("keydown", function(event) {
        if (event.key === 'w') {
            direction.current = "up";
        } else if (event.key === 's') {
            direction.current = 'down';
        } else if (event.key === 'a') {
            direction.current = 'left';
        } else if (event.key === 'd') {
            direction.current = 'right';
        }
    })

    function moveSnake(direction, touchedFood) {
        let newSnake;
        if (direction === "right") {
            snake.unshift([snake[0][0], snake[0][1]+1]);
        }

        else if (direction === "up") {
            snake.unshift([snake[0][0]-1, snake[0][1]]);
        }

        else if (direction === "left") {
            snake.unshift([snake[0][0], snake[0][1] - 1]);
        }
        else if (direction === "down") {
            snake.unshift([snake[0][0] + 1, snake[0][1]]);
        }

        if (!touchedFood) {
            snake.pop();
        }

        newSnake = [...snake];
        if (hasCollided()) {
            alert("Game Over");
            clearInterval(gameInterval.current);
            // Game over function here
        }
        setSnake(newSnake);
    }

    function hasCollided() {
        // Condition that checks if the snake head collides with the border of the board
        if (snake[0][0] < 0 || snake[0][1] < 0 || snake[0][0] > 14 || snake[0][1] > 14) {
            return true;
        }

        // Check if the head of the snake has touched any of its body cells
        for (let i=1; i<snake.length; i++) {
            if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1]) return true;
        }

        return false;

    }
    
    function compareArrays() {
        return snake[0][0] === foodLocation.current[0] && snake[0][1] === foodLocation.current[1];
    }

    function main() {

        // Checks if the head of the snake has collided with the food
        
        if (compareArrays()) {
            foodLocation.current = generateFoodLocation();
            // The reason this boolean argument has been passed is to tell the "moveSnake" function that the snake head made contact with the food and now we do not need to remove the tail of the snake like we were doing when the snake made no contact with the food.
            moveSnake(direction.current, true);
        } else {
            moveSnake(direction.current, false);
        }

    }



    return (
        <>
        <div className="playground">
            {
                BOARD_GRID.map((row, i) => {
                    return row.map((_, j) => {
                        return <div className={`cell ${isSnakeBody(i, j) ? 'snakebody' : ''} ${isFood(i, j) ? 'food' : ''}`} key={`${i}${j}`}></div>
                    })
                })
            }
        </div>

        <ControlButtons onButtonClick={handleButtonClick}/>

        </>
    )
}

export default Playground