const gameContentTitle = document.querySelector(".game-content-tile");
const imageBox = document.querySelector(".game-image-box");
const gameImage = document.querySelector("#game-image");
const skeleton = document.querySelector(".skeleton");
const btnNext = document.querySelector(".btn-next");

gameImage.addEventListener("click", () => {
    gameImage.classList = [];
});

var content = [
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

async function next() {
    console.log(content);
    if (content.length === 0)
        await getContent();


    console.log(content);


    imageBox.classList = ["game-image-box"];
    skeleton.classList = ["skeleton show"];

    var interval = setInterval(async () => {
        const leftList = shuffle(content.filter(x => x.type === 1));
        const rightList = shuffle(content.filter(x => x.type === 2));

        if (leftList.length < 1 || rightList.length < 1) {
            // window.location.href = "game-over.html";
            clearInterval(interval);
            return;
        }

        const typeSelected = (Math.random() < 0.5) ? 1 : 2;
        const trueImage = typeSelected === 1 ? leftList[0] : rightList[0];
        const fakeImage = typeSelected === 1 ? rightList[0] : leftList[0];

        content = content.filter(x => x.url !== trueImage.url);

        gameImage.classList = ["blur"]
        await loadImage(trueImage.url, gameImage);

        gameContentTitle.innerHTML = typeSelected === 1 ?
            `<span>${trueImage.description} | ${fakeImage.description}</span>` :
            `<span>${fakeImage.description} | ${trueImage.description}</span>`


        skeleton.classList = ["skeleton"];
        imageBox.classList = ["game-image-box show"]
        clearInterval(interval);
    }, 500);
}

async function loadImage(url, elem) {
    return new Promise((resolve, reject) => {
        elem.onload = () => resolve(elem);
        elem.onerror = reject;
        elem.src = url;
    });
}

btnNext.addEventListener("click", () => next());








// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAT87YinPYoQmYzWiaX_jS101FKnciJllM",
    authDomain: "fifty-fifty-24cb4.firebaseapp.com",
    projectId: "fifty-fifty-24cb4",
    storageBucket: "fifty-fifty-24cb4.appspot.com",
    messagingSenderId: "774204135469",
    appId: "1:774204135469:web:7ebd1cb5e578a4da77c0a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const rootRef = ref(storage);

async function getContent() {
    // var result = await listAll(rootRef);

    // result.items.forEach(async item => {
    //     var url = await getDownloadURL(ref(storage, item._location.path_));

    //     content.push({
    //         name: item._location.path_,
    //         url: url
    //     });
    // });

    var result = await listAll(rootRef);
    

    for (const item of result.items) {
        var url = await getDownloadURL(ref(storage, item._location.path_));

        content.push({
            description: item._location.path_,
            url: url,
            type: 1
        });

        // console.log(url);
    }
}


next();