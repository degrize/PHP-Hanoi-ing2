import {Joueur} from "./joueur.js";
import {Niveau} from "./niveau.js";

export class NiveauJoueur {
    niveau = new Niveau();
    joueur = new Joueur();
    deplacement = 0;
    temps = 0;
    nbre_disque = 3;

    sendToPHP(fonction) {
        this.niveau = JSON.stringify(this.niveau);
        this.joueur = JSON.stringify(this.joueur);
        let data = JSON.stringify(this);
        data = encodeURIComponent(data); // on encode notre niveau
        fonction =  encodeURIComponent(fonction); // on précise que nous voulons l'enregistrer
        let script = document.createElement('script'); // on creer un semblant de script
        script.src = "../../../../serveur-php/controllers/niveauJoueur.controller.php?data="+ data + "&methode=" + fonction;
        document.body.appendChild(script); // on l'ajoute au DOM
        document.body.removeChild(script); // apres execution on l'efface du DOM
    }

}
