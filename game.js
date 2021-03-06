const divShooter = document.querySelector('div.shooter');
const divResult = document.querySelector('div.result');
const divBoard = document.querySelector('div.board');
const divEnemy = document.querySelector("div.enemy");
const spanResult = document.querySelector('p.result span');
const btnNewGame = document.querySelector('button.newGame');
const spanTimer = document.querySelector('p.timer span');
const divModal = document.querySelector('div.modal-wrap');
const spanPlayer = document.querySelector('p.player span');
const inputName = document.querySelector('input.name');
const divLastResults = document.querySelector('div.lastResults');
let intervalIdBullet;
let shootFlag = false;
let gameStatusFlag = false;
let x = 140;
let y = 470;
let xEnemy;
let yEnemy;
let result = 0;
let startTime = 60;


/* Ruchy klawiszami*/
function moveRight() {
    x = divShooter.offsetLeft + 10;
    divShooter.style.left = x + 'px';
    // console.log(x);
}

function moveLeft() {
    x = divShooter.offsetLeft - 10;
    divShooter.style.left = x + 'px';
}



function shoot() {
    shootFlag = true;
    const divBullet = document.createElement('div');
    divBullet.classList.add('bullet');
    divBullet.style.left = x + 'px';
    divBoard.appendChild(divBullet);
    intervalIdBullet = setInterval(function () {
        // y = divBullet.offsetBottom + 10;
        y -= 10;
        divBullet.style.top = y + 'px';
        if (y < 0) {
            y = 470;
            clearInterval(intervalIdBullet);
            divBoard.removeChild(divBullet);
            shootFlag = false;
        }
        if (x == xEnemy & y == yEnemy) {
            result++;
            spanResult.textContent = result;
            console.log(result);
            clearInterval(intervalIdBullet);
            y = 470;
            divBoard.removeChild(divBullet);
            shootFlag = false;
            clearInterval(intervalEnemy);
            moveEnemy();
            intervalEnemy = setInterval(moveEnemy, 5000);
        }
    }, 30)
}

function moveEnemy() {
    xEnemy = Math.floor(Math.random() * 300);
    yEnemy = Math.floor(Math.random() * 200);
    xEnemy.toFixed();
    yEnemy.toFixed();
    xEnemy = xEnemy - (xEnemy % 10);
    yEnemy = yEnemy - (yEnemy % 10);
    divEnemy.style.left = xEnemy + 'px';
    divEnemy.style.top = yEnemy + 'px';
    console.log(xEnemy);
}

function startGame() {
    divBoard.style.display = 'block';
    divModal.style.display = 'none';
    moveEnemy();
    intervalEnemy = setInterval(moveEnemy, 5000);
    spanPlayer.textContent = inputName.value;
    if (gameStatusFlag == false) {
        gameStatusFlag = true;
        result = 0;
        spanResult.textContent = result;
        divResult.textContent = "";
        let timer = setInterval(function finalCountdown() {
            startTime--;
            spanTimer.textContent = (startTime < 10 ? "0" + startTime : startTime) + "s.";
            if (startTime == 0) {
                clearInterval(timer);
                startTime = 60;
                divResult.textContent = `GAME OVER, YOUR RESULT: ${result}`;
                const divLast = document.createElement('div'); //proba
                divLast.textContent = `${inputName.value}: ${result}`; //proba
                divLastResults.appendChild(divLast); //proba
                spanResult.textContent = "0";
                result = 0;
                gameStatusFlag = false;
                divModal.style.display = 'block';
                clearInterval(intervalEnemy);
                divBoard.style.display = 'none';
            }

        }, 1000);
    }


}


/*obsługa klawiszy*/
function move(e) {
    if (e.keyCode == 39 && x < 290) { //w prawo
        moveRight();
    }

    if (e.keyCode == 37 && x > 0) { //w lewo
        moveLeft();
    }

    if (e.keyCode == 32 && shootFlag == false) {
        shoot();
    }

}
document.addEventListener('keydown', move);
btnNewGame.addEventListener('click', startGame);
let intervalEnemy = setInterval(moveEnemy, 5000);
clearInterval(intervalEnemy); // odpala się dopiero kliknięciu New Game