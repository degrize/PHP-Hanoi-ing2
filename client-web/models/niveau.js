
export class Niveau {
    id;
    titre = "";
    description = "";
    deplacement_max = 0;
    temps_max = 0;
    nbre_disque = 0;
    gain = 0;
    joueurs = [];

    sendToPHP(fonction) {
        let data = JSON.stringify(this);
        data = encodeURIComponent(data); // on encode notre niveau
        fonction =  encodeURIComponent(fonction); // on precise que nous voulons l'enregistrer
        let script = document.createElement('script'); // on creer un semblant de script
        script.src = "../../../../serveur-php/controllers/niveau.controller.php?data="+ data + "&methode=" + fonction;
        document.body.appendChild(script); // on l'ajoute au DOM
        document.body.removeChild(script); // apres execution on l'efface du DOM
    }

}
