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
    let profileProgression = document.getElementById("progessionLevel");
    let exampleLevel = profileProgression.querySelector(".level");
    niveauList.forEach(level=> {
        let pointDeplacementMax = 100 + parseInt(level.deplacement_max);
        let pointTempsMax = 100 + parseFloat(level.temps_max);
        let levelTitle = exampleLevel.cloneNode(true);
        levelTitle.querySelector('.level-title').innerText = level.titre;
        levelTitle.querySelector('img').src = "./images/level/" + level.nbre_disque + ".gif";

        // on passe maintenant à inserer la progression du joueur dans le level courant
        if (joueur.id != null) {
            let pourcentage = 0;
            (joueur.niveauJoueurs).forEach(niveauJoueur => {
                pourcentage = 0;
                levelTitle.classList.add("no");
                if (niveauJoueur.niveau.id == level.id) {
                    levelTitle.classList.remove("no");
                    pourcentage = pointDeplacementMax - parseInt(niveauJoueur.deplacement); // pour le deplacement
                    pourcentage += pointTempsMax - parseFloat(niveauJoueur.temps);
                    pourcentage /= 2;
                    if (pourcentage <= 0) {
                        pourcentage = 1;
                    }
                }
                levelTitle.querySelector('.progress-done').style.width = pourcentage + "%";
                levelTitle.querySelector('.percentage').innerText = pourcentage + "%";
            })
        }

        profileProgression.appendChild(levelTitle);
    })
    exampleLevel.remove(); // on supprime notre example
    console.log("ok");

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
    joueur_coin = document.getElementById("joueur_coin");
    constructor(joueur) {
        this.joueur_pseudo.innerHTML = joueur.login;
        this.joueur_email.innerHTML = joueur.email;
        this.joueur_coin.innerHTML = joueur.piece;
    }

}
