let joueur;
import("../../../models/joueur.js").then(Class => {
    joueur = new Class.Joueur;
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("joueurConnecte")
});

let niveau;
import("../../../models/niveau.js").then(Class => {
    niveau = new Class.Niveau;
    // On envoie les infos à notre controller-PHP
    niveau.sendToPHP("findAll")
});

let niveauList = [];

function findAllNiveau(reponse) {
    niveauList.push(reponse);
}

function showAllLevel() {

}

function reponseServeur(reponse) {
    joueur = reponse;
    if (joueur.id == null) {
        window.location.href="../../login/vue/login.html?connection=false"
        return false;
    }
    console.log(joueur)
    const playeur = new Player(joueur);
}


class Player {
    joueur_pseudo = document.querySelector(".joueur_pseudo");
    joueur_email = document.querySelector(".joueur_email");
    constructor(joueur) {
        this.joueur_pseudo.innerHTML = joueur.login;
        this.joueur_email.innerHTML = joueur.email;
    }

}
