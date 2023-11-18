const gameContentTitle = document.querySelector(".game-content-tile");
const imageBox = document.querySelector(".game-image-box");
const gameImage = document.querySelector("#game-image");
const skeleton = document.querySelector(".skeleton");
const btnNext = document.querySelector(".btn-next");

gameImage.addEventListener("click", () => {
    gameImage.classList = [];
});

var content = [
    {
        description: "Gato com olhar fixo",
        url: "/assets/game-images/Gato com olhar fixo.jpg",
        type: 1,
    },
    {
        description: "Anão estiloso",
        url: "/assets/game-images/Anão estiloso.jpg",
        type: 1,
    },
    {
        description: "Tartaruga furiosa",
        url: "/assets/game-images/Tartaruga furiosa.jpg",
        type: 1,
    },
    {
        description: "Gato obeso",
        url: "/assets/game-images/Gato obeso.jpeg",
        type: 1,
    },
    {
        description: "Coelho lutador de Kung-Fu",
        url: "/assets/game-images/Coelho lutador de Kung-Fu.jpg",
        type: 1,
    },
    {
        description: "Acidente de carro",
        url: "/assets/game-images/Acidente de carro.webp",
        type: 2,
    },
    {
        description: "Carro carbonizado",
        url: "/assets/game-images/Carro carbonizado.jpg",
        type: 2,
    },
    {
        description: "Corpo carbonizado",
        url: "/assets/game-images/Corpo carbonizado.jpg",
        type: 2,
    },
    {
        description: "Motocicleta em chamas",
        url: "/assets/game-images/Motocicleta em chamas.webp",
        type: 2,
    },
    {
        description: "Criança doente",
        url: "/assets/game-images/Criança doente.jpg",
        type: 2,
    },
];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function next() {
    imageBox.classList = ["game-image-box"];
    skeleton.classList = ["skeleton show"];

    var interval = setInterval(()=> {
        const leftList = shuffle(content.filter(x=> x.type === 1));
        const rightList = shuffle(content.filter(x=> x.type === 2));
        
        if(leftList.length < 1 || rightList.length < 1) {
            console.log("Game Over");
            clearInterval(interval);
            return;
        }
    
        const typeSelected = (Math.random() < 0.5) ? 1 : 2;
        const trueImage = typeSelected === 1 ? leftList[0] : rightList[0];
        const fakeImage = typeSelected === 1 ? rightList[0] : leftList[0];
    
        content = content.filter(x=> x.url !== trueImage.url);
    
        gameContentTitle.innerHTML = typeSelected === 1 ?
        `<span>${trueImage.description} | ${fakeImage.description}</span>` : 
        `<span>${fakeImage.description} | ${trueImage.description}</span>`

        gameImage.classList = ["blur"]
        gameImage.setAttribute("src", trueImage.url);
        skeleton.classList = ["skeleton"];
        imageBox.classList = ["game-image-box show"]
        clearInterval(interval);
    }, 500);
}

btnNext.addEventListener("click", ()=> next());

next();