let joueur;
let joueurClass;
import("../../../models/joueur.js").then(Class => {
    joueurClass = Class.Joueur;
    joueur = new Class.Joueur;
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("joueurConnecte")

});

function reponseServeur(reponse) {
    joueur = reponse;
    if (joueur.id == null) {
        window.location.href="../../login/vue/login.html?connection=false";
        return false;
    }
    const playeur = new Player(joueur);
}


class Player {
    joueur_pseudo = document.querySelector(".joueur_pseudo");
    joueur_email = document.querySelector(".joueur_email");
    joueur_coin = document.querySelector(".joueur_coin");
    joueur_photo = document.querySelector(".joueur_photo");
    constructor(joueur) {
        this.joueur_pseudo.innerHTML = '@ ' + joueur.login;
        this.joueur_coin.innerHTML = joueur.piece;
        this.joueur_photo.src = "../../../assets/images/avatars/" + joueur.photo + ".png"
    }
}

function goToPanel() {
    const music2 = document.querySelector('#music2');//le son d
    music2.pause();
    window.location.href="../../Panel/vue/index.html";
}
