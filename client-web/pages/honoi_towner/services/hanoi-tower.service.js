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
let multijoueursClass;

let intervalMultiJoueur;

let multijoueurId;

import("../../../models/joueur.js").then(Class => {
    joueurClass = Class.Joueur;
    joueur = new Class.Joueur;
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("joueurConnecte")

});

import("../../../models/niveau-joueur.js").then(Class => {
    niveauJoueurClass = Class.NiveauJoueur;
});

import("../../../models/multijoueurs.js").then(Class => {
    multijoueursClass = Class.Multijoueurs;
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
    joueurI.sendToPHP("enableDisableSound");
}


function goToPanel() {
    const music2 = document.querySelector('#music2');//le son d
    music2.pause();
    window.location.href="../../Panel/vue/index.html";
}


function logout() {
    let joueurI = new joueurClass();
    joueurI.sendToPHP("logout");
}

function reponseServeurLogout() {
    alert("Déconnexion avec succès");
    window.location.href="../../login/vue/login.html"
}


function $_GET(param) {
    const vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

function reponseMultijoueurs() {

    if ($_GET("multijoueurClass")) {
        multijoueurId = $_GET("multijoueurClass");
        alert("Vous jouez le jeu a plusieurs veuillez patientez que tous les joueurs soit prêts");
    }

    intervalMultiJoueur = setInterval(function () {
        let tempMultijoueursClass = new multijoueursClass();

        tempMultijoueursClass.id = multijoueurId;
        tempMultijoueursClass.sendToPHP("checkIfGameFinish");
    }, 100)

}
reponseMultijoueurs();

function playerFinishFirst () {
    if ($_GET("multijoueurClass")) {
        let tempMultijoueursClass = new multijoueursClass();

        tempMultijoueursClass.id = multijoueurId;
        tempMultijoueursClass.sendToPHP("playerFinishFirst");
    }
}
