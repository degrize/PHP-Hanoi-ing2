export class Multijoueurs {
    id = 1;
    niveau = "";
    joueur = "";
    nom_salle = "";
    cle_salle = "";
    nbre_joueur = false;
    cree_le = "";

    sendToPHP(fonction) {
        let data = JSON.stringify(this);
        data = encodeURIComponent(data); // on encode notre joueur
        fonction =  encodeURIComponent(fonction); // on précise que nous voulons l'enregistrer
        let script = document.createElement('script'); // on creer un semblant de script
        script.src = "../../../../serveur-php/controllers/multijoueurs.controller.php?data="+ data + "&methode=" + fonction;
        document.body.appendChild(script); // on l'ajoute au DOM
        document.body.removeChild(script); // apres execution on l'efface du DOM
    }
}
