import {Joueur} from "../models/joueur";

function sendDSL() {
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src','../../../serveur-php/controllers/login.controller.php');
    document.body.appendChild(script);
    document.body.removeChild(script);
}
