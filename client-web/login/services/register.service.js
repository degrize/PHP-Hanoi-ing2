let joueurs;
import("../models/joueur.js").then(Class => {
    joueurs = Class.Joueur
});

function sendDSL() {

    let joueur = new joueurs();
    joueur.login = "Meda";
    joueur.mot_de_passe = "Meda##";
    joueur.est_suspendu = false;

    let registerForm = document.getElementById('registerForm'),
        form = new FormData(registerForm);

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
    })

    // On securise l'envoi des données
    const data =  encodeURIComponent(JSON.stringify(joueur)); // on encode notre joueur
    const methode =  encodeURIComponent("save"); // on precise que nous voulons l'enregistrer

    // On envoi notre requete par la methode DSL de AJAX
    let script = document.createElement('script'); // on creer un semblant de script
    script.src = "../../serveur-php/controllers/joueur.controller.php?data="+ data + "&methode=" + methode;
    document.body.appendChild(script); // on l'ajoute au DOM
    document.body.removeChild(script); // apres execution on l'efface du DOM

}

function reponseServeur(message) {
    console.log(message.login)
}



