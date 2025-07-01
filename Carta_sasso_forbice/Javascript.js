let computerScore = 0
let userScore = 0

let userBoard = document.getElementById('user-score')
let computerBoard = document.getElementById('computer-score')

let userChoiceResult = document.getElementById('user-choice')
let computerChoiceResult = document.getElementById('computer-choice')
let gameResult = document.getElementById('result')

// const scelte = ['carta', 'forbice', 'sasso']
const choices={
    sasso:{
        sasso:'pareggio',
        forbice:'vittoria',
        carta:'sconfitta',
    },
    forbice:{
        sasso:'sconfitta',
        forbice:'pareggio',
        carta:'vittoria',
    },
    carta:{
        sasso:'vittoria',
        forbice:'sconfitta',
        carta:'pareggio',
    },
}

function checker(input) {
    const computerChoices = ['carta', 'forbice', 'sasso']
    let computerChoice = computerChoices[Math.floor(Math.random() * 3)];

userChoiceResult.innerHTML = input;
computerChoiceResult.innerHTML = computerChoice;

    switch(choices[input][computerChoice]) {
        case('vittoria'):
            gameResult.innerHTML = 'HAI VINTO!!!';
            userScore++;
            userBoard.innerHTML = userScore;
            break;
        case('sconfitta'):
            gameResult.innerHTML = 'HAI PERSO!!!';
            computerScore++;
            computerBoard.innerHTML = computerScore;
            break;
        case('pareggio'):
            gameResult.innerHTML = 'PAREGGIO!!!';
            break;

    }

}
