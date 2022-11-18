let contactUs;
import("../../../models/contact-us.js").then(Class => {
    contactUs = Class.ContactUs;
});

const div_info = document.querySelector(".contactUs_error__success");
let div_loader = document.getElementById("loader"),
    btnSubmit = document.querySelector('.form_btn');

function reponseServeur(reponse) {

    div_loader.style.display = "none";
    btnSubmit.value="Envoyer Votre message";
    btnSubmit.classList.remove("loaderBtn")
    if (reponse) {
        div_info.innerHTML = "votre requête a bien été envoyée";
        div_info.className = "login_error__success success_contactUs";
        div_info.style.display = "block";
    }
    else {
        div_info.innerHTML = "erreurRenseignez des informations correctes";
        div_info.className = "login_error__success error_contactUs";
        div_info.style.display = "block"
    }
}


(function() { // On utilise une IEF pour ne pas polluer l'espace global

    let contactForm = document.getElementById('contactForm'),
        emailInput = contactForm.querySelector('#email'),
        nomInput = contactForm.querySelector('#nom'),
        objetInput = contactForm.querySelector('#objet'),
        messageInput = contactForm.querySelector('#message');

    function sendHelp() {
        let contactUs1 = new contactUs();
        contactUs1.email = (emailInput.value).toLowerCase();
        contactUs1.nom = nomInput.value;
        contactUs1.objet = objetInput.value;
        contactUs1.message = messageInput.value;
        // On envoie les infos à notre controller-PHP
        contactUs1.sendToPHP("sendHelp");


    }

    // Mise en place des événements
    (function() { // Utilisation d'une fonction anonyme pour éviter les variables globales.
        let inputs = document.getElementsByTagName('input'),
            inputsLength = inputs.length;

        for (let i = 0 ; i < inputsLength ; i++) {
            if (inputs[i].type === 'text' || inputs[i].type === 'email' || inputs[i].type === 'password') {
                inputs[i].onkeyup = function() {
                    div_info.style.display = "none";
                    div_info.innerHTML = "";
                    div_info.className = "login_error__success";
                };
            }
        }

        contactForm.onsubmit = function() {
            div_info.style.display = "none";
            div_info.innerHTML = "";
            div_info.className = "login_error__success";
            div_loader.style.display = "flex";
            btnSubmit.value = "Patienter...";
            btnSubmit.classList.add("loaderBtn");
            sendHelp();//On effectue son enregistrement
            return false;
        };

        contactForm.onreset = function() {
            for (let i = 0 ; i < inputsLength ; i++) {
                if (inputs[i].type === 'email' || inputs[i].type === 'text' || inputs[i].type === 'password') {
                    inputs[i].className = '';
                }
            }
        };
    })();
}) ();
