import { board } from "./main.js";

export const kingCheck = (color, pos_x, pos_y) => {

    // Find all possible moves
    const move1 = document.querySelector(`[data-x='${pos_x - 1}'][data-y='${pos_y - 1}'].game-board__cell`);
    const move2 = document.querySelector(`[data-x='${pos_x}'][data-y='${pos_y - 1}'].game-board__cell`);
    const move3 = document.querySelector(`[data-x='${pos_x + 1}'][data-y='${pos_y - 1}'].game-board__cell`);
    const move4 = document.querySelector(`[data-x='${pos_x - 1}'][data-y='${pos_y}'].game-board__cell`);
    const move5 = document.querySelector(`[data-x='${pos_x + 1}'][data-y='${pos_y}'].game-board__cell`);
    const move6 = document.querySelector(`[data-x='${pos_x - 1}'][data-y='${pos_y + 1}'].game-board__cell`);
    const move7 = document.querySelector(`[data-x='${pos_x}'][data-y='${pos_y + 1}'].game-board__cell`);
    const move8 = document.querySelector(`[data-x='${pos_x + 1}'][data-y='${pos_y + 1}'].game-board__cell`);
    const moves = [move1, move2, move3, move4, move5, move6, move7, move8]

    moves.forEach((move) => {
        if (move !== null) {
            move.classList.add('game-board__cell_active');
            let moveX = +move.dataset.x;
            let moveY = +move.dataset.y;
            if ((board[moveY - 1][moveX - 1] !== null)
                && (board[moveY - 1][moveX - 1][0] == color)) {
                move.classList.remove('game-board__cell_active');
            } if ((board[moveY - 1][moveX - 1] !== null)
                && (board[moveY - 1][moveX - 1][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${moveX}'][data-y='${moveY}'].figure`);
                activeFigure.classList.add('figure_active');
            }
        }
    })

}