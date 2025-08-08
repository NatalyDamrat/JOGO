const cardArray = [
  { name: 'A', img: 'imagens/gato.jpeg' },
  { name: 'A', img: 'imagens/gato.jpeg' },
  { name: 'B', img: 'imagens/passaro.jpeg' },
  { name: 'B', img: 'imagens/passaro.jpeg' },
  // adicione novos pares aqui
  { name: 'C', img: 'imagens/cachorro.jpeg' },
  { name: 'C', img: 'imagens/cachorro.jpeg' }
  { name: 'D', img: 'imagens/coala.jpeg' },
  { name: 'D', img: 'imagens/coala.jpeg' }
  { name: 'E', img: 'imagens/raposas.jpeg' },
  { name: 'E', img: 'imagens/raposas.jpeg' }
];
const grid = document.getElementById('grid');
let cardsChosen = [], cardsChosenId = [], cardsWon = [];
cardArray.sort(() => 0.5 - Math.random());
function createBoard() {
cardArray.forEach((card, index) => {
const cardElement = document.createElement('div');
cardElement.classList.add('card');
cardElement.setAttribute('data-id', index);
cardElement.addEventListener('click', flipCard);
const front = document.createElement('div');
front.classList.add('front');
const back = document.createElement('div');
back.classList.add('back');
cardElement.appendChild(front);
cardElement.appendChild(back);
grid.appendChild(cardElement);
});
}
function flipCard() {
const id = this.getAttribute('data-id');
cardsChosen.push(cardArray[id].name);
cardsChosenId.push(id);
this.classList.add('flip');
this.querySelector('.front').textContent = cardArray[id].img;
if (cardsChosen.length === 2) setTimeout(checkForMatch, 500);
}
function checkForMatch() {
const cards = document.querySelectorAll('.card');
const [firstId, secondId] = cardsChosenId;
if (cardsChosen[0] === cardsChosen[1]) {
cards[firstId].removeEventListener('click', flipCard);
cards[secondId].removeEventListener('click', flipCard);
cardsWon.push(cardsChosen);
} else {
cards[firstId].classList.remove('flip');
cards[secondId].classList.remove('flip');
cards[firstId].querySelector('.front').textContent = '';
cards[secondId].querySelector('.front').textContent = '';
}
cardsChosen = []; cardsChosenId = [];
if (cardsWon.length === cardArray.length/2) alert('Parabéns! Todos os pares encontrados!');

}
createBoard();
