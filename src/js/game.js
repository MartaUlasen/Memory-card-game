import createTimer from './timer';
import createModalDialog from './popup';

const FLIP_TIME = 250;
const lEVEL_TIMEOUT = 60;

var cardNodes = [];
var cards = [];
var openCardsIndexes = [];
var amountOfGuessedPairs = 0;
var timer = createTimer(showTime, isTimeUp);

var game = document.createElement('div');
game.className = 'game';
var clock = document.createElement('div');
clock.className = 'clock';		
game.appendChild(clock);
var content;

var popUp = createModalDialog(document.body, content);

function startGame(container, numberOfPairs) {
	createCards(container, numberOfPairs);
	
	timer.start(lEVEL_TIMEOUT);
	showTime(clock);
}

function createCards(container, numberOfPairs) {
	container = getElement(container);
	var cardBack;
	var cardFace;
	var card;
	var numberOfRows = 3;
	var numberOfCols = numberOfPairs * 2 / numberOfRows;
	var row;
	
	for (var i = 0; i < numberOfPairs; i++) {
		cards.push(i);
		cards.push(i);
	}
	
	cards = shuffle(cards);
	
	/* if (window.matchMedia("(orientation: portrait)").matches) {
		var temp = numberOfRows;
		numberOfRows = numberOfCols;
		numberOfCols = temp;
	} */
	
	var index;
	
	for (var i = 0; i < numberOfRows; i++) { 
		row = document.createElement('div');
		row.className = 'row';
		for (var j = 0; j < numberOfCols; j++) {
			index = i * numberOfCols + j;
			
			card = document.createElement('div');
			card.className = 'card';
			card.dataset.index = index;
			card.addEventListener('click', openCard, false);
			
			cardBack = document.createElement('div');
			cardBack.className = 'card__back';
			card.appendChild(cardBack);
			
			cardFace = document.createElement('div');
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
	var currentCard = this;
	var idx = currentCard.dataset.index;

	if (openCardsIndexes.indexOf(idx) < 0) {
		currentCard.classList.add('card--flipped');
		currentCard.removeEventListener('click', openCard, false);
		openCardsIndexes.push(idx);
		
		if (openCardsIndexes.length === 2) {
			var index1 = openCardsIndexes[0];
			var index2 = openCardsIndexes[1];	
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
		popUp.open('You win!!!');
	}
}

function destroy() {
	for (var i = 0; i < cards.length; i++) {
		cardNodes[i].removeEventListener('click', openCard, false);
	}
}

function isTimeUp() {
	var time = timer.getTime();
	if (time === 0) {
		popUp.open('You lose!!!');
		destroy();
	}
}	

function showTime() {
	clock = getElement(clock);
	clock.innerHTML = `${timer.getTime()}s left`;
}	

export default startGame;
