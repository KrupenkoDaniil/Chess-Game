import { board } from "./main.js";

export const bishopCheck = (color, pos_x, pos_y) => {

    let searchingDownRight = true;
    let searchingDownLeft = true;
    let searchingUpRight = true;
    let searchingUpLeft = true;
    let searching = true;
    
    let r = 0;
    let c = 0;
    while (searching) {

        // Down-Right direction
        let activeCell = document.querySelector(`[data-x='${(pos_x + c + 1)}'][data-y='${(pos_y + r + 1)}'].game-board__cell`);
        if (searchingDownRight) {
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
        }

        // Down-Left direction
        activeCell = document.querySelector(`[data-x='${(pos_x - c - 1)}'][data-y='${(pos_y + r + 1)}'].game-board__cell`);
        if (searchingDownLeft) {
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
        }

        // Up-Right direction
        activeCell = document.querySelector(`[data-x='${(pos_x + c + 1)}'][data-y='${(pos_y - r - 1)}'].game-board__cell`);
        if (searchingUpRight) {
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
        }

        // Up-Left direction
        activeCell = document.querySelector(`[data-x='${(pos_x - c - 1)}'][data-y='${(pos_y - r - 1)}'].game-board__cell`);
        if (searchingUpLeft) {
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
        }

        if (r >= 7) {
            searchingDownRight = false;
            searchingDownLeft = false;
            searchingUpLeft = false;
            searchingUpRight = false;
        }
        if (!searchingDownLeft && !searchingDownRight && !searchingUpLeft && !searchingUpRight) {
            searching = false;
        }
        r++;
        c++;
    }
}