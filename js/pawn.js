import { board } from "./main.js";

let enemyAhead = false;
export const pawnCheck = (color, pos_x, pos_y) => {
    const checkCellsOnLeft = document.querySelectorAll(`[data-x='${pos_x - 1}']`);
    const checkCellsOnRight = document.querySelectorAll(`[data-x='${pos_x + 1}']`);
    if (color == 'w') {

        // Null enemies statuses
        enemyAhead = false;

        // find cells ahead
        let activeCell = document.querySelector(`[data-x='${(pos_x)}'][data-y='${(pos_y-1)}'].game-board__cell`);
        if (activeCell !== null) {
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y-2][pos_x-1] !== null)
                && (board[pos_y-2][pos_x-1][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
            } if ((board[pos_y-2][pos_x-1] !== null)
                && (board[pos_y-2][pos_x-1][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${(pos_x)}'][data-y='${(pos_y-1)}'].figure`);
                activeFigure.classList.add('figure_active');
                enemyAhead = true;
            }
        }

        // check if it is the first move for pawn
        if (pos_y == 7 && !enemyAhead) {
            activeCell = document.querySelector(`[data-x='${(pos_x)}'][data-y='${(pos_y-2)}'].game-board__cell`);
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y-3][pos_x-1] !== null)
                && (board[pos_y-3][pos_x-1][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
            } if ((board[pos_y-3][pos_x-1] !== null)
                && (board[pos_y-3][pos_x-1][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${(pos_x)}'][data-y='${(pos_y-2)}'].figure`);
                activeFigure.classList.add('figure_active');
            }
        }

        // // find cells left
        activeCell = document.querySelector(`[data-x='${(pos_x-1)}'][data-y='${(pos_y-1)}'].game-board__cell`);
        if (activeCell !== null) {
             if ((board[pos_y-2][pos_x-2] !== null)
                && (board[pos_y-2][pos_x-2][0] !== color)) {
                activeCell.classList.add('game-board__cell_active');
                let activeFigure = document.querySelector(`[data-x='${(pos_x-1)}'][data-y='${(pos_y-1)}'].figure`);
                activeFigure.classList.add('figure_active');
            }
        }

        // // find cells right
        activeCell = document.querySelector(`[data-x='${(pos_x+1)}'][data-y='${(pos_y-1)}'].game-board__cell`);
        if (activeCell !== null) {
             if ((board[pos_y-2][pos_x] !== null)
                && (board[pos_y-2][pos_x][0] !== color)) {
                activeCell.classList.add('game-board__cell_active');
                let activeFigure = document.querySelector(`[data-x='${(pos_x+1)}'][data-y='${(pos_y-1)}'].figure`);
                activeFigure.classList.add('figure_active');
            }
        }

    } if (color == 'b') {
        
        // Null enemies statuses
        enemyAhead = false;

        // find cells ahead
        let activeCell = document.querySelector(`[data-x='${(pos_x)}'][data-y='${(pos_y+1)}'].game-board__cell`);
        if (activeCell !== null) {
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y][pos_x-1] !== null)
                && (board[pos_y][pos_x-1][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
            } if ((board[pos_y][pos_x-1] !== null)
                && (board[pos_y][pos_x-1][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${(pos_x)}'][data-y='${(pos_y+1)}'].figure`);
                activeFigure.classList.add('figure_active');
                enemyAhead = true;
            }
        }

        // check if it is the first move for pawn
        if (pos_y == 2 && !enemyAhead) {
            activeCell = document.querySelector(`[data-x='${pos_x}'][data-y='${pos_y+2}'].game-board__cell`);
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y+1][pos_x-1] !== null)
                && (board[pos_y+1][pos_x-1][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
            } if ((board[pos_y+1][pos_x-1] !== null)
                && (board[pos_y+1][pos_x-1][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${pos_x}'][data-y='${pos_y}'].figure`);
                activeFigure.classList.add('figure_active');
            }
        }

        // // find cells left
        activeCell = document.querySelector(`[data-x='${(pos_x-1)}'][data-y='${(pos_y+1)}'].game-board__cell`);
        if (activeCell !== null) {
             if ((board[pos_y][pos_x-2] !== null)
                && (board[pos_y][pos_x-2][0] !== color)) {
                activeCell.classList.add('game-board__cell_active');
                let activeFigure = document.querySelector(`[data-x='${(pos_x-1)}'][data-y='${(pos_y+1)}'].figure`);
                activeFigure.classList.add('figure_active');
            }
        }

        // // find cells right
        activeCell = document.querySelector(`[data-x='${(pos_x+1)}'][data-y='${(pos_y+1)}'].game-board__cell`);
        if (activeCell !== null) {
             if ((board[pos_y][pos_x] !== null)
                && (board[pos_y][pos_x][0] !== color)) {
                activeCell.classList.add('game-board__cell_active');
                let activeFigure = document.querySelector(`[data-x='${(pos_x+1)}'][data-y='${(pos_y+1)}'].figure`);
                activeFigure.classList.add('figure_active');
            }
        }
    }
}