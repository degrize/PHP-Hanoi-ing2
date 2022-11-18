// On importe notre classe ainsi que les méthodes qui lui sont associées
let joueur;
import("../../../../models/joueur.js").then(Class => {
  joueur = new Class.Joueur; // l'instance de la classe

  // On envoie les infos à notre controller-PHP
  joueur.sendToPHP("findAllEmail");
});


let emailList; // la liste des emails

const div_info = document.querySelector(".banner-info");
let div_loader = document.getElementById("loader");
const form = document.querySelector("form"),
    emailField = form.querySelector(".email-field"),
    emailInput = emailField.querySelector(".email"),
    btnSubmit = form.querySelector('.btn-submit');
let text_error = emailField.querySelector(".error-text");

function reponseServeur(reponse) {
  div_loader.style.display = "none";
  btnSubmit.value="Envoyer le mail";
  btnSubmit.classList.remove("loaderBtn")
  if (reponse) {
    div_info.innerHTML = "Le mail a bien été envoyer. Veuillez verifier votre boîte messagerie";
    div_info.className = "banner-info success-email"
    form.reset();
  }
  else {
    div_info.innerHTML = "ERREUR: Verifiez votre connexion internet!";
    div_info.className = "banner-info error-email"
  }
}


(function() { // On utilise une IEF pour ne pas polluer l'espace global
  function sendEmail() {
    joueur.email = (emailInput.value).toLowerCase();
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("retrievePassword")

  }
  // Email Validation
  function checkEmail() {
    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    div_info.className = "banner-info"
    let email_trouve = false;
    if (!emailInput.value.match(emaiPattern)) {
      text_error.innerHTML = "&nbsp;Renseigner un email valide";
      return emailField.classList.add("invalid"); // ajout d'une classe non valide si la valeur de l'e-mail ne correspond pas au modèle d'e-mail
    }
    else {
      if (emailList) {
        emailList.forEach(email => {
          if ((email).toLowerCase() === (emailInput.value).toLowerCase()){
            email_trouve = true;
            return emailField.classList.remove("invalid"); // suppression de la classe non valide si la valeur de l'e-mail correspond à emaiPattern
          }
        })
        if (!email_trouve) {
          text_error.innerHTML = "&nbsp;Le mail ne correspond pas à un joueur!"
          return emailField.classList.add("invalid");
        }
      }
    }
  }


  // Fonction d'appel sur le formulaire Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // empêcher l'envoi du formulaire
    checkEmail();

    // fonction d'appel sur la touche clavier
    emailInput.addEventListener("keyup", checkEmail);

    if (!emailField.classList.contains("invalid")) {
      console.log("envoi de la requête au serveur");
      div_loader.style.display = "flex";
      btnSubmit.value = "Patienter...";
      btnSubmit.classList.add("loaderBtn");
      sendEmail();
      /*location.href = form.getAttribute("action");*/
    }
  });





})();


