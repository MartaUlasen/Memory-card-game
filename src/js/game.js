import createTimer from './timer';
import createModalDialog from './popup';
import {menuTemplLevel, menuTemplResumeGame, menu, popUp} from './navigation';

const FLIP_TIME = 250;
const LEVEL_TIMEOUT = 60;

let cardNodes = [];
let cards = [];
let openCardsIndexes = [];
let amountOfGuessedPairs = 0;
const timer = createTimer(showTime, isTimeUp);
const game = document.createElement('div');
game.className = 'game';
const gameTitle = document.createElement('div');
gameTitle.className = 'game__title';
let clock = document.createElement('div');
clock.className = 'clock';
const btnPauseTemplate = document.querySelector('.pause');
btnPauseTemplate.addEventListener('click', function () {
	timer.stop();
	popUp.open('', menuTemplResumeGame);

}, false);
gameTitle.appendChild(clock);
gameTitle.appendChild(btnPauseTemplate);

export function startGame(container, numberOfPairs, levelTimeOut = LEVEL_TIMEOUT) {
	
	createCards(container, numberOfPairs);
	
	timer.start(levelTimeOut);
	showTime(clock);
}

function createCards(container, numberOfPairs) {
	const numberOfRows = 3;
	const numberOfCols = numberOfPairs * 2 / numberOfRows;
	
	container = getElement(container);
	if (container.querySelector('.game')) {
		//container.removeChild(game);
		container.querySelector('.game').innerHTML = '';
	}
	
	
	for (let i = 0; i < numberOfPairs; i++) {
		cards.push(i);
		cards.push(i);
	}
	
	cards = shuffle(cards);
	
	/* if (window.matchMedia("(orientation: portrait)").matches) {
		var temp = numberOfRows;
		numberOfRows = numberOfCols;
		numberOfCols = temp;
	} */
	
	
	game.appendChild(gameTitle);

	for (let i = 0; i < numberOfRows; i++) {
		const row = document.createElement('div');
		row.className = 'row';
		for (let j = 0; j < numberOfCols; j++) {
			const index = i * numberOfCols + j;
			
			const card = document.createElement('div');
			card.className = 'card';
			card.dataset.index = index;
			card.addEventListener('click', openCard, false);
			
			const cardBack = document.createElement('div');
			cardBack.className = 'card__back';
			card.appendChild(cardBack);
			
			const cardFace = document.createElement('div');
			cardFace.className = 'card__face';
			cardFace.textContent = cards[index];
			card.appendChild(cardFace);
			
			row.appendChild(card);
			cardNodes.push(card);
		}
		game.appendChild(row);
	}
	
	container.appendChild(game);
	
}

function getElement(el) {
	if (typeof el === 'string') {
		return document.querySelector(el);
	} else {
		return el;
	}
}

function shuffle(array){
	return array.slice().sort(compareRandom);
}

function compareRandom(a, b) {
	return Math.random() - 0.5;
}
	
function openCard(e) {
	let currentCard = this;
	let idx = currentCard.dataset.index;
	if (openCardsIndexes.indexOf(idx) < 0) {
		currentCard.classList.add('card--flipped');
		currentCard.removeEventListener('click', openCard, false);
		openCardsIndexes.push(idx);
		
		if (openCardsIndexes.length === 2) {
			let index1 = openCardsIndexes[0];
			let index2 = openCardsIndexes[1];	
			if (cards[index1] === cards[index2]) {
				amountOfGuessedPairs++;
				setTimeout(function() {
					hideOpenCards(); 
					setTimeout(isAllPairsFound, 0);
				}, FLIP_TIME);
			} else {
				setTimeout(closeOpenCards, FLIP_TIME);
			}
		}
	}
}
	
function hideOpenCards() {
	openCardsIndexes.forEach(function(v, i) {
		cardNodes[v].classList.add('card--hidden');
	});
	openCardsIndexes = [];
}

function closeOpenCards() {
	openCardsIndexes.forEach(function(v, i) {
		cardNodes[v].classList.remove('card--flipped');
		cardNodes[v].addEventListener('click', openCard, false);
	});
	openCardsIndexes = [];
}


function isAllPairsFound() {
	if (amountOfGuessedPairs === cards.length/2) {
		timer.stop();
		popUp.open('You win!!!', menuTemplLevel);
	}
}

function destroy() {
	for (let i = 0; i < cards.length; i++) {
		cardNodes[i].removeEventListener('click', openCard, false);
	}
}

function isTimeUp() {
	let time = timer.getTime();
	if (time === 0) {
		popUp.open('You lose!!!', menuTemplLevel);
		destroy();
	}
}	

function showTime() {
	clock = getElement(clock);
	clock.innerHTML = `${timer.getTime()}s left`;
}	

export default startGame;
