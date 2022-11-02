let joueur;
import("../../../models/joueur.js").then(Class => {
    joueur = new Class.Joueur;
    console.log("op")
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("joueurConnecte")
});

function reponseServeur(reponse) {
    joueur = reponse;
    if (joueur.id == null) {
        window.location.href="../../login/vue/login.html?connection=false"
        return false;
    }


}

(function() { // On utilise une IEF pour ne pas polluer l'espace global

}) ();
