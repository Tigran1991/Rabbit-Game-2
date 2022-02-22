let container = document.getElementById('container');
let selectField = document.querySelector('#select-field');

let digit = 7;

let changeField = () => {
    digit = Number(selectField.value);
    playfieldArr = createArr(digit);
    if (document.getElementById('playfield') !== null) {
        container.removeChild(playfield);
    }
    createPlayfield(digit);
    drawPlayfield(digit);
}

let createArr = (digit) => {
    arr = [];
    for (let y = 0; y < digit; y++) {
        arr.push([]);
    }
    for (let y = 0; y < digit; y++) {
        for (let x = 0; x < digit; x++) {
            arr[y].push(0);
        }
    }
    return arr;
}

let playfieldArr = createArr(digit);

function createPlayfield(digit) {
    let playfield = document.createElement('div');
    playfield.setAttribute('id', 'playfield');
    container.appendChild(playfield);
    if (digit === 7) {
        playfield.style.width = '352px';
        playfield.style.height = '352px';
    }
    if (digit === 8) {
        playfield.style.width = '402px';
        playfield.style.height = '402px';
    }
    if (digit === 9) {
        playfield.style.width = '452px';
        playfield.style.height = '452px';
    }
    playfield.style.background = '#fff';
    playfield.style.border = '1px solid #333';
    playfield.style.display = 'flex';
    playfield.style.flexDirection = 'row';
    playfield.style.flexWrap = 'wrap';
}

createPlayfield(digit);

let randomPosition = (digit) => {
    return Math.floor(Math.random() * digit);
}

let createItem = (arg, digit) => {
    generateRandomIndexInPlayField(playfieldArr, digit, arg);
}

let drawPlayfield = (digit) => {
    let fieldTypes;
    if (digit === 7) {
        fieldTypes = [1, 2, 2, 2, 3, 4, 4, 4];
    } else if (digit === 8) {
        fieldTypes = [1, 2, 2, 2, 2, 3, 4, 4, 4, 4];
    } else if (digit === 9) {
        fieldTypes = [1, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 4];
    }
    fieldTypes.map(type => createItem(type, digit));
    let playfieldItem = '';
    for (let y = 0; y < playfieldArr.length; y++) {
        for (let x = 0; x < playfieldArr[y].length; x++) {
            if (playfieldArr[y][x] === 2) {
                playfieldItem += '<div id="playfield-item"><img src="./image/wolf.png" class="wolf" alt="wolf"></div>';
            } else if (playfieldArr[y][x] === 4) {
                playfieldItem += '<div id="playfield-item"><img src="./image/fence.png" class="fence" alt="fence"></div>';
            } else if (playfieldArr[y][x] === 1) {
                playfieldItem += '<div id="playfield-item"><img src="./image/rabbit.png" class="rabbit" alt="rabbit"></div>';
            } else if (playfieldArr[y][x] === 3) {
                playfieldItem += '<div id="playfield-item"><img src="./image/house.png" class="home" alt="home"></div>';
            } else {
                playfieldItem += '<div id="playfield-item"></div>';
            }
        }
    }
    playfield.innerHTML = playfieldItem;
}

drawPlayfield(digit);

let drawPlayfieldRef = () => {
    let playfieldItem = '';
    for (let y = 0; y < playfieldArr.length; y++) {
        for (let x = 0; x < playfieldArr[y].length; x++) {
            if (playfieldArr[y][x] === 2) {
                playfieldItem += '<div id="playfield-item"><img src="./image/wolf.png" class="wolf" alt="wolf"></div>';
            } else if (playfieldArr[y][x] === 4) {
                playfieldItem += '<div id="playfield-item"><img src="./image/fence.png" class="fence" alt="fence"></div>';
            } else if (playfieldArr[y][x] === 1) {
                playfieldItem += '<div id="playfield-item"><img src="./image/rabbit.png" class="rabbit" alt="rabbit"></div>';
            } else if (playfieldArr[y][x] === 3) {
                playfieldItem += '<div id="playfield-item"><img src="./image/house.png" class="home" alt="home"></div>';
            } else {
                playfieldItem += '<div id="playfield-item"></div>';
            }
        }
    }
    playfield.innerHTML = playfieldItem;
}

let move = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let wolvesMoveType = () => {
    let wolvesWin = false;
    for (let y = playfieldArr.length - 1; y >= 0; y--) {
        for (let x = 0; x < playfieldArr[y].length; x++) {
            if (playfieldArr[y][x] === 2) {
                const direction = getRandomInt(1, 5);
                if (direction === 1) {
                    if (isCoordinateAvailableForMove(y - 1, x)) {
                        if (playfieldArr[y - 1][x] === 1) {
                            wolvesWin = true;
                        }
                        playfieldArr[y - 1][x] = 2;
                        playfieldArr[y][x] = 0;
                    }
                }
                if (direction === 2) {
                    if (isCoordinateAvailableForMove(y, x + 1)) {
                        if (playfieldArr[y][x + 1] === 1) {
                            wolvesWin = true;
                        }
                        playfieldArr[y][x + 1] = 2;
                        playfieldArr[y][x] = 0;
                    }
                }
                if (direction === 3) {
                    if (isCoordinateAvailableForMove(y + 1, x)) {
                        if (playfieldArr[y + 1][x] === 1) {
                            wolvesWin = true;
                        }
                        playfieldArr[y + 1][x] = 2;
                        playfieldArr[y][x] = 0;
                    }
                }
                if (direction === 4) {
                    if (isCoordinateAvailableForMove(y, x - 1)) {
                        if (playfieldArr[y][x - 1] === 1) {
                            wolvesWin = true;
                        }
                        playfieldArr[y][x - 1] = 2;
                        playfieldArr[y][x] = 0;
                    }
                }
            }
        }
    }
    drawPlayfieldRef();
    if (wolvesWin) {
        endGame(false);
    }
}

