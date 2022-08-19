import { board } from "./main.js";

export const bishopCheck = (color, pos_x, pos_y) => {

    // Down-Right direction
    let searchingDownRight = true;
    let r = 0;
    let c = 0;
    while (searchingDownRight) {
        const activeCell = document.querySelector(`[data-x='${(pos_x + c + 1)}'][data-y='${(pos_y + r + 1)}'].game-board__cell`);
        if (activeCell !== null) {
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y + r][pos_x + c] !== null)
                && (board[pos_y + r][pos_x + c][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
                searchingDownRight = false;
            } if ((board[pos_y + r][pos_x + c] !== null)
                && (board[pos_y + r][pos_x + c][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${(pos_x + c + 1)}'][data-y='${(pos_y + r + 1)}'].figure`);
                activeFigure.classList.add('figure_active');
                searchingDownRight = false;
            }
        }
        if (r >= 7) {
            searchingDownRight = false;
        }
        r++;
        c++;
    }

    // Down-Left direction
    let searchingDownLeft = true;
    r = 0;
    c = 0;
    while (searchingDownLeft) {
        let activeCell = document.querySelector(`[data-x='${(pos_x - c - 1)}'][data-y='${(pos_y + r + 1)}'].game-board__cell`);
        if (activeCell !== null) {
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y + r][pos_x - c - 2] !== null)
                && (board[pos_y + r][pos_x - c - 2][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
                searchingDownLeft = false;
            } if ((board[pos_y + r][pos_x - c - 2] !== null)
                && (board[pos_y + r][pos_x - c - 2][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${(pos_x - c - 1)}'][data-y='${(pos_y + r + 1)}'].figure`);
                activeFigure.classList.add('figure_active');
                searchingDownLeft = false;
            }
        }
        if (r >= 7) {
            searchingDownLeft = false;
        }
        r++;
        c++;
    }

    // Up-Right direction
    let searchingUpRight = true;
    r = 0;
    c = 0;
    while (searchingUpRight) {
        let activeCell = document.querySelector(`[data-x='${(pos_x + c + 1)}'][data-y='${(pos_y - r - 1)}'].game-board__cell`);
        if (activeCell !== null) {
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y - r - 2][pos_x + c] !== null)
                && (board[pos_y - r - 2][pos_x + c][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
                searchingUpRight = false;
            } if ((board[pos_y - r - 2][pos_x + c] !== null)
                && (board[pos_y - r - 2][pos_x + c][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${(pos_x + c + 1)}'][data-y='${(pos_y - r - 1)}'].figure`);
                activeFigure.classList.add('figure_active');
                searchingUpRight = false;
            }
        }
        if (r >= 7) {
            searchingUpRight = false;
        }
        r++;
        c++;
    }

    // Up-Left direction
    let searchingUpLeft = true;
    r = 0;
    c = 0;
    while (searchingUpLeft) {
        let activeCell = document.querySelector(`[data-x='${(pos_x - c - 1)}'][data-y='${(pos_y - r - 1)}'].game-board__cell`);
        if (activeCell !== null) {
            activeCell.classList.add('game-board__cell_active');
            if ((board[pos_y - r - 2][pos_x - c - 2] !== null)
                && (board[pos_y - r - 2][pos_x - c - 2][0] == color)) {
                activeCell.classList.remove('game-board__cell_active');
                searchingUpLeft = false;
            } if ((board[pos_y - r - 2][pos_x - c - 2] !== null)
                && (board[pos_y - r - 2][pos_x - c - 2][0] !== color)) {
                let activeFigure = document.querySelector(`[data-x='${(pos_x - c - 1)}'][data-y='${(pos_y - r - 1)}'].figure`);
                activeFigure.classList.add('figure_active');
                searchingUpLeft = false;
            }
        }
        if (r >= 7) {
            searchingUpLeft = false;
        }
        r++;
        c++;
    }

}