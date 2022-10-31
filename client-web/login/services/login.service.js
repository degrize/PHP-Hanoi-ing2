let joueurs;
import("../models/joueur.js").then(Class => {
    joueurs = Class.Joueur;
});

const div_info = document.querySelector(".login_error__success");

function reponseServeur(reponse) {
    if (reponse) {
        window.location.href="../../Panel/index.html"
    }
    else {
        div_info.innerHTML = "erreur d'authentification verifier vos informations";
        div_info.className = "login_error__success error_login"
    }
}

function $_GET(param) {
    const vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

function reponseRegsiter() {

    if ($_GET("register")) {
        div_info.innerHTML = "Votre enregistrement à la plateforme a reussie connectez-vous maintenant.";
        div_info.className = "login_error__success success_register";
    }
}
reponseRegsiter();

(function() { // On utilise une IEF pour ne pas polluer l'espace global

    let registerForm = document.getElementById('loginForm'),
        emailInput = registerForm.querySelector('#email'),
        mdpInput = registerForm.querySelector('#pwd1');

    function connection() {
        let joueur = new joueurs();
        joueur.email = (emailInput.value).toLowerCase();
        joueur.mot_de_passe = mdpInput.value;
        // On envoie les infos à notre controller-PHP
        joueur.sendToPHP("connection")

    }

    // Mise en place des événements
    (function() { // Utilisation d'une fonction anonyme pour éviter les variables globales.
        const myForm = document.getElementById('loginForm'),
            inputs = document.getElementsByTagName('input'),
            inputsLength = inputs.length;

        myForm.onsubmit = function() {
            connection();//On effecteur son enregistrement
            return false;
        };
        myForm.onreset = function() {
            for (let i = 0 ; i < inputsLength ; i++) {
                if (inputs[i].type === 'email' || inputs[i].type === 'password') {
                    inputs[i].className = '';
                }
            }
        };
    })();
}) ();
