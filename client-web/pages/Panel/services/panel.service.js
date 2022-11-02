let joueur;
import("../../../models/joueur.js").then(Class => {
    joueur = new Class.Joueur;
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("joueurConnecte")
});

function reponseServeur(reponse) {
    joueur = reponse;
    if (joueur.id == null) {
        window.location.href="../../login/vue/login.html?connection=false"
        return false;
    }

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
