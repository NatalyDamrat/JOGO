const cardArray = [
    { name: 'A', img: 'imagens/A.jpeg' },
    { name: 'A', img: 'imagens/A.jpeg' },
    { name: 'B', img: 'imagens/B.jpeg' },
    { name: 'B', img: 'imagens/B.jpeg' },
    { name: 'C', img: 'imagens/C.jpeg' },
    { name: 'C', img: 'imagens/C.jpeg' },
    { name: 'D', img: 'imagens/D.jpeg' },
    { name: 'D', img: 'imagens/D.jpeg' },
    { name: 'E', img: 'imagens/E.jpeg' },
    { name: 'E', img: 'imagens/E.jpeg' },
    { name: 'F', img: 'imagens/F.jpeg' },
    { name: 'F', img: 'imagens/F.jpeg' },
    { name: 'G', img: 'imagens/G.jpeg' },
    { name: 'G', img: 'imagens/G.jpeg' },
    { name: 'H', img: 'imagens/H.jpeg' },
    { name: 'H', img: 'imagens/H.jpeg' }
];

// Embaralha o array de cartas
cardArray.sort(() => 0.5 - Math.random());

const grid = document.getElementById('grid');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

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

        // Cria o elemento de imagem para o verso
        back.innerHTML = `<img src="${card.img}" alt="${card.name}">`;

        cardElement.appendChild(front);
        cardElement.appendChild(back);
        grid.appendChild(cardElement);
    });
}

function flipCard() {
    const cardId = this.getAttribute('data-id');

    if (cardsChosenId.includes(cardId) || this.classList.contains('flip')) {
        // Evita clicar duas vezes na mesma carta
        return;
    }

    this.classList.add('flip');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstId, secondId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        // Par encontrado, remove o evento de clique
        cards[firstId].removeEventListener('click', flipCard);
        cards[secondId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        // Vira as cartas de volta
        cards[firstId].classList.remove('flip');
        cards[secondId].classList.remove('flip');
    }

    // Limpa as variáveis de controle
    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
        alert('Parabéns! Você encontrou todos os pares!');
    }
}

// Inicializa o jogo
createBoard();
