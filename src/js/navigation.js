import startGame from './game';
import createModalDialog from './popup';

export const menuTemplLevel = document.querySelector('.js-menu-new-game');
export const menuTemplResumeGame = document.querySelector('.js-menu-resume-game');
export const popUp = createModalDialog(document.body, menu);
export const menu = popUp.open('', menuTemplLevel);

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

const newGameBtn = document.querySelector('.js-menu-resume-game').querySelector('.js-new-game');

newGameBtn.addEventListener('click', function() {
	popUp.open('', menuTemplLevel);
});

const resumeGameBtn = document.querySelector('.js-menu-resume-game').querySelector('.js-resume-game');
resumeGameBtn.addEventListener('click', function() {
	startGame(container, 9, 5);
});