let joueur;
let joueurClass;

let niveauList = [];
let joueursOnline = [];
let niveau;

import("../../../models/joueur.js").then(Class => {
    joueurClass = Class.Joueur;
    joueur = new Class.Joueur;
    // On envoie les infos à notre controller-PHP
    joueur.sendToPHP("joueurConnecte")
    joueur.sendToPHP("findAllLogin");
    joueur.sendToPHP("findAllEmail");
});

import("../../../models/niveau.js").then(Class => {
    niveau = new Class.Niveau;
    // On envoie les infos à notre controller-PHP
    niveau.sendToPHP("findAll")
});

const choose_avatar = document.getElementById("choose_avatar");
choose_avatar.addEventListener('click', function () {
    changeAvatar();
});

function changeAvatar() {
    let joueurI = new joueurClass();
    joueurI.id = parseInt(joueur.id);
    if (avatarChoisi == null) {
        joueurI.photo = "man8"; // L 'avatar par defaut
    } else {
        joueurI.photo = avatarChoisi;
    }

    joueurI.sendToPHP("changeAvatar");
}

function findAllNiveau(reponse) {
    niveauList.push(reponse);
}

function showAllLevel() {
    let profileProgression = document.getElementById("progessionLevel");
    let exampleLevel = profileProgression.querySelector(".level");
    niveauList.forEach(level=> {
        let pointDeplacementMax = 100 + parseInt(level.deplacement_max);
        let pointTempsMax = 100 + parseFloat(level.temps_max);
        let levelTitle = exampleLevel.cloneNode(true);
        levelTitle.querySelector('.level-title').innerText = level.titre;
        levelTitle.querySelector('img').src = "./images/level/" + level.nbre_disque + ".gif";
        levelTitle.classList.add("no");
        // on passe maintenant à inserer la progression du joueur dans le level courant
        if (joueur.id != null) {
            let pourcentage = 0;
            (joueur.niveauJoueurs).forEach(niveauJoueur => {

                if (parseInt(niveauJoueur.niveau.id) === parseInt(level.id)) {
                    levelTitle.classList.remove("no");
                    pourcentage = pointDeplacementMax - parseInt(niveauJoueur.deplacement); // pour le deplacement
                    pourcentage += pointTempsMax - parseFloat(niveauJoueur.temps);
                    pourcentage /= 2;
                    if (pourcentage <= 0) {
                        pourcentage = 1;
                    }
                    if (pourcentage >= 100) {
                        pourcentage = 100;
                    }
                    console.log(niveauJoueur.deplacement)
                }
                levelTitle.querySelector('.progress-done').style.width = pourcentage + "%";
                levelTitle.querySelector('.percentage').innerText = pourcentage + "%";
            })
        }

        profileProgression.appendChild(levelTitle);
    })
    exampleLevel.remove(); // on supprime notre example

}

let avatarChoisi = "man8";
function choixAvatar(avatar) {
    if (avatar !== null) {
        avatarChoisi = avatar;
    }
}
choixAvatar();


function updateUserStatus() {
    let joueurSatus = new joueurClass();
    joueurSatus.sendToPHP("updateUserStatus");
}

setInterval(function () {
    updateUserStatus();
}, 2000)

function getUserStatus() {
    let joueurSatus = new joueurClass();
    joueursOnline = [];
    joueurSatus.sendToPHP("getUserStatus");
}
setInterval(function () {
    getUserStatus();
}, 4000)


function showPlayerSatus() {
    console.log(joueursOnline)

    let playersOnlineLayout = document.getElementById("playersOnline");
    let exampleplayerOnline = playersOnlineLayout.querySelector(".playersOnline");
    let exampleplayerOnlineList = playersOnlineLayout.querySelectorAll(".playersOnline");

    exampleplayerOnlineList.forEach(layout => {
        layout.remove();
    })

    joueursOnline.forEach(player=> {
        let playerOnline = exampleplayerOnline.cloneNode(true);
        playerOnline.querySelector('.joueurOnline_pseudo').innerText = player.login;
        playerOnline.querySelector('.joueurOnline_email').innerText = player.email;
        playerOnline.querySelector('.joueurOnline_niveau').innerText = "Niveau : " + player.niveau_actuel;
        playerOnline.querySelector('.joueurOnline_photo').src = "../../../assets/images/avatars/" + player.photo + ".png";

        playersOnlineLayout.appendChild(playerOnline);
    })
    exampleplayerOnline.remove(); // on supprime notre example
}


function reponseServeurLogout() {
    window.location.href="../../login/vue/login.html"
}

function reponseServeur(reponse) {
    joueur = reponse;
    if (joueur.id == null) {
        window.location.href="../../login/vue/login.html?connection=false"
        return false;
    }
    console.log(joueur)
    const playeur = new Player(joueur);
}
function reponseServeurEdit(reponse) {
    reponseServeur(reponse);
    showNotification(); // on affiche la notification
}


