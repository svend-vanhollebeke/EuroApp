const gameContainer = document.getElementById("game-container");
const resultInput = document.getElementById("result-input");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
let score = 0;
let lives = 3;

function createAddition() {
    const addition = document.createElement("div");
    addition.classList.add("addition");
    addition.style.left = `${Math.random() * (window.innerWidth/2)}px`;
    let a = getRandomNumber();
    let b = getRandomNumber();

    addition.textContent = a + " + " + b;
    addition.id = (a + b).toString();
    gameContainer.appendChild(addition);

    // Animate falling
    const animation = addition.animate(
        [
            { transform: "translateY(0)" },
            { transform: `translateY(${window.innerHeight}px)` },
        ],
        { duration: 8500 }
    );

    animation.onfinish = () => {
        // When animation finishes without being removed, player loses a life
        if (document.contains(addition)){
            lives--;
            updateScoreAndLives();
            addition.remove();
            if (lives <= 0) {
                gameOver();
            }
        }
    };
}

function getRandomNumber() {
    return Math.floor(Math.random() * (score + 3)) + 1;
}

function updateScoreAndLives() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

function gameOver() {
    alert(`Game over. Your final score is ${score}.`);
    location.reload(); // Reload the page to restart the game
}

resultInput.addEventListener("input", (e) => {
    const answer = eval(e.target.value);

    // Check if the answer is correct for each current addition
    const additions = document.querySelectorAll(".addition");
    additions.forEach((addition) => {
        console.log("Réponses possibles : " + parseInt(addition.id));
        if (parseInt(addition.id) === answer) {
            addition.remove();
            score++;
            marquePoint();
            updateScoreAndLives();
            resultInput.value = "";
        }
    });
});

// Start the game by creating additions
setInterval(createAddition, 4000);

// Initialize the display of score and lives
updateScoreAndLives();

function marquePoint(){
    const xhttp = new XMLHttpRequest();
    let jeu = JSON.stringify({jeu:"fruit"});
    xhttp.open("POST", "/marque_point", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(jeu);
}