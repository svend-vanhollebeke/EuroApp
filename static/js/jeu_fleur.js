const billets = document.querySelectorAll('.billet');
const pieces = document.querySelectorAll('.piece');
const elem_comptoir = document.querySelectorAll('.elem_comptoir');
const btn_payer = document.getElementById("payer");
const liste_fleurs = {1:"roses", 2:"tulipes", 3:"lavandes", 4:"pivoines", 5:"lys", 6:"lilas", 7:"jonquilles", 8:"marguerites", 9:"jacinthes"};
let list_td = {"td1":false, "td2":false, "td3":false, "td4":false,
               "td5":false, "td6":false, "td7":false, "td8":false,
               "td9":false, "td10":false, "td11":false, "td12":false};

let niveau = 1;
let total = 0;
let prix = getRandomInt();

let achat = document.getElementById("achat");
let dialogue = document.getElementById("dial_texte");
dialogue.innerHTML = "Bonjour ! Pour un bouquet de <span style='font-size: 150%; color: darkcyan'>" + liste_fleurs[niveau] + "</span>, cela nous fera exactement <span style='font-size: 180%; color: darkcyan;'>" + prix + " euros</span> !";



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

function payer(){
    if (niveau <= 9){
        if (total === prix){
            setTimeout(niveauSuivant, 3000);
            marquePoint();
            dialogue.innerHTML = "<span style='font-size: 180%; color: green'>Merci beaucoup !</span>";
        } else {
            setTimeout(afficherDialogue, 5000);
            dialogue.innerHTML = "<span style='font-size: 120%; font-weight: bolder; color: darkred'>" + total + " euros ? Ce n'est pas la somme que je t'ai demandé, réessaie !</span>";

        }
    }
}

function afficherDialogue(){
        dialogue.innerHTML = "Bonjour ! Pour un bouquet de <span style='font-size: 150%; color: darkcyan'>" + liste_fleurs[niveau] + "</span>, cela nous fera exactement <span style='font-size: 180%; color: darkcyan;'>" + prix + " euros</span> !";
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

function niveauSuivant(){
    elem_comptoir.forEach(elem => {
        elem.style.backgroundImage = '';
        list_td[elem.id] = false;
    });
    niveau++;
    prix = getRandomInt();
    achat.innerText = "Achat n°" + niveau;
    afficherDialogue();
    total = 0;
    if (niveau >= 10){
        hidePieces(true);
        hideBillets(true);
        dialogue.innerHTML = "<span style='font-size: 160%; color: green'>Merci pour ta visite, passe une bonne journée !</span>";
    }
}

function marquePoint(){
    const xhttp = new XMLHttpRequest();
    let jeu = JSON.stringify({jeu:"fleur"});
    xhttp.open("POST", "/marque_point", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(jeu);
}