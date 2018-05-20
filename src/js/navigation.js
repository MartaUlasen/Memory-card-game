import startGame from './game';
import createModalDialog from './popup';

export const menuTemplate = document.querySelector('.js-menu');
export const popUp = createModalDialog(document.body, menu);
export const menu = popUp.open('', menuTemplate);

const container = document.getElementsByClassName('container')[0];

const LEVEL_PARAMS = {
	easy: 60,
	medium: 50,
	hard: 5
}

const gameLevelBtns = menu.querySelectorAll('.js-game-level');
const evnt = () => {
	for (let gameLevelBtn of gameLevelBtns) {
		gameLevelBtn.addEventListener('click', function() {
			const level = this.dataset.level;
			startGame(container, 9, LEVEL_PARAMS[level]);
		});
		gameLevelBtn.addEventListener('click', popUp.close);
	}
}
evnt();
