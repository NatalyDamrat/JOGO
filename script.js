const cardArray = [
    { name: 'A', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamF29AyFag5c0p97Yy1x6oPZ3OmvIRvOaew&s' },
    { name: 'A', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamF29AyFag5c0p97Yy1x6oPZ3OmvIRvOaew&s' },
    { name: 'B', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR7aAY1Z6XGymdYZXF2Li3jE3881KMtVphZA&s' },
    { name: 'B', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR7aAY1Z6XGymdYZXF2Li3jE3881KMtVphZA&s' },
    { name: 'C', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7IZrGvTnCtareXuy2CPNRmwIFVwnluk-VQ&s' },
    { name: 'C', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7IZrGvTnCtareXuy2CPNRmwIFVwnluk-VQ&s' },
    { name: 'D', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCMJdPZqiy0MrFeBgbzwV8GLX1udBOxl-dCw&s' },
    { name: 'D', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCMJdPZqiy0MrFeBgbzwV8GLX1udBOxl-dCw&s' },
    { name: 'E', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsU5Ltnx1spwLi_L-hiZ-s4w7qay5yHw_WAQ&s' },
    { name: 'E', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsU5Ltnx1spwLi_L-hiZ-s4w7qay5yHw_WAQ&s' },
    { name: 'F', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXEyIQcaOmrO7k2XcOy-VJwokz_RKmYZuNA&s' },
    { name: 'F', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXEyIQcaOmrO7k2XcOy-VJwokz_RKmYZuNA&s' },
    { name: 'G', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVU1U_i7WPmCG20R2vwB1EC0uuCzSnRWZFQ&s' },
    { name: 'G', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVU1U_i7WPmCG20R2vwB1EC0uuCzSnRWZFQ&s' },
    { name: 'H', img: 'https://cdn0.peritoanimal.com.br/pt/posts/3/2/2/animais_engracados_fotos_memes_e_curiosidades_23223_paso_4_600.jpg' },
    { name: 'H', img: 'https://cdn0.peritoanimal.com.br/pt/posts/3/2/2/animais_engracados_fotos_memes_e_curiosidades_23223_paso_4_600.jpg' }
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
