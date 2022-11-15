class Player {
    joueur_pseudo = document.querySelector(".joueur_pseudo");
    joueur_coin = document.querySelector(".joueur_coin");
    joueur_photo = document.querySelector(".joueur_photo");
    constructor() {}

    update() {
        this.joueur_pseudo.innerHTML = '@ ' + joueur.login;
        this.joueur_coin.innerHTML = joueur.piece;
        this.joueur_photo.src = "../../../assets/images/avatars/" + joueur.photo + ".png"
    }
}

let joueur;
let joueurClass;
const player = new Player();
let niveauJoueur;
let niveauJoueurClass;

import("../../../models/joueur.js").then(Class => {
    joueurClass = Class.Joueur;
    joueur = new Class.Joueur;
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("joueurConnecte")

});

import("../../../models/niveau-joueur.js").then(Class => {
    niveauJoueurClass = Class.NiveauJoueur;
});

function reponseServeur(reponse) {
    joueur = reponse;
    if (joueur.id == null) {
        window.location.href="../../login/vue/login.html?connection=false";
        return false;
    }
    soundInitValue(joueur.musique);
    changeNbreDique(joueur.niveau_actuel);
    player.update();
}

function reponseServeurSound(reponse) {
    console.log("le son a eu un changement");
}


function updatePlayerLevel(niveau, deplacement, temps) {
    let niveauJoueurI = new niveauJoueurClass();
    niveauJoueurI.deplacement = deplacement;
    niveauJoueurI.temps = temps;
    niveauJoueurI.nbre_disque = niveau;
    niveauJoueurI.sendToPHP("save")
}

function reponseServeurlevelUp(reponse) {
    console.log(reponse);
    joueur = reponse;
    player.update();
}


function changeSound(value) {
    let joueurI = new joueurClass();
    joueurI.musique = value;
    joueurI.sendToPHP("enableDisableSound")
}


function goToPanel() {
    const music2 = document.querySelector('#music2');//le son d
    music2.pause();
    window.location.href="../../Panel/vue/index.html";
}
