export class Joueur {
    id;
    email = "";
    login = "";
    mot_de_passe = "";
    photo = "";
    est_suspendu = false;
    piece = 0;
    cree_le = "";
    modifie_le = "";

    sendToPHP(fonction) {
        let data = JSON.stringify(this);
        data = encodeURIComponent(data); // on encode notre joueur
        fonction =  encodeURIComponent(fonction); // on precise que nous voulons l'enregistrer
        let script = document.createElement('script'); // on creer un semblant de script
        script.src = "../../../../serveur-php/controllers/joueur.controller.php?data="+ data + "&methode=" + fonction;
        document.body.appendChild(script); // on l'ajoute au DOM
        document.body.removeChild(script); // apres execution on l'efface du DOM
    }
}
