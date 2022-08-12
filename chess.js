const src = 'img/';
let playerMove = true;

// Game Board
const gameBoard = document.querySelector('.game-board');
let board = [
    ['br', 'bkn', 'bb', 'bq', 'bki', 'bb', 'bkn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wkn', 'wb', 'wq', 'wki', 'wb', 'wkn', 'wr']
];

// Checking Enemies
let enemyAhead = false;

gameBoard.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const activeFigure = document.querySelector('.figure_selected');
    if (playerMove) {
        if ((eventTarget.classList.contains('figure')) // if target is figure
            && (board[eventTarget.dataset.y - 1][eventTarget.dataset.x - 1][0] == 'w')) { // if target is ally
            SelectMove(eventTarget);
        } if ((eventTarget.classList.contains('game-board__cell_active')) // if it is a regular move
            || ((eventTarget.classList.contains('figure_active')) && (activeFigure))) { // if it is move with eating
            TakeMove(eventTarget);
            playerMove = false;
        }
    } else {
        if ((eventTarget.classList.contains('figure')) // if target is figure
            && (board[eventTarget.dataset.y - 1][eventTarget.dataset.x - 1][0] == 'b')) { // if target is foe
            SelectMove(eventTarget);
        } if ((eventTarget.classList.contains('game-board__cell_active')) // if it is a regular move
            || ((eventTarget.classList.contains('figure_active')) && (activeFigure))) { // if it is move with eating
            TakeMove(eventTarget);
            playerMove = true;
        }
    }
})


