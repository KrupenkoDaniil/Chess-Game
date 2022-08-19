import { pawnCheck } from "./pawn.js";
import { rookCheck } from "./rook.js";
import { kniteCheck } from "./knite.js";
import { bishopCheck } from "./bishop.js";
import { kingCheck } from "./king.js";

const cellSize = 70;
const cellMargin = cellSize / 4;
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
    [BR, BKN, BB, BQ, BKI, BB, BKN, BR],
    [BP, BP, BP, BP, BP, BP, BP, BP],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [WP, WP, WP, WP, WP, WP, WP, WP],
    [WR, WKN, WB, WQ, WKI, WB, WKN, WR],
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
    if (figure !== null) {
        const newFigure = document.createElement('img');
        newFigure.setAttribute('data-x', Number(pos_x) + 1);
        newFigure.setAttribute('data-y', Number(pos_y) + 1);
        newFigure.style.left = `${cellMargin + cellSize * pos_x}px`;
        newFigure.style.top = `${cellMargin + cellSize * pos_y}px`;

        switch (figure) {
            // Draw Pawns 
            case WP:
                newFigure.classList.add('figure');
                newFigure.classList.add('pawn');
                newFigure.src = `${src}/w_pawn.png`;
                break;
            case BP:
                newFigure.classList.add('figure');
                newFigure.classList.add('pawn');
                newFigure.src = `${src}/b_pawn.png`;
                break;

            // Draw Rooks
            case WR:
                newFigure.classList.add('figure');
                newFigure.classList.add('rook');
                newFigure.src = `${src}/w_rook.webp`;
                break;
            case BR:
                newFigure.classList.add('figure');
                newFigure.classList.add('rook');
                newFigure.src = `${src}/b_rook.jpg`;
                break;

            // Draw Knites
            case WKN:
                newFigure.classList.add('figure');
                newFigure.classList.add('knite');
                newFigure.src = `${src}/w_knite.png`;
                break;
            case BKN:
                newFigure.classList.add('figure');
                newFigure.classList.add('knite');
                newFigure.src = `${src}/b_knite.png`;
                break;

            // Draw Bishops
            case WB:
                newFigure.classList.add('figure');
                newFigure.classList.add('bishop');
                newFigure.src = `${src}/w_bishop.webp`;
                break;
            case BB:
                newFigure.classList.add('figure');
                newFigure.classList.add('bishop');
                newFigure.src = `${src}/b_bishop.webp`;
                break;

            // Draw Queens
            case WQ:
                newFigure.classList.add('figure');
                newFigure.classList.add('queen');
                newFigure.src = `${src}/w_queen.jpeg`;
                break;
            case BQ:
                newFigure.classList.add('figure');
                newFigure.classList.add('queen');
                newFigure.src = `${src}/b_queen.jpg`;
                break;

            // Draw Kings
            case WKI:
                newFigure.classList.add('figure');
                newFigure.classList.add('king');
                newFigure.src = `${src}/w_king.png`;
                break;
            case BKI:
                newFigure.classList.add('figure');
                newFigure.classList.add('king');
                newFigure.src = `${src}/b_king.webp`;
                break;
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
        nullActive();
    } else {
        if (selectedElement !== null) {
            selectedElement.classList.remove('figure_selected');
        }
        nullActive();

        const elementPosX = element.dataset.x;
        const elementPosY = element.dataset.y;
        const elementName = board[elementPosY - 1][elementPosX - 1];

        // Hover selected element
        element.classList.add('figure_selected');

        // Hover cells for move
        switch (elementName[1]) {
            case 'p':
                pawnCheck(elementName[0], +elementPosX, +elementPosY);
                break;
            case 'r':
                rookCheck(elementName[0], +elementPosX, +elementPosY);
                break;
            case 'b':
                bishopCheck(elementName[0], +elementPosX, +elementPosY);
                break;
            case 'q':
                rookCheck(elementName[0], +elementPosX, +elementPosY);
                bishopCheck(elementName[0], +elementPosX, +elementPosY);
                break;
            case 'k':
                if (elementName[2] == 'n') {
                    kniteCheck(elementName[0], +elementPosX, +elementPosY)
                } else {
                    kingCheck(elementName[0], +elementPosX, +elementPosY)
                }
                break;
        }
    }
}

const nullActive = () => {
    const activeCells = document.querySelectorAll('.game-board__cell_active');
    const activeFigure = document.querySelector('.figure_active');
    if (activeFigure) {
        activeFigure.classList.remove('figure_active');
    }
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
    selectedFigure.style.left = `${cellMargin + cellSize * (selectedCellPosX - 1)}px`;
    selectedFigure.style.top = `${cellMargin + cellSize * (selectedCellPosY - 1)}px`;

    // Null
    selectedFigure.classList.remove('figure_selected');
    nullActive();

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
    gameBoard.classList.toggle('game-board_active');
}

start();