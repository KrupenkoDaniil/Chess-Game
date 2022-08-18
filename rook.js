import { board } from "./main.js";

export const rookCheck = (color, pos_x, pos_y) => {

    // const currentCell = document.querySelector(`[data-x='${pos_x}'][data-y='${pos_y}'].game-board__cell`);
    const horizontalCells = document.querySelectorAll(`[data-y='${Number(pos_y)}'].game-board__cell`);
    const verticalCells = document.querySelectorAll(`[data-x='${Number(pos_x)}'].game-board__cell`);

    // Right direction
    let searchingRight = true;
    let c = 0;
    while (searchingRight) {
        if ((horizontalCells[c].dataset.x > Number(pos_x))) {
            horizontalCells[c].classList.add('game-board__cell_active');
        } if ((horizontalCells[c].dataset.x > Number(pos_x))
            && (board[Number(pos_y) - 1][c] !== null)
            && (board[Number(pos_y) - 1][c][0] == color)) {
            horizontalCells[c].classList.remove('game-board__cell_active');
            searchingRight = false;
        } if ((horizontalCells[c].dataset.x > Number(pos_x))
            && (board[Number(pos_y) - 1][c] !== null)
            && (board[Number(pos_y) - 1][c][0] !== color)) {
            let activeFigure = document.querySelector(`[data-x='${Number(c + 1)}'][data-y='${Number(pos_y)}'].figure`);
            // activeFigure.classList.add('figure_active');
            searchingRight = false;
        } if (c == 7) {
            searchingRight = false;
        }
        c++;
    }
    // Left direction
    let searchingLeft = true;
    c = 7;
    while (searchingLeft) {
        if ((horizontalCells[c].dataset.x < Number(pos_x))) {
            horizontalCells[c].classList.add('game-board__cell_active');
        } if ((horizontalCells[c].dataset.x < Number(pos_x))
            && (board[Number(pos_y) - 1][c] !== null)
            && (board[Number(pos_y) - 1][c][0] == color)) {
            horizontalCells[c].classList.remove('game-board__cell_active');
            searchingLeft = false;
        } if ((horizontalCells[c].dataset.x < Number(pos_x))
            && (board[Number(pos_y) - 1][c] !== null)
            && (board[Number(pos_y) - 1][c][0] !== color)) {
            let activeFigure = document.querySelector(`[data-x='${Number(c + 1)}'][data-y='${Number(pos_y)}'].figure`);
            activeFigure.classList.add('figure_active');
            searchingLeft = false;
        } if (c == 0) {
            searchingLeft = false;
        }
        c--;
    }
    // Down direction
    let searchingDown = true;
    c = 0;
    while (searchingDown) {
        if ((verticalCells[c].dataset.y > pos_y)) {
            verticalCells[c].classList.add('game-board__cell_active');
        } if ((verticalCells[c].dataset.y > Number(pos_y))
            && (board[c][Number(pos_x) - 1] !== null)
            && (board[c][Number(pos_x) - 1][0] == color)) {
            verticalCells[c].classList.remove('game-board__cell_active');
            searchingDown = false;
        } if ((verticalCells[c].dataset.y > pos_y)
            && (board[c][Number(pos_x) - 1] !== null)
            && (board[c][Number(pos_x) - 1][0] !== color)) {
            let activeFigure = document.querySelector(`[data-x='${pos_x}'][data-y='${c + 1}'].figure`);
            activeFigure.classList.add('figure_active');
            searchingDown = false;
        } if (c == 7) {
            searchingDown = false;
        }
        c++;
    }
    // Up direction
    let searchingUp = true;
    c = 7;
    while (searchingUp) {
        if ((verticalCells[c].dataset.y < pos_y)) {
            verticalCells[c].classList.add('game-board__cell_active');
        } if ((verticalCells[c].dataset.y < Number(pos_y))
            && (board[c][Number(pos_x) - 1] !== null)
            && (board[c][Number(pos_x) - 1][0] == color)) {
            verticalCells[c].classList.remove('game-board__cell_active');
            searchingUp = false;
        } if ((verticalCells[c].dataset.y < pos_y)
            && (board[c][Number(pos_x) - 1] !== null)
            && (board[c][Number(pos_x) - 1][0] !== color)) {
            let activeFigure = document.querySelector(`[data-x='${pos_x}'][data-y='${c + 1}'].figure`);
            activeFigure.classList.add('figure_active');
            searchingUp = false;
        } if (c == 0) {
            searchingUp = false;
        }
        c--;
    }
}
