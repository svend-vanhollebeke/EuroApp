const billets = document.querySelectorAll('.billet');
const pieces = document.querySelectorAll('.piece');
const elem_comptoir = document.querySelectorAll('.elem_comptoir');
const btn_payer = document.getElementById("payer");
const liste_fruits = {1:"bananes", 2:"pommes", 3:"poires", 4:"cerises", 5:"prunes", 6:"mangues", 7:"grapes de raisin", 8:"melons", 9:"pastèques"};
let list_td = {"td1":false, "td2":false, "td3":false, "td4":false,
               "td5":false, "td6":false, "td7":false, "td8":false,
               "td9":false, "td10":false, "td11":false, "td12":false};
let list_elements = {"1e":0, "2e":0, "5e":0, "10e":0, "20e":0, "50e":0, "100e":0};
let prix_opti = {"1e":0, "2e":0, "5e":0, "10e":0, "20e":0, "50e":0, "100e":0};

let niveau = 1;
let total = 0;
let prix = getRandomInt();
let quantite = getRandomInt();
findOpti();

console.log("Rép: ");
console.log(prix_opti);

let achat = document.getElementById("achat");
let dialogue = document.getElementById("dial_texte");
dialogue.innerHTML = "Il nous faudrait <span style='font-size: 150%; color: darkcyan'>" + quantite + " " + liste_fruits[niveau] + "</span>.<br> Cela nous coûterait : <span style='font-size: 180%; color: darkcyan;'>" + prix + " euros</span> !";



btn_payer.addEventListener('click', payer);

billets.forEach(billet => {
    billet.addEventListener('click', click);
});

pieces.forEach(piece => {
    piece.addEventListener('click', click);
});

elem_comptoir.forEach(elem => {
    elem.addEventListener('click', clickRemove);
});

function click(e) {
    if (countNbFilled() <= 12){
        list_elements[e.target.id] += 1;
        if (e.target.id === "1e"){
            setImage(1);
        } else if (e.target.id === "2e") {
            setImage(2);
        } else if (e.target.id === "5e") {
            setImage(5);
        } else if (e.target.id === "10e") {
            setImage(10);
        } else if (e.target.id === "20e") {
            setImage(20);
        } else if (e.target.id === "50e") {
            setImage(50);
        } else if (e.target.id === "100e") {
            setImage(100);
        }
    }
}

function setImage(e){
    for (const key in list_td) {
        if (!list_td[key]){
            var elem = document.getElementById(key);
            list_td[key] = e;
            total = total + e;
            if (e === 1){
                elem.style.backgroundImage = 'url("/static/img/1euros.png")';
                break;
            } else if (e === 2){
                elem.style.backgroundImage = 'url("/static/img/2euros.png")';
                break;
            } else if (e === 5){
                elem.style.backgroundImage = 'url("/static/img/5euros.png")';
                break;
            } else if (e === 10){
                elem.style.backgroundImage = 'url("/static/img/10euros.png")';
                break;
            } else if (e === 20){
                elem.style.backgroundImage = 'url("/static/img/20euros.png")';
                break;
            } else if (e === 50){
                elem.style.backgroundImage = 'url("/static/img/50euros.png")';
                break;
            } else if (e === 100){
                elem.style.backgroundImage = 'url("/static/img/100euros.png")';
                break;
            }
        }
    }
}

function clickRemove(e){
    var elem = document.getElementById(e.target.id);
    let url = (e.target.style.backgroundImage).toString();
    let start = url.indexOf(15);
    let end = url.indexOf("e", start);
    let res = url.substring(17, end + 1);
    list_elements[res] -= 1;
    total = total - list_td[e.target.id];
    list_td[e.target.id] = false;
    elem.style.backgroundImage = '';
}

function countNbFilled(){
    let cpt = 0;
    for (const key in list_td) {
        if (list_td[key]){
            cpt++;
        }
    }
    return cpt;
}

function getRandomInt() {
    let res = 0;
    if (niveau <= 3){
        hidePieces(false);
        hideBillets(true);
        res = Math.floor(Math.random() * 16);
        if (res === 0){
            res = 10;
        }
    } else if (niveau <= 6){
        hidePieces(true);
        hideBillets(false);
        res = Math.floor(Math.random() * 20);
        res = res * 5;
        if (res === 0){
            res = 100;
        }
    } else if (niveau <= 9){
        hidePieces(false);
        hideBillets(false);
        res = Math.floor(Math.random() * 100);
        if (res <= 10){
            res = getRandomInt();
        }
    }
  return res;
}

