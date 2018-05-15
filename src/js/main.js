import startGame from './game';
import createModalDialog from './popup';

var container = document.getElementsByClassName('container')[0];
//var game = startGame(container, 9);
var menuTemplate = document.querySelector('.js-menu-container').innerHTML;
//var content;
var popUp = createModalDialog(document.body, menu);
const menu = popUp.open(menuTemplate);



const LEVEL_PARAMS = {
	easy: 60,
	medium: 50,
	hard: 40
}

var gameLevelBtns = menu.querySelectorAll('.js-game-level');

for (let gameLevelBtn of gameLevelBtns) {
	gameLevelBtn.addEventListener('click', function() {
		const level = this.dataset.level;
		startGame(container, 9, LEVEL_PARAMS[level]);
	});
}

