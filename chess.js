import { pawnCheck } from "./pawn.js";
import { rookCheck } from "./rook.js";

const src = 'img/';
let playerMove = true;

// Game Board
const gameBoard = document.querySelector('.game-board');
const BP = 'bp';
const BR = 'br';
const BKN = 'bkn';
const BB = 'bb';
const BQ = 'bq';
const BKI = 'bki';

const WP = 'wp';
const WR = 'wr';
const WKN = 'wkn';
const WB = 'wb';
const WQ = 'wq';
const WKI = 'wki';

export let board = [
    [BR, WP, null, null, null, null, null, BR],
    [null, null, BP, null, BP, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, WP, null, WP, null, null, null],
    [WR, null, null, null, null, null, null, WR],
];

// Checking Enemies
gameBoard.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const activeFigure = document.querySelector('.figure_selected');
    if (playerMove) {
        if ((eventTarget.classList.contains('figure')) // if target is figure
            && (board[eventTarget.dataset.y - 1][eventTarget.dataset.x - 1][0] == 'w')) { // if target is ally
            selectMove(eventTarget);
        } if ((eventTarget.classList.contains('game-board__cell_active')) // if it is a regular move
            || ((eventTarget.classList.contains('figure_active')) && (activeFigure))) { // if it is move with eating
            takeMove(eventTarget);
            playerMove = false;
        }
    } else {
        if ((eventTarget.classList.contains('figure')) // if target is figure
            && (board[eventTarget.dataset.y - 1][eventTarget.dataset.x - 1][0] == 'b')) { // if target is foe
            selectMove(eventTarget);
        } if ((eventTarget.classList.contains('game-board__cell_active')) // if it is a regular move
            || ((eventTarget.classList.contains('figure_active')) && (activeFigure))) { // if it is move with eating
            takeMove(eventTarget);
            playerMove = true;
        }
    }
})


//  Start
const start = () => {
    for (let row in board) {
        for (let column in board[row]) {
            const newCell = document.createElement('div');
            newCell.classList.add('game-board__cell');
            newCell.setAttribute('data-x', Number(column) + 1);
            newCell.setAttribute('data-y', Number(row) + 1);
            if (row % 2 == 0) {
                if (column % 2 == 0) {
                    newCell.classList.add('black');
                }
            } else {
                if (column % 2 !== 0) {
                    newCell.classList.add('black');
                }
            };
            gameBoard.appendChild(newCell);
            drawFigure(board[row][column], column, row);
        }
    }
}
const drawFigure = (figure, pos_x, pos_y) => {
    if (figure !== '') {
        const newFigure = document.createElement('img');
        newFigure.setAttribute('data-x', Number(pos_x) + 1);
        newFigure.setAttribute('data-y', Number(pos_y) + 1);
        newFigure.style.left = `${10 + 40 * pos_x}px`;
        newFigure.style.top = `${10 + 40 * pos_y}px`;

        // Draw Pawns 
        if (figure === 'wp') {
            newFigure.classList.add('figure');
            newFigure.classList.add('pawn');
            newFigure.src = `${src}/w_pawn.png`;
        } else if (figure === 'bp') {
            newFigure.classList.add('figure');
            newFigure.classList.add('pawn');
            newFigure.src = `${src}/b_pawn.png`;
        }
        // Draw Rooks
        if (figure == 'wr') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/w_rook.webp`;
        }
        if (figure == 'br') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/b_rook.jpg`;
        }
        // Draw Knites
        if (figure == 'wkn') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/w_knite.png`;
        }
        if (figure == 'bkn') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/b_knite.png`;
        }
        // Draw Bishops
        if (figure == 'wb') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/w_bishop.webp`;
        }
        if (figure == 'bb') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/b_bishop.webp`;
        }
        // Draw Queens
        if (figure == 'wq') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/w_queen.jpeg`;
        }
        if (figure == 'bq') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/b_queen.jpg`;
        }
        // Draw Kings
        if (figure == 'wki') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/w_king.png`;
        }
        if (figure == 'bki') {
            newFigure.classList.add('figure');
            newFigure.src = `${src}/b_king.webp`;
        }

        gameBoard.appendChild(newFigure);
    }
}

// Selecting
const selectMove = (element) => {
    // Check other elements
    const selectedElement = document.querySelector('.figure_selected');
    if (selectedElement == element) {
        element.classList.remove('figure_selected');
        nullCells();
    } else {
        if (selectedElement !== null) {
            selectedElement.classList.remove('figure_selected');
            nullCells();
        }
        const elementPosX = element.dataset.x;
        const elementPosY = element.dataset.y;
        const elementName = board[elementPosY - 1][elementPosX - 1];

        // Hover selected element
        element.classList.add('figure_selected');
        // Hover cells for move
        if (elementName[1] == 'p') {
            pawnCheck(elementName[0], elementPosX, elementPosY);
        }else if (elementName[1] == 'r') {
            rookCheck(elementName[0], elementPosX, elementPosY);
        }
    }
}

const nullCells = () => {
    const activeCells = document.querySelectorAll('.game-board__cell_active');
    for (let c = 0; c < activeCells.length; c++) {
        activeCells[c].classList.remove('game-board__cell_active');
    }
}

// Moving 
const takeMove = (selectedCellPos) => {
    const selectedFigure = document.querySelector('.figure_selected');

    // find figure's coords
    const selectedFigurePosX = selectedFigure.dataset.x;
    const selectedFigurePosY = selectedFigure.dataset.y;

    // find cell's coords
    const selectedCellPosX = selectedCellPos.dataset.x;
    const selectedCellPosY = selectedCellPos.dataset.y;

    // Eating other figure
    if (board[selectedCellPosY - 1][selectedCellPosX - 1] !== null) {
        const eatenEnemies = document.querySelectorAll(`[data-x='${selectedCellPosX}']`);
        for (let e = 0; e < eatenEnemies.length; e++) {
            if ((eatenEnemies[e].dataset.y == selectedCellPosY)
                && eatenEnemies[e].classList.contains('figure')) {
                eatenEnemies[e].style.display = 'none';
            }
        }
    }

    //  Changing board possitions
    const selectedFigureName = board[selectedFigurePosY - 1][selectedFigurePosX - 1];
    board[selectedFigurePosY - 1][selectedFigurePosX - 1] = null;
    board[selectedCellPosY - 1][selectedCellPosX - 1] = selectedFigureName;


    // Changing figure possition
    selectedFigure.setAttribute('data-x', Number(selectedCellPosX));
    selectedFigure.setAttribute('data-y', Number(selectedCellPosY));
    selectedFigure.style.left = `${10 + 40 * (selectedCellPosX - 1)}px`;
    selectedFigure.style.top = `${10 + 40 * (selectedCellPosY - 1)}px`;

    // Null
    selectedFigure.classList.remove('figure_selected');
    nullCells();

    // Check if pawn riched the edge of the board
    if (((selectedFigure.dataset.y == 1) || (selectedFigure.dataset.y == 8)) && selectedFigure.classList.contains('pawn')) {
        selectedFigure.classList.remove('pawn')
        selectedFigure.classList.add('queen')
        if (playerMove) {
            selectedFigure.src = `${src}/w_queen.jpeg`
        } else {
            selectedFigure.src = `${src}/b_queen.jpg`
        }
    }
}


start();