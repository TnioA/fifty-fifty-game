import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAT87YinPYoQmYzWiaX_jS101FKnciJllM",
    authDomain: "fifty-fifty-24cb4.firebaseapp.com",
    projectId: "fifty-fifty-24cb4",
    storageBucket: "fifty-fifty-24cb4.appspot.com",
    messagingSenderId: "774204135469",
    appId: "1:774204135469:web:7ebd1cb5e578a4da77c0a4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const rootRef = ref(storage);

const gameContentTitle = document.querySelector(".game-content-tile");
const imageBox = document.querySelector(".game-image-box");
const gameImage = document.querySelector("#game-image");
const skeleton = document.querySelector(".skeleton");
const btnNext = document.querySelector(".btn-next");

gameImage.addEventListener("click", () => {
    gameImage.classList = [];
});

var content = null;

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

async function loadImage(url, elem) {
    return new Promise((resolve, reject) => {
        elem.onload = () => resolve(elem);
        elem.onerror = reject;
        elem.src = url;
    });
}

async function getContent() {
    var result = await listAll(rootRef);

    let index = 1;
    for (const item of result.items) {
        const typeSelected = (Math.random() < 0.5) ? 1 : 2;

        content.push({
            id: index,
            path: item._location.path_,
            description: item._location.path_.split(".")[0],
            type: typeSelected
        });
        index++;
    }
}

async function next() {
    if (content === null) {
        content = [];
        await getContent();
    }

    imageBox.classList = ["game-image-box"];
    skeleton.classList = ["skeleton show"];

    const leftList = shuffle(content.filter(x => x.type === 1));
    const rightList = shuffle(content.filter(x => x.type === 2));
    
    if (leftList.length < 1 || rightList.length < 1) {
        window.location.href = "game-over.html";
        return;
    }
    
    const typeSelected = (Math.random() < 0.5) ? 1 : 2;
    const trueImage = typeSelected === 1 ? leftList[0] : rightList[0];
    const fakeImage = typeSelected === 1 ? rightList[0] : leftList[0];

    trueImage.url = await getDownloadURL(ref(storage, trueImage.path));
    
    content = content.filter(x => x.url !== trueImage.url);
    gameImage.classList = ["blur"]
    await loadImage(trueImage.url, gameImage);
    
    gameContentTitle.innerHTML = typeSelected === 1 ?
        `<span>${trueImage.description} | ${fakeImage.description}</span>` :
        `<span>${fakeImage.description} | ${trueImage.description}</span>`


    skeleton.classList = ["skeleton"];
    imageBox.classList = ["game-image-box show"];
}

btnNext.addEventListener("click", () => next());

// start game
next();