let moveWolves = () => {
    setTimeout(() => {
        wolvesMoveType();
    }, 1000);
}

let moveDown = () => {
    for (let y = playfieldArr.length - 1; y >= 0; y--) {
        for (let x = playfieldArr.length - 1; x >= 0; x--) {
            if (playfieldArr[y][x] === 1) {
                if (y === (digit - 1)) {
                    playfieldArr[0][x] = 1;
                    playfieldArr[y][x] = 0;
                    drawPlayfieldRef();
                    break;
                }
                if (playfieldArr[y + 1][x] === 4) {
                    notifyUnAllowedMove();
                }
                if (playfieldArr[y + 1][x] === 2) {
                    endGame(false);
                }
                if (playfieldArr[y + 1][x] === 3) {
                    endGame(true);
                }
                playfieldArr[y + 1][x] = 1;
                playfieldArr[y][x] = 0;
                drawPlayfieldRef();
            }
        }
    }
    moveWolves();
}


let moveLeft = () => {
    for (let y = playfieldArr.length - 1; y >= 0; y--) {
        for (let x = 0; x < playfieldArr[y].length; x++) {
            if (playfieldArr[y][x] === 1) {
                if (x === 0) {
                    playfieldArr[y][(digit - 1)] = 1;
                    playfieldArr[y][x] = 0;
                    drawPlayfieldRef();
                    break;
                }
                if (playfieldArr[y][x - 1] === 4) {
                    notifyUnAllowedMove();
                }
                if (playfieldArr[y][x - 1] === 2) {
                    endGame(false);
                }
                if (playfieldArr[y][x - 1] === 3) {
                    endGame(true);
                }
                playfieldArr[y][x - 1] = 1;
                playfieldArr[y][x] = 0;               
                drawPlayfieldRef();
            }
        }
    }
    moveWolves();
}

let moveUp = () => {
    for (let y = 0; y < playfieldArr.length; y++) {
        for (let x = 0; x < playfieldArr[y].length; x++) {
            if (playfieldArr[y][x] === 1) {
                if (y === 0) {
                    playfieldArr[digit - 1][x] = 1;
                    playfieldArr[y][x] = 0;
                    drawPlayfieldRef();
                    break;
                }
                if (playfieldArr[y - 1][x] === 4) {
                    notifyUnAllowedMove();
                }
                if (playfieldArr[y - 1][x] === 2) {
                    endGame(false);
                }
                if (playfieldArr[y - 1][x] === 3) {
                    endGame(true);
                }
                playfieldArr[y - 1][x] = 1;
                playfieldArr[y][x] = 0;               
                drawPlayfieldRef();
            }
        }
    }
    moveWolves();
}

let moveRight = () => {
    for (let y = playfieldArr.length - 1; y >= 0; y--) {
        for (let x = playfieldArr[y].length - 1; x >= 0; x--) {
            if (playfieldArr[y][x] === 1) {
                if (x === (digit - 1)) {
                    playfieldArr[y][0] = 1;
                    playfieldArr[y][x] = 0;
                    drawPlayfieldRef();
                    break;
                }
                if (playfieldArr[y][x + 1] === 4) {
                    notifyUnAllowedMove();
                }
                if (playfieldArr[y][x + 1] === 2) {
                    endGame(false);
                }
                if (playfieldArr[y][x + 1] === 3) {
                    endGame(true);
                }
                playfieldArr[y][x + 1] = 1;
                playfieldArr[y][x] = 0;
                drawPlayfieldRef();
            }
        }
    }
    moveWolves();
}

document.onkeydown = function (e) {
    if (e.keyCode === 40) {
        moveDown();
    } else if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 38) {
        moveUp();
    } else if (e.keyCode === 39) {
        moveRight();
    }
}

function endGame(rabbitWon) {
    if (rabbitWon) {
        alert('Rabbit Win !');
    } else {
        alert('Wolfs Win !');
    }
    container.removeChild(playfield);
}

function isCoordinateAvailableForMove(y, x) {
    if (!ifCoordinateExists(y, x)) {
        return false;
    }
    if (playfieldArr[y][x] === 0 || playfieldArr[y][x] === 1) {
        return true;
    }
    if (playfieldArr[y][x] === 4) {
        return false;
    }
}

function notifyUnAllowedMove() {
    alert('Change Your move !');
}

function ifCoordinateExists(y, x) {
    return playfieldArr[y] && typeof playfieldArr[y][x] !== undefined
}

function generateRandomIndexInPlayField(playFieldArray, digit, fieldType) {
    const y = randomPosition(digit);
    const x = randomPosition(digit);
    if (playFieldArray[y][x] === 0) {
        playFieldArray[y][x] = fieldType;
        return;
    } else {
        return generateRandomIndexInPlayField(playFieldArray, digit, fieldType);
    }
}