function checkOpti(){
    let keys1 = Object.keys(prix_opti);
    for (let key of keys1){
        if (list_elements[key] !== prix_opti[key]){
            return false;
        }
    }
    return true;
}

function payer(){
    if (niveau <= 9){
        console.log(list_elements);
        if (total !== prix) {
            setTimeout(afficherDialogue, 5000);
            dialogue.innerHTML = "<span style='font-size: 120%; font-weight: bolder; color: darkred'>" + total + " euros ? <br>Ce n'est pas la somme que je t'ai demandé, réessaie !</span>";
        } else if (!checkOpti()){
            setTimeout(afficherDialogue, 5000);
            dialogue.innerHTML = "<span style='font-size: 120%; font-weight: bolder; color: darkred'> Le prix total est juste, mais tu peux me donner moins de monnaie, réessaie !</span>";
        } else {
            setTimeout(niveauSuivant, 3000);
            marquePoint();
            dialogue.innerHTML = "<span style='font-size: 180%; color: green'>Bien joué, le compte est bon !</span>";
        }
    }
}

function afficherDialogue(){
    dialogue.innerHTML = "Il nous faudrait <span style='font-size: 150%; color: darkcyan'>" + quantite + " " + liste_fruits[niveau] + "</span>.<br> Cela nous coûterait : <span style='font-size: 180%; color: darkcyan;'>" + prix + " euros</span> !";
}

function hidePieces(bool){
    pieces.forEach(piece => {
        if (bool) {
            piece.style.visibility = "hidden";
        } else {
            piece.style.visibility = "visible";
        }
    });
}

function hideBillets(bool){
    billets.forEach(billet => {
        if (bool) {
            billet.style.visibility = "hidden";
        } else {
            billet.style.visibility = "visible";
        }
    });
}

function findOpti(){
    let new_prix = prix;
    if (niveau < 4) {
        while (new_prix > 0) {
            if (new_prix - 2 >= 0) {
                new_prix -= 2;
                prix_opti["2e"] += 1;
            } else if (new_prix - 1 >= 0) {
                new_prix -= 1;
                prix_opti["1e"] += 1;
            }
        }
    } else {
        while (new_prix > 0) {
            if (new_prix - 100 >= 0) {
                new_prix -= 100;
                prix_opti["100e"] += 1;
            } else if (new_prix - 50 >= 0) {
                new_prix -= 50;
                prix_opti["50e"] += 1;
            } else if (new_prix - 20 >= 0) {
                new_prix -= 20;
                prix_opti["20e"] += 1;
            } else if (new_prix - 10 >= 0) {
                new_prix -= 10;
                prix_opti["10e"] += 1;
            } else if (new_prix - 5 >= 0) {
                new_prix -= 5;
                prix_opti["5e"] += 1;
            } else if (new_prix - 2 >= 0) {
                new_prix -= 2;
                prix_opti["2e"] += 1;
            } else if (new_prix - 1 >= 0) {
                new_prix -= 1;
                prix_opti["1e"] += 1;
            }
        }
    }
}

function niveauSuivant(){
    elem_comptoir.forEach(elem => {
        elem.style.backgroundImage = '';
        list_td[elem.id] = false;
    });
    niveau++;
    list_elements = {"1e":0, "2e":0, "5e":0, "10e":0, "20e":0, "50e":0, "100e":0};
    prix_opti = {"1e":0, "2e":0, "5e":0, "10e":0, "20e":0, "50e":0, "100e":0};
    prix = getRandomInt();
    findOpti();

    achat.innerText = "Achat n°" + niveau;
    afficherDialogue();
    total = 0;
    if (niveau >= 10){
        hidePieces(true);
        hideBillets(true);
        dialogue.innerHTML = "<span style='font-size: 160%; color: green'>Super, on a acheté suffisamment de fruits !</span>";
    }
}

function marquePoint(){
    const xhttp = new XMLHttpRequest();
    let jeu = JSON.stringify({jeu:"fruit"});
    xhttp.open("POST", "/marque_point", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(jeu);
}