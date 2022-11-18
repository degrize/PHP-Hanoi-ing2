export class ContactUs {
    id = 1;
    email = "";
    nom = "";
    objet = "";
    message = "";
    send_date = "";

    sendToPHP(fonction) {
        let data = JSON.stringify(this);
        data = encodeURIComponent(data); // on encode notre joueur
        fonction =  encodeURIComponent(fonction); // on précise que nous voulons l'enregistrer
        let script = document.createElement('script'); // on creer un semblant de script
        script.src = "serveur-php/controllers/home.controller.php?data="+ data + "&methode=" + fonction;
        document.body.appendChild(script); // on l'ajoute au DOM
        document.body.removeChild(script); // apres execution on l'efface du DOM
    }
}
