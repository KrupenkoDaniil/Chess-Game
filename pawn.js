import { board } from "./main.js";

let enemyAhead = false;
export const pawnCheck = (color, pos_x, pos_y) => {
    const checkCellsAhead = document.querySelectorAll(`[data-x='${pos_x}']`);
    const checkCellsOnLeft = document.querySelectorAll(`[data-x='${pos_x - 1}']`);
    const checkCellsOnRight = document.querySelectorAll(`[data-x='${Number(pos_x) + 1}']`);
    if (color == 'w') {

        // Null enemies statuses
        enemyAhead = false;

        // find cells ahead
        for (let c = 0; c < checkCellsAhead.length; c++) {
            if ((checkCellsAhead[c].dataset.y == Number(pos_y) - 1) // if it is the right  coords
                && (checkCellsAhead[c].classList.contains('game-board__cell')) // if it is the cell
                && (board[Number(pos_y) - 2][pos_x - 1] == null)) { // if it is empty
                checkCellsAhead[c].classList.add('game-board__cell_active');
            } if ((checkCellsAhead[c].dataset.y == Number(pos_y) - 1) // Checking if enemy Ahead
                && (checkCellsAhead[c].classList.contains('game-board__cell'))
                && (board[Number(pos_y) - 2][pos_x - 1] !== null)) {
                enemyAhead = true;
            }
        }
        // check if it is the first move for pawn
        if (pos_y == 7 && !enemyAhead) {
            for (let c = 0; c < checkCellsAhead.length; c++) {
                if ((checkCellsAhead[c].dataset.y == Number(pos_y) - 2)
                    && (checkCellsAhead[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) - 3][pos_x - 1] == null)) {
                    checkCellsAhead[c].classList.add('game-board__cell_active');
                }
            }
        }

        // find cells left
        if (checkCellsOnLeft.length !== 0) {
            for (let c = 0; c < checkCellsOnLeft.length; c++) {
                if (
                    (checkCellsOnLeft[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnLeft[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) - 2][pos_x - 2] !== null)
                    && (board[Number(pos_y) - 2][pos_x - 2][0] !== 'w') // Checking if it is ally 
                ) {
                    checkCellsOnLeft[c].classList.add('game-board__cell_active');
                } if (
                    (checkCellsOnLeft[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnLeft[c].classList.contains('figure'))
                    && (board[Number(pos_y) - 2][pos_x - 2] !== null)
                    && (board[Number(pos_y) - 2][pos_x - 2][0] !== 'w') // Checking if it is ally 
                ) {
                    checkCellsOnLeft[c].classList.add('figure_active');
                }
            }
        }

        // find cells right
        if (checkCellsOnRight.length !== 0) {
            for (let c = 0; c < checkCellsOnRight.length; c++) {
                if (
                    (checkCellsOnRight[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnRight[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) - 2][Number(pos_x)] !== null)
                    && (board[Number(pos_y) - 2][Number(pos_x)][0] !== 'w') // Checking if it is ally 
                ) {
                    checkCellsOnRight[c].classList.add('game-board__cell_active');
                } if (
                    (checkCellsOnRight[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnRight[c].classList.contains('figure'))
                    && (board[Number(pos_y) - 2][Number(pos_x)] !== null)
                    && (board[Number(pos_y) - 2][Number(pos_x)][0] !== 'w') // Checking if it is ally 
                ) {
                    checkCellsOnRight[c].classList.add('figure_active');
                }
            }
        }

    } if (color == 'b') {

        // Null enemies statuses
        enemyAhead = false;

        // find cells ahead
        for (let c = 0; c < checkCellsAhead.length; c++) {
            if ((checkCellsAhead[c].dataset.y == Number(pos_y) + 1) // if it is the right  coords
                && (checkCellsAhead[c].classList.contains('game-board__cell')) // if it is the cell
                && (board[Number(pos_y)][pos_x - 1] == null)) { // if it is empty
                checkCellsAhead[c].classList.add('game-board__cell_active');
            } if ((checkCellsAhead[c].dataset.y == Number(pos_y) + 1) // Checking if enemy Ahead
                && (checkCellsAhead[c].classList.contains('game-board__cell'))
                && (board[Number(pos_y)][pos_x - 1] !== null)) {
                enemyAhead = true;
            }
        }
        // check if it is the first move for pawn
        if (pos_y == 2 && !enemyAhead) {
            for (let c = 0; c < checkCellsAhead.length; c++) {
                if ((checkCellsAhead[c].dataset.y == Number(pos_y) + 2)
                    && (checkCellsAhead[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) + 1][pos_x - 1] == null)) {
                    checkCellsAhead[c].classList.add('game-board__cell_active');
                }
            }
        }

        // find cells left
        if (checkCellsOnLeft.length !== 0) {
            for (let c = 0; c < checkCellsOnLeft.length; c++) {
                if ((checkCellsOnLeft[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnLeft[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y)][pos_x - 2] !== null)
                    && (board[Number(pos_y)][pos_x - 2][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnLeft[c].classList.add('game-board__cell_active');
                } if ((checkCellsOnLeft[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnLeft[c].classList.contains('figure'))
                    && (board[Number(pos_y)][pos_x - 2] !== null)
                    && (board[Number(pos_y)][pos_x - 2][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnLeft[c].classList.add('figure_active');
                }
            }
        }

        // find cells right
        if (checkCellsOnRight.length !== 0) {
            for (let c = 0; c < checkCellsOnRight.length; c++) {
                if ((checkCellsOnRight[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnRight[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y)][Number(pos_x)] !== null)
                    && (board[Number(pos_y)][Number(pos_x)][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnRight[c].classList.add('game-board__cell_active');
                } if ((checkCellsOnRight[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnRight[c].classList.contains('figure'))
                    && (board[Number(pos_y)][Number(pos_x)] !== null)
                    && (board[Number(pos_y)][Number(pos_x)][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnRight[c].classList.add('figure_active');
                }
            }
        }
    }
}