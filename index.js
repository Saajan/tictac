/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

let grid = [];
const GRID_LENGTH = 3;
const player = {
    human: 1,
    ai: 2
}

function initializeGrid() {
    grid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let content = '';
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
    removeClickHandlers();
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = player.human;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    var status = checkWinner();
    if (status) {
        announce('Human', status);
        return;
    }
    callAIMethod();
}

function callAIMethod() {
    var availablePositions = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
            if (grid[colIdx][rowIdx] == 0) {
                availablePositions.push([colIdx, rowIdx]);
            }
        }
    }

    if (availablePositions.length === 0) {
        document.querySelector('#result').innerHTML = "Match Tied";
        return;
    }

    var item = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    var colx = item[0];
    var rowx = item[1]
    grid[colx][rowx] = player.ai;
    renderMainGrid();
    addClickHandlers();
    var status = checkWinner();
    if (status) {
        announce('AI', status);
        return;
    }
}

function checkWinner() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        if ((grid[colIdx][0] != 0 && grid[colIdx][1] != 0 && grid[colIdx][2] != 0 &&
            grid[colIdx][0] == grid[colIdx][1] && grid[colIdx][2] == grid[colIdx][0])) {
            return {
                type: "col",
                number: colIdx
            };
        }
    }

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        if ((grid[0][rowIdx] != 0 && grid[1][rowIdx] != 0 && grid[2][rowIdx] != 0 &&
            grid[0][rowIdx] == grid[1][rowIdx] && grid[0][rowIdx] == grid[2][rowIdx])) {
            return {
                type: "row",
                number: rowIdx
            };
        }
    }

    if ((grid[0][0] != 0 && grid[1][1] != 0 && grid[2][2] != 0 &&
        grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2])) {
        return {
            type: "diagonal",
            number: [0, 4, 8]
        };
    } else if ((grid[0][2] != 0 && grid[1][1] != 0 && grid[2][0] != 0 &&
        grid[0][2] == grid[1][1] && grid[0][2] == grid[2][0])) {
        return {
            type: "diagonal",
            number: [6, 4, 2]
        };
    }
    return false;
}

function announce(player, status) {
    document.querySelector('#result').innerHTML = player + " Won";

    console.log(status);

    var boxes = document.getElementsByClassName("box");

    if (status.type == "diagonal") {
        for (var idx = 0; idx < boxes.length; idx++) {
            if (status.number.includes(idx)) {
                boxes[idx].classList.add("won");
            }
        }
    }

    if (status.type == "row") {
        var boxes = document.querySelectorAll('[rowIdx="' + status.number + '"]');
        boxes.forEach(function (box) {
            box.classList.add("won");
        });
    }

    if (status.type == "col") {
        var boxes = document.querySelectorAll('[colIdx="' + status.number + '"]');
        boxes.forEach(function (box) {
            box.classList.add("won");
        });
    }
    removeClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function removeClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}


function restart() {
    document.querySelector('#result').innerHTML = '';
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

restart();
