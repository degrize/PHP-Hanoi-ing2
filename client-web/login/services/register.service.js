let joueurs;
import("../models/joueur.js").then(Class => {
    joueurs = Class.Joueur;
});
let joueur = new joueurs();
let emailList;
let loginList;

function reponseServeur(reponse) {
    if (reponse) {
        window.location.href="../vue/login.html?register=true"
    }
}


(function() { // On utilise une IEF pour ne pas polluer l'espace global

    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("findAllLogin");
    joueur.sendToPHP("findAllEmail");

    let registerForm = document.getElementById('registerForm'),
        emailInput = registerForm.querySelector('#email'),
        loginInput = registerForm.querySelector('#login'),
        mdpInput = registerForm.querySelector('#pwd1');


    function enregistrer() {

        joueur.email = (emailInput.value).toLowerCase();
        joueur.login = (loginInput.value).toLowerCase();
        joueur.mot_de_passe = mdpInput.value;
        joueur.photo = "loginInput.value";
        joueur.est_suspendu = false;
        joueur.cree_le = "2022-09-03";
        joueur.modifie_le = "2022-09-03";
        // On envoie les infos à notre controller-PHP
        joueur.sendToPHP("save")

    }

    function check_email_doublon() {
        joueur.sendToPHP("findAllEmail");
        if (emailList) {
            emailList.forEach(email => {
                if ((email).toLowerCase() === (emailInput.value).toLowerCase()){
                    getTooltip(emailInput).innerHTML = "Le mail existe deja"
                    getTooltip(emailInput).style.display = 'inline-block';
                    return true;
                }
            })
        }
        return false;

    }

    function check_login_doublon() {
        joueur.sendToPHP("findAllLogin");
        if (loginList) {
            loginList.forEach(login => {
                if ((login).toLowerCase() === (loginInput.value).toLowerCase()){
                    getTooltip(loginInput).innerHTML = "Le speudo existe deja"
                    getTooltip(loginInput).style.display = 'inline-block';
                    return true;
                }
            })
        }
        return false;

    }

// Fonction de désactivation de l'affichage des « tooltips »
    function deactivateTooltips() {
        let spans = document.getElementsByTagName('span'),
            spansLength = spans.length;
        for (let i = 0; i < spansLength; i++) {
            if (spans[i].className === 'tooltip') {
                spans[i].style.display = 'none';
            }
        }
    }

    // La fonction ci-dessous permet de récupérer la « tooltip » qui correspond à notre input
    function getTooltip(element) {
        element = element.parentNode;
        while (element = element.nextSibling) {
            if (element.className === 'tooltip') {
                return element;
            }
        }
        return false;
    }

    // Fonctions de vérification du formulaire, elles renvoient «true » si tout est OK
    const check = {}; // On met toutes nos fonctions dans un objet littéral
    check['email'] = function(id) {
        const name = document.getElementById(id),
            tooltipStyle = getTooltip(name).style;
        const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (name.value.match(emaiPattern)) {
            name.className = 'correct';
            tooltipStyle.display = 'none';
            check_email_doublon();
            return true;
        } else {
            getTooltip(name).innerHTML = "Renseignez une addresse email valide"
            name.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }

    };

    check['login'] = function() {
        const login = document.getElementById('login'),
            tooltipStyle = getTooltip(login).style;
        if (login.value.length >= 4) {
            login.parentNode.className = 'input-field correct';
            tooltipStyle.display = 'none';
            check_login_doublon();
            return true;
        } else {
            getTooltip(login).innerHTML = "Le pseudo ne peut pas faire moins de 4 caractères"
            login.parentNode.className = 'input-field incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    };

    check['pwd1'] = function() {
        const pwd1 = document.getElementById('pwd1'),
            tooltipStyle = getTooltip(pwd1).style;
        if (pwd1.value.length >= 4) {
            pwd1.className = 'correct';
            tooltipStyle.display = 'none';
            return true;
        } else {
            pwd1.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    };

    check['pwd2'] = function() {
        const pwd1 = document.getElementById('pwd1'),
            pwd2 = document.getElementById('pwd2'),
            tooltipStyle = getTooltip(pwd2).style;
        if (pwd1.value === pwd2.value && pwd2.value !== '') {
            pwd2.className = 'correct';
            tooltipStyle.display = 'none';
            return true;
        } else {
            pwd2.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    };

    // Mise en place des événements
    (function() { // Utilisation d'une fonction anonyme pour éviter les variables globales.
        const myForm = document.getElementById('registerForm'),
            inputs = document.getElementsByTagName('input'),
            inputsLength = inputs.length;
        for (let i = 0 ; i < inputsLength ; i++) {
            if (inputs[i].type === 'text' || inputs[i].type === 'email' || inputs[i].type === 'password') {
                inputs[i].onkeyup = function() {
                    check[this.id](this.id); // « this » représente l'input actuellement modifié
                };
            }
        }
        myForm.onsubmit = function() {
            let result = true;
            for (const i in check) {
                result = check[i](i) && result;
            }
            if (result) {
                if (!check_login_doublon() && !check_email_doublon()) {
                    enregistrer();//On effecteur son enregistrement
                }
            }

            return false;
        };
        myForm.onreset = function() {
            for (let i = 0 ; i < inputsLength ; i++) {
                if (inputs[i].type === 'text' || inputs[i].type === 'email' || inputs[i].type === 'password') {
                    inputs[i].className = '';
                }
            }
            deactivateTooltips();
        };
    })();
// Maintenant que tout est initialisé, on peut désactiver les « tooltips »
deactivateTooltips();




})();