class Player {
    joueur_pseudo = document.querySelector(".joueur_pseudo");
    joueur_email = document.querySelector(".joueur_email");
    joueur_coin = document.getElementById("joueur_coin");
    joueur_photo = document.getElementById("joueur_photo");
    constructor(joueur) {
        this.joueur_pseudo.innerHTML = joueur.login;
        this.joueur_email.innerHTML = joueur.email;
        this.joueur_coin.innerHTML = joueur.piece;
        this.joueur_photo.src = "../../../assets/images/avatars/" + joueur.photo + ".png"
    }

}


// MODIFICATION DU COMPTE
let var_checkLastPwd = false;
let emailList;
let loginList;
(function() { // On utilise une IEF pour ne pas polluer l'espace global
    let editForm = document.getElementById('editForm'),
        emailInput = editForm.querySelector('#email'),
        lastMdpInput = editForm.querySelector('#lastPwd'),
        newMdpInput = editForm.querySelector('#newPwd'),
        confMdpInput = editForm.querySelector('#confPwd'),
        loginInput = editForm.querySelector('#login');

    function editPlayer() {
        let joueurEdit = new joueurClass();
        joueurEdit.id = parseInt(joueur.id);
        joueurEdit.email = (emailInput.value).toLowerCase();
        joueurEdit.login = (loginInput.value).toLowerCase();
        joueurEdit.mot_de_passe = newMdpInput.value;
        joueurEdit.photo = joueur.photo;
        joueurEdit.est_suspendu = joueur.est_suspendu;
        joueurEdit.piece = joueur.piece;
        joueurEdit.cree_le = joueur.cree_le;
        // On envoie les infos à notre controller-PHP
        joueurEdit.sendToPHP("edit");

    }

    function check_last_pwd(lastPwd) {
        let joueurEdit = new joueurClass();
        joueurEdit.id = joueur.id;
        joueurEdit.mot_de_passe = joueur.mot_de_passe;
        joueurEdit.login = lastPwd; // on stock la saisie de l'utilisateur ici
        joueurEdit.sendToPHP("checkLastPwd");
    }

    function check_email_doublon() {
        let joueurEdit = new joueurClass();
        joueurEdit.sendToPHP("findAllEmail");
        if (emailList) {
            emailList.forEach(email => {
                if ((email).toLowerCase() === (emailInput.value).toLowerCase() && email.toLowerCase() !== joueur.email){
                    getTooltip(emailInput).innerHTML = "Le mail existe deja"
                    getTooltip(emailInput).style.display = 'inline-block';
                    return true;
                }
            })
        }
        return false;

    }

    function check_login_doublon() {
        let joueurEdit = new joueurClass();
        joueurEdit.sendToPHP("findAllLogin");
        if (loginList) {
            loginList.forEach(login => {
                if ((login).toLowerCase() === (loginInput.value).toLowerCase() && login.toLowerCase() !== joueur.login){
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
        const tooltipStyle = getTooltip(loginInput).style;
        if (loginInput.value.length >= 4) {
            loginInput.parentNode.className = 'input-field correct';
            tooltipStyle.display = 'none';
            check_login_doublon();
            return true;
        } else {
            getTooltip(loginInput).innerHTML = "Le pseudo ne peut pas faire moins de 4 caractères"
            loginInput.parentNode.className = 'input-field incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    };

    check['lastPwd'] = function() {
        const tooltipStyle = getTooltip(lastMdpInput).style;
        check_last_pwd(lastMdpInput.value)
        if (var_checkLastPwd) {
            lastMdpInput.className = 'correct';
            tooltipStyle.display = 'none';
            return true;
        } else {
            lastMdpInput.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    };

    check['newPwd'] = function() {
        const tooltipStyle = getTooltip(newMdpInput).style;
        if (newMdpInput.value.length >= 4) {
            newMdpInput.className = 'correct';
            tooltipStyle.display = 'none';
            return true;
        } else {
            newMdpInput.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    };

    check['confPwd'] = function() {
        const tooltipStyle = getTooltip(confMdpInput).style;
        if (newMdpInput.value === confMdpInput.value && confMdpInput.value !== '') {
            confMdpInput.className = 'correct';
            tooltipStyle.display = 'none';
            return true;
        } else {
            confMdpInput.className = 'incorrect';
            tooltipStyle.display = 'inline-block';
            return false;
        }
    };

    // Mise en place des événements
    (function() { // Utilisation d'une fonction anonyme pour éviter les variables globales.
        const inputs = document.getElementsByTagName('input'),
            inputsLength = inputs.length;
        for (let i = 0 ; i < inputsLength ; i++) {
            if (inputs[i].type === 'text' || inputs[i].type === 'email' || inputs[i].type === 'password') {
                if (inputs[i].id === "lastPwd") {
                    inputs[i].onkeyup = function () {
                        const tooltipStyle = getTooltip(lastMdpInput).style;
                        tooltipStyle.display  = "none";
                    };
                }
                else {
                    inputs[i].onkeyup = function () {
                        check[this.id](this.id); // « this » représente l'input actuellement modifié
                    };
                }
            }
        }
        editForm.onsubmit = function() {
            let result = true;
            for (const i in check) {
                result = check[i](i) && result;
            }
            if (result) {
                if (!check_login_doublon() && !check_email_doublon()) {
                    editPlayer();//On effectue son enregistrement
                }
            }

            return false;
        };
        editForm.onreset = function() {
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