//  Start
start = () => {
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
drawFigure = (figure, pos_x, pos_y) => {
    if (figure !== '') {
        const newFigure = document.createElement('img');
        newFigure.setAttribute('data-x', Number(pos_x) + 1);
        newFigure.setAttribute('data-y', Number(pos_y) + 1);
        newFigure.style.left = `${10 + 40 * pos_x}px`;
        newFigure.style.top = `${10 + 40 * pos_y}px`;

        // Draw Pawns 
        if (figure == 'wp') {
            newFigure.classList.add('figure');
            newFigure.classList.add('pawn');
            newFigure.src = `${src}/w_pawn.png`;
        }
        if (figure == 'bp') {
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
SelectMove = (element) => {
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
        }
    }
}

nullCells = () => {
    const activeCells = document.querySelectorAll('.game-board__cell_active');
    for (let c = 0; c < activeCells.length; c++) {
        activeCells[c].classList.remove('game-board__cell_active');
    }
}

pawnCheck = (color, pos_x, pos_y) => {
    if (color == 'w') {

        // Null enemies statuses
        enemyAhead = false;

        // find cells ahead
        const checkCellsAhead = document.querySelectorAll(`[data-x='${pos_x}']`);
        for (let c = 0; c < checkCellsAhead.length; c++) {
            if ((checkCellsAhead[c].dataset.y == Number(pos_y) - 1) // if it is the right  coords
                && (checkCellsAhead[c].classList.contains('game-board__cell')) // if it is the cell
                && (board[Number(pos_y) - 2][pos_x - 1] == '')) { // if it is empty
                checkCellsAhead[c].classList.add('game-board__cell_active');
            } if ((checkCellsAhead[c].dataset.y == Number(pos_y) - 1) // Checking if enemy Ahead
                && (checkCellsAhead[c].classList.contains('game-board__cell'))
                && (board[Number(pos_y) - 2][pos_x - 1] !== '')) {
                enemyAhead = true;
            }
        }
        // check if it is the first move for pawn
        if (pos_y == 7 && !enemyAhead) {
            for (let c = 0; c < checkCellsAhead.length; c++) {
                if ((checkCellsAhead[c].dataset.y == Number(pos_y) - 2)
                    && (checkCellsAhead[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) - 3][pos_x - 1] == '')) {
                    checkCellsAhead[c].classList.add('game-board__cell_active');
                }
            }
        }

        // find cells left
        const checkCellsOnLeft = document.querySelectorAll(`[data-x='${pos_x - 1}']`);
        if (checkCellsOnLeft.length !== 0) {
            for (let c = 0; c < checkCellsOnLeft.length; c++) {
                if ((checkCellsOnLeft[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnLeft[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) - 2][pos_x - 2] !== '')
                    && (board[Number(pos_y) - 2][pos_x - 2][0] !== 'w')) { // Checking if it is ally 
                    checkCellsOnLeft[c].classList.add('game-board__cell_active');
                } if ((checkCellsOnLeft[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnLeft[c].classList.contains('figure'))
                    && (board[Number(pos_y) - 2][pos_x - 2] !== '')
                    && (board[Number(pos_y) - 2][pos_x - 2][0] !== 'w')) { // Checking if it is ally 
                    checkCellsOnLeft[c].classList.add('figure_active');
                }
            }
        }

        // find cells right
        const checkCellsOnRight = document.querySelectorAll(`[data-x='${Number(pos_x) + 1}']`);
        if (checkCellsOnRight.length !== 0) {
            for (let c = 0; c < checkCellsOnRight.length; c++) {
                if ((checkCellsOnRight[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnRight[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) - 2][Number(pos_x)] !== '')
                    && (board[Number(pos_y) - 2][Number(pos_x)][0] !== 'w')) { // Checking if it is ally 
                    checkCellsOnRight[c].classList.add('game-board__cell_active');
                } if ((checkCellsOnRight[c].dataset.y == Number(pos_y) - 1)
                    && (checkCellsOnRight[c].classList.contains('figure'))
                    && (board[Number(pos_y) - 2][Number(pos_x)] !== '')
                    && (board[Number(pos_y) - 2][Number(pos_x)][0] !== 'w')) { // Checking if it is ally 
                    checkCellsOnRight[c].classList.add('figure_active');
                }
            }
        }

    } if (color == 'b') {

        // Null enemies statuses
        enemyAhead = false;

        // find cells ahead
        const checkCellsAhead = document.querySelectorAll(`[data-x='${pos_x}']`);
        for (let c = 0; c < checkCellsAhead.length; c++) {
            if ((checkCellsAhead[c].dataset.y == Number(pos_y) + 1) // if it is the right  coords
                && (checkCellsAhead[c].classList.contains('game-board__cell')) // if it is the cell
                && (board[Number(pos_y)][pos_x - 1] == '')) { // if it is empty
                checkCellsAhead[c].classList.add('game-board__cell_active');
            } if ((checkCellsAhead[c].dataset.y == Number(pos_y) + 1) // Checking if enemy Ahead
                && (checkCellsAhead[c].classList.contains('game-board__cell'))
                && (board[Number(pos_y)][pos_x - 1] !== '')) {
                enemyAhead = true;
            }
        }
        // check if it is the first move for pawn
        if (pos_y == 2 && !enemyAhead) {
            for (let c = 0; c < checkCellsAhead.length; c++) {
                if ((checkCellsAhead[c].dataset.y == Number(pos_y) + 2)
                    && (checkCellsAhead[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y) + 1][pos_x - 1] == '')) {
                    checkCellsAhead[c].classList.add('game-board__cell_active');
                }
            }
        }

        // find cells left
        const checkCellsOnLeft = document.querySelectorAll(`[data-x='${pos_x - 1}']`);
        if (checkCellsOnLeft.length !== 0) {
            for (let c = 0; c < checkCellsOnLeft.length; c++) {
                if ((checkCellsOnLeft[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnLeft[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y)][pos_x - 2] !== '')
                    && (board[Number(pos_y)][pos_x - 2][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnLeft[c].classList.add('game-board__cell_active');
                } if ((checkCellsOnLeft[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnLeft[c].classList.contains('figure'))
                    && (board[Number(pos_y)][pos_x - 2] !== '')
                    && (board[Number(pos_y)][pos_x - 2][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnLeft[c].classList.add('figure_active');
                }
            }
        }

        // find cells right
        const checkCellsOnRight = document.querySelectorAll(`[data-x='${Number(pos_x) + 1}']`);
        if (checkCellsOnRight.length !== 0) {
            for (let c = 0; c < checkCellsOnRight.length; c++) {
                if ((checkCellsOnRight[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnRight[c].classList.contains('game-board__cell'))
                    && (board[Number(pos_y)][Number(pos_x)] !== '')
                    && (board[Number(pos_y)][Number(pos_x)][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnRight[c].classList.add('game-board__cell_active');
                } if ((checkCellsOnRight[c].dataset.y == Number(pos_y) + 1)
                    && (checkCellsOnRight[c].classList.contains('figure'))
                    && (board[Number(pos_y)][Number(pos_x)] !== '')
                    && (board[Number(pos_y)][Number(pos_x)][0] !== 'b')) { // Checking if it is foe 
                    checkCellsOnRight[c].classList.add('figure_active');
                }
            }
        }





    }
}

// Moving 
TakeMove = (selectedCellPos) => {
    const selectedFigure = document.querySelector('.figure_selected');

    // find figure's coords
    const selectedFigurePosX = selectedFigure.dataset.x;
    const selectedFigurePosY = selectedFigure.dataset.y;

    // find cell's coords
    const selectedCellPosX = selectedCellPos.dataset.x;
    const selectedCellPosY = selectedCellPos.dataset.y;

    // Eating other figure
    if (board[selectedCellPosY - 1][selectedCellPosX - 1] !== '') {
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
    board[selectedFigurePosY - 1][selectedFigurePosX - 1] = '';
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