const tourHanoiMain = {
    launch : function () {

        let rebours = true, secondes = 0;
        let tempsRebours = document.querySelector('.time');//pour le compte a rebous
        tempsRebours.innerHTML = "00:00";//on initialise le compte a rebous
        clearInterval(intervalID);//On annule le compte à rebours
        let tourX = [], tourY = [], tourH;
        let distanceEntreDisque = 0, distanceDivision = 0;//pour un petit ecran ecran
        let nombreDeplacement = 0;

        const deplacement = document.querySelector('.deplacement');
        deplacement.innerHTML = nombreDeplacement;

        function ajouterDisque(nbreDisques){
            const ParentDisque = document.querySelector('.disk');
            let val = nombreDisques;

            for (let i = 0; i < nombreDisques; i++){
                val -=1;
                const newDisque = document.createElement('div');
                const valueDisque = document.createTextNode(val);

                newDisque.setAttribute('class', 'disque');
                newDisque.setAttribute('id', 'd' + (i+1));//on insert les attributs

                newDisque.appendChild(valueDisque);//on ajoute les valeurs
                ParentDisque.appendChild(newDisque);//on ajoute l'elemnt creer au HTML
            }
        }
        ajouterDisque(nombreDisques);//on appelle la fonction qui permettra l'ajout des disques

        // On regle ici la tour
        function toursPosition(){
            const tours = document.getElementsByTagName('span'),
                toursLen = tours.length;

            tourH = tours[0].offsetHeight;//la hauteur d'une tour
            for (let i = 0; i < toursLen; i++){
                //pour La position de chaque tour
                tourX.push(getOffset(tours[i]).left + 10);
                tourY.push(getOffset(tours[i]).top + tourH - 70);
            }
            distanceEntreDisque = tourX[1] - tourX[0];
            distanceDivision = distanceEntreDisque / 2;
        }

        function reset(nbreDisques){
            toursPosition();//Initialisation des tours
            let smallScreen = false;
            let maxDisqueWidth = 280;
            if (distanceEntreDisque < 230) {//pour la responsibilite de l'application
                maxDisqueWidth = 160;
                smallScreen = true;
            }

            const nombres = document.querySelector('.nombres');
            nombres.innerHTML =  nombreDisques;

            const niveau = document.querySelector('.niveau');
            niveau.innerHTML = "Niveau : " + nombreDisques;


            let zIndex = 10; //on initialise l'indexe à 10
            let disques = [];	//contients les disques
            disques =  DisquesZone(0, 1300);
            const disquesLen = disques.length;
            let top_fak = 10;
            for (let i = 0; i < disquesLen; i++){

                disques[i].style.left = tourX[0] + 'px';
                disques[i].style.top = tourY[0] + top_fak + 'px';
                disques[i].style.backgroundColor = colorsDisques[i];
                top_fak -= 24;
                zIndex += 1;
                disques[i].style.zIndex = zIndex;
                disques[i].style.width = maxDisqueWidth + 'px';

                // POUR LA RESPONSIBILITE DU JEU IL S'ADAPTE A TOUT ECRAN

                if (smallScreen) {//Si est sur un petit ecran alors
                    if (disquesLen == 3){
                        maxDisqueWidth -= 50;
                    }else if (disquesLen == 4) {
                        maxDisqueWidth -= 40;
                    }else if (disquesLen == 6){
                        maxDisqueWidth -= 20;
                    }
                    else if (disquesLen > 6){
                        maxDisqueWidth -= 15;
                    }else{
                        maxDisqueWidth -= 25;
                    }
                }else{//si le jeu est sur un grand ecran alors
                    if (disquesLen == 3){
                        maxDisqueWidth -= 80;
                    }else if (disquesLen == 4) {
                        maxDisqueWidth -= 60;
                    }else if (disquesLen == 6){
                        maxDisqueWidth -= 40;
                    }
                    else if (disquesLen > 6){
                        maxDisqueWidth -= 30;
                    }else{
                        maxDisqueWidth -= 50;
                    }
                }
            }
            tourY[0] = parseInt(disques[disquesLen - 1].style.top);
            tourY[1] = parseInt(disques[0].style.top) + 24;
            tourY[2] = tourY[1];
            minDisqueTour = tourY[1] - 24;

            main();//on appel maintenant le programme principal
        }
        function getOffset(element){//Notre fonction qui calcule le positionnement complet
            let top = 0, left = 0;
            do{
                top += element.offsetTop;
                left += element.offsetLeft;
            }while (element = element.offsetParent);//Tantque l' "element" reçoit un "offsetParent"
            // Valide alors on additionne les valeurs d'offsets

            return {//On retourne un objet Cela nous permet de retourner deux valeurs calculées
                top : top,
                left : left
            };
        }

        function addEvent(element, event, func){//une fonction pour gerer les evenements sur tous les navigateurs
            if (element.attachEvent) {
                element.attachEvent('on' + event, func);
            }
            else{
                element.addEventListener(event, func, true);
            }
        }

        function DisquesZone(zone, limZonze){//La fonction de tourHanoi
            const elements = document.getElementsByTagName('div'),
                elementsLength = elements.length;
            const disqueElements = [];

            for (let i = 0; i < elementsLength; i++){
                if (elements[i].className === 'disque') {

                    if (getOffset(elements[i]).left > zone - 10 &&
                        getOffset(elements[i]).left < limZonze) {
                        disqueElements.push(elements[i]);
                    }
                }
            }
            return disqueElements;
        }

        function verifSelection(zone, finZonze){
            let disques = [], disquesLen = 0;
            disques = DisquesZone(zone, finZonze);
            disquesLen = disques.length;
            let elem;//Pour le verre vide du tri bulle

            for (let i = 0; i < disquesLen - 1; i++){//Un algorithme de
                //tri de bulle pour varefier si l'element est selectionable ou non
                for (let j = (i + 1) ; j < disquesLen; j++){
                    if (parseInt(disques[i].innerHTML) > parseInt(disques[j].innerHTML)){
                        elem = disques[i];
                        disques[i] = disques[j];
                        disques[j] = elem;
                    }
                }//on a le disque elu
            }
            return disques[0];
        }

        // Pour verifier si le disque depose est inferieur
        function verifmouseUp(target, elements, zonniqu, lastZonnick, limZonnickA, limZonnickB){
            const disquesZoneTour = [];

            let valeurDisqueMove = target.innerHTML;//La valeur du disque en mouvement
            valeurDisqueMove = parseInt(valeurDisqueMove, 10);
            let zonne = true;//si true alors il est inferieur

            let zonnick = zonniqu;
            for (let i = 0; i < elements.length; i++){
                if (elements[i].className === 'disque') {
                    if (getOffset(elements[i]).left < limZonnickB && getOffset(elements[i]).left > limZonnickA){
                        var valeurDisqueZone = elements[i].innerHTML;
                        valeurDisqueZone = parseInt(valeurDisqueZone, 10);

                        if (valeurDisqueZone < valeurDisqueMove) {
                            zonne = false;

                        }
                    }
                }
            }
            if (!zonne){
                zonnick = lastZonnick;
            }
            return zonnick;
        }

        function verifGagne(){
            const tour3disques = DisquesZone(tourX[2], 1400);
            const messageWin = document.querySelector('.message');

            if (tour3disques.length === nombreDisques){
                //si tous les disques sont dans la 3ᵉ tour alors vous avez Gagné

                updatePlayerLevel(nombreDisques, nombreDeplacement, secondes);

                clearInterval(intervalID);
                messageWin.innerHTML = "FELICITATION UTILISATEUR VOUS AVEZ TERMINE LA PARTIE AVEC\
						<br> <u>deplacement</u>  : " + nombreDeplacement + "<br> <u>temps</u> : " + tempsRebours.innerHTML;
                setTimeout(function(){
                    tourHanoiMain.showVictoire(true);
                }, 100);
            }
        }

        let storage = {}; // contient l'objet div en cours de deplacement

        //LE PROGRAMME PRINCIPAL
        function main(){
            let zonnique = 0, lastZonnique = 0, continuer = true, limZonniqueA = 0;
            let limZonniqueB = 0;
            const entA = true, entB = true, entC = true;
            let posX = tourX[0], posY = tourY[0];
            let mousemoveLeftClick;
            let target;
            let valeurTargetLeft;
            let mousemoveLeftUp;//la valeur du curseur au relachement
            let differenceParcour;
            let erreur = false;
            let disqueDownZoneB, disqueDownZoneA, disqueDownZoneC;
            let lastZonne;
            let s;
            let disqueClickSound;

            const input = document.getElementById('input');

            const elements = document.getElementsByTagName('div'),
                elementsLength = elements.length;

            let mouseOrTouchDown = function (e) {
                disqueClickSound = document.querySelector('#disqueClick');//le son du click
                if (jouer){
                    disqueClickSound.play();
                }
                mousemoveLeftClick = e.clientX;//la valeur du curseur au click
                s = storage;

                s.target = e.target || event.srcElement;
                s.offsetX = e.clientX - s.target.offsetLeft;
                s.offsetY = e.clientY - s.target.offsetTop;

                if (continuer){
                    lastZonne = parseInt(getOffset(s.target).left + "");
                    enablePosY = false;
                    if (lastZonne > 0 && lastZonne < tourX[1] - distanceDivision){
                        lastZonnique = 1;
                        enablePosY = true; // on autorise l'emplacecement du disque sur la tour ciblé
                    }
                    else if (lastZonne > tourX[1] - distanceDivision && lastZonne < tourX[2] - distanceDivision){
                        lastZonnique = 2;
                        enablePosY = true; // on autorise l'emplacecement du disque sur la tour ciblé
                    }
                    if (lastZonne > tourX[2] - distanceDivision){
                        lastZonnique = 3;
                        enablePosY = true; // on autorise l'emplacecement du disque sur la tour ciblé
                    }
                }
                continuer = false;

                //Instruction pour deplacer que le disque inferieur //
                disqueDownZoneB = verifSelection(parseInt(tourX[1]), parseInt(tourX[2]));
                disqueDownZoneA = verifSelection(parseInt(tourX[0]), parseInt(tourX[1]));
                disqueDownZoneC = verifSelection(parseInt(tourX[2]), 1200);
                if (s.target !== disqueDownZoneC && s.target !== disqueDownZoneA &&
                    s.target !== disqueDownZoneB){
                    storage = {};//On vide les deplacements
                }
            };

            let mouseOrTouchUp = function (e, typeScreen) {
                target = e.target;
                if (typeScreen === SOURIS) {
                    mousemoveLeftUp = e.clientX;//la valeur du curseur au relachement
                }
                if (typeScreen === TACTILE) {
                    mousemoveLeftUp = getOffset(e.target).left;//la valeur du curseur au relachement

                }
                differenceParcour = mousemoveLeftClick - mousemoveLeftUp;
                erreur = false;

                if (zonnique === lastZonnique){
                    if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){
                        erreur = true;//il faut deplacement donc erreur
                    }
                }
                if (enablePosY && enable2PosY) { // on autorise lorsque c'est l'utilisateur qui relache le disque
                    if (zonnique === 1){//lors du deplacement et le disque se trouve dans la 1ʳᵉ zone

                        if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){
                            if (lastZonnique === 1){
                                tourY[0] += 0;
                            }else{
                                tourY[0] -= 24;
                            }
                            if (lastZonnique === 2){
                                tourY[1] += 24;
                            }
                            if (lastZonnique === 3){
                                tourY[2] +=24;
                            }
                            if (!erreur) {
                                nombreDeplacement += 1;
                            }
                        }
                        posX = tourX[0];
                        if ( tourY[0] >= minDisqueTour) {
                            tourY[0] = minDisqueTour;
                        }
                        posY = tourY[0];
                        target.style.left = posX + 'px';
                        target.style.top = posY + 'px';

                    }
                    if (zonnique === 2){//lors du deplacement et le disque se trouve dans la 2ᵉ zone


                        if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){

                            if (lastZonnique === 1){
                                tourY[0] += 24;
                            }
                            if (lastZonnique === 3){
                                tourY[2] +=24;
                            }
                            if (lastZonnique === 2){
                                tourY[1] += 0;
                            }else{
                                tourY[1] -= 24;
                            }
                            if (!erreur) {
                                nombreDeplacement += 1;
                            }
                        }

                        posX = tourX[1];
                        if ( tourY[1] >= minDisqueTour) {
                            tourY[1] = minDisqueTour;
                        }
                        posY = tourY[1];
                        target.style.left = posX + 'px';
                        target.style.top = posY + 'px';
                    }
                    if (zonnique === 3){//Ici, c'est la zone 3


                        if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){

                            if (lastZonnique === 1){
                                tourY[0] += 24;
                            }
                            if (lastZonnique === 2){
                                tourY[1] +=24;
                            }
                            if (lastZonnique === 3){
                                tourY[2] += 0;
                            }else{
                                tourY[2] -= 24;
                            }
                            if (!erreur) {
                                nombreDeplacement += 1;
                            }
                        }

                        posX = tourX[2];
                        if ( tourY[2] >= minDisqueTour) {
                            tourY[2] = minDisqueTour;
                        }
                        posY = tourY[2];
                        target.style.left = posX + 'px';
                        target.style.top = posY + 'px';
                    }
                }
                enablePosY = false;
                enable2PosY = false;

                if (jouer) {
                    if (erreur){
                        const pasDeplacerSound = document.querySelector('#pasDeplacer');
                        pasDeplacerSound.currentTime = 0;
                        pasDeplacerSound.play();
                    }else{
                        const disqueMouseUpSound = document.querySelector('#disqueMouseUp');
                        disqueMouseUpSound.currentTime = 0.2;
                        disqueMouseUpSound.play();
                    }
                }

                continuer = true;
                zonnique = 0;
                storage = {};//on vide le deplacement
                const deplacement = document.querySelector('.deplacement');
                deplacement.innerHTML = nombreDeplacement;

                verifGagne();

            };

            let mouseOrTouchMove = function (e, typeScreen) {
                target = storage.target;
                let tempsCompte;
                if (target) {
                    target.style.top = e.clientY - storage.offsetY + 'px';
                    target.style.left = e.clientX - storage.offsetX + 'px';

                    valeurTargetLeft = parseInt(target.style.left);
                    enable2PosY = true; // on autorise l'emplacecement du disque sur la tour ciblé

                    if (valeurTargetLeft > (-100) && valeurTargetLeft < tourX[1] - distanceDivision) {
                        //Si le curseur est dans la zone de la 1ʳᵉ tour alors
                        zonnique = 1;
                        limZonniqueA = 0;
                        limZonniqueB = tourX[1] - distanceDivision;

                    } else if (valeurTargetLeft > (tourX[1] - distanceDivision) && valeurTargetLeft < tourX[2] - distanceDivision) {
                        //Si le curseur est dans la zone de la 2ᵉ tour alors
                        zonnique = 2
                        limZonniqueB = tourX[2];
                        limZonniqueA = tourX[1] - distanceDivision;

                    } else if (valeurTargetLeft > tourX[2] - distanceDivision) {//ici, c'est la zone 3
                        zonnique = 3;
                        limZonniqueB = 1400;
                        limZonniqueA = tourX[2] - distanceDivision;
                    }
                    // apple de la fonction pour verifier si l'utilisateur ne deplace
                    //pas un disque superieur sur un inferieur
                    zonnique = verifmouseUp(target, elements, zonnique, lastZonnique, limZonniqueA, limZonniqueB);

                    // ON ACTIVE LE COMPTE A REBOURS MAINTENANT UNE FOIS
                    if (rebours) {
                        // chaque 1 seconde on incrémente le compte a rebours
                        secondes += 1;
                        tempsCompte = tourHanoiMain.compteRebours(secondes);
                        tempsRebours.innerHTML = tempsCompte;
                        intervalID = setInterval(function () {

                            secondes += 1;
                            tempsCompte = tourHanoiMain.compteRebours(secondes);
                            tempsRebours.innerHTML = tempsCompte;

                        }, 1000);
                    }
                    rebours = false;
                }
            };

            for (let i = 0; i < elementsLength; i++){
                if (elements[i].className === 'disque') {

                    /* POUR Le joueur qui utilise la sourie */
                    addEvent(elements[i], 'mousedown', function(e){
                        mouseOrTouchDown(e);
                    });
                    addEvent(elements[i], 'mouseup', function(e){// lors du relachement du disque
                        mouseOrTouchUp(e, SOURIS);
                    });

                    /* POUR LA VERSION TACTILE */
                    addEvent(elements[i], 'touchstart', function(e){
                        mouseOrTouchDown(e.touches[0]);
                    });
                    addEvent(elements[i], 'touchend', function(e){// lors du relachement du disque
                        mouseOrTouchUp(e, TACTILE);
                    });
                }
            }

            /* LORSQUE LE DISQUE EST EN MOUVEMENT PAR LA SOURIE */
            addEvent(document, 'mousemove', function(e){//permet le suivi du mouvement
                mouseOrTouchMove(e);
            });

            /* LORSQUE LE DISQUE EST EN MOUVEMENT PAR Le TACTILE */
            addEvent(document, 'touchmove', function(e){//permet le suivi du mouvement
                mouseOrTouchMove(e.touches[0]);
            });

        }
        reset(nombreDisques);
    },

    supprimerDisques : function(){
        const disquesClear = document.querySelectorAll('.disque');
        for (let i = 0; i < disquesClear.length; i++){
            disquesClear[i].parentNode.removeChild(disquesClear[i])
        }
    },
    incrementDisques : function(){
        if (nombreDisques < nombreDisquesMax) {
            const click_Sound = document.querySelector('#bouton');
            click_Sound.currentTime = 0.02;
            click_Sound.play();

            nombreDisques += 1;//on augmente le nombre de disques
            tourHanoiMain.supprimerDisques();//on supprime tous les disques
            tourHanoiMain.showVictoire(false);
            tourHanoiMain.launch();//on relance le programme principale

        }else{
            const pasDeplacerSound = document.querySelector('#cramer');
            pasDeplacerSound.currentTime = 0;
            pasDeplacerSound.play();
        }
    },
    decrementDisques : function(){
        if (nombreDisques > nombreDisquesMin) {
            const click_Sound = document.querySelector('#bouton');
            click_Sound.currentTime = 0.02;
            click_Sound.play();

            nombreDisques -= 1;//on augmente le nombre de disques
            tourHanoiMain.supprimerDisques();//on supprime tous les disques
            tourHanoiMain.launch();//on relance le programme principale

        }else{
            const pasDeplacerSound = document.querySelector('#cramer');
            pasDeplacerSound.currentTime = 0;
            pasDeplacerSound.play();
        }
    },
    compteRebours: function(temps){
        const heures = Math.floor(temps / 3600);
        let mins = Math.floor((temps % 3600) / 60);
        let secs = Math.floor(temps % 60);

        if (secs < 10){
            secs = "0" + secs;
        }
        if (heures){
            if (mins < 10){
                mins = "0" + mins;
            }
            return heures + ":" + mins + ":" + secs; //hh:mm:ss
        }else{
            return mins + ":" + secs;//mm:ss
        }
    },

    // LA COULEUR ALEATOIRE DES DISQUES
    change_color_aleat: function(){

        const list = document.getElementById('list');
        list.addEventListener('change', function(){
            const couleur = list.options[list.selectedIndex].innerHTML;
            alert(couleur);
        }, true);

        // Avec une ligne, on obtient toutes les couleurs du monde entier.
        const disqueColor = document.querySelector('disque');
        let hexadecimal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'f'];
        function change_color()
        {
            alert('change_color');
            let couleur = '#';
            let max = hexadecimal.length;
            let min = 0;
            let entierAleatoire;
            for (let i = 0; i < 6; i++) {
                entierAleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
                // math.random(..) renvoie un nombre à virgule
                // math.floor prend que la partie entiere
                couleur = couleur + hexadecimal[entierAleatoire];
            }
            disqueColor.style.backgroundColor = couleur;
        }
        change_color();
    },
    showVictoire: function(args){
        const victoireBloc = document.querySelector('.victoire');
        jouer2 = true;
        play();
        if (args){
            victoireBloc.style.visibility = 'visible';
            victoireBloc.style.opacity = '1';

            const winSound = document.querySelector('#win');
            winSound.currentTime = 0;
            winSound.play();

            const modal = document.querySelector('.box');
            const closeBtn = document.querySelector('.close');

            modal.classList.add('visible')
            const startit = () => {
                setTimeout(function () {
                    confetti.start();
                }, 500);
            };
            // Stops
            const stopit = () => {
                setTimeout(function () {
                    confetti.stop();
                }, 6000);
            };
            // playing start
            startit();
            // stoping it
            stopit();
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('visible');
                victoireBloc.style.visibility = 'hidden';
                victoireBloc.style.opacity = '0';
                winSound.pause();
                tourHanoiMain.incrementDisques();
            })

        }else{
            victoireBloc.style.visibility = 'hidden';
            victoireBloc.style.opacity = '0';
        }

    },
};

function handle(evnt){
    tourHanoiMain.supprimerDisques();//on supprime tous les disques
    tourHanoiMain.showVictoire(false);
    tourHanoiMain.launch();//on relance le programme principale
    return true;
}
window.onresize = handle;

let nombreDisques = 3;//on commence avec 3 disques
const nombreDisquesMax = 8;//le nombre minimum de disque
const nombreDisquesMin = 3;//le nombre minimum de disque
let intervalID;
let jouer = true, jouer2 = true;
let minDisqueTour, enablePosY = false, enable2PosY = false;

const colorsDisques = ["green", "white", "orange", "blue", 'rgba(83,212,224,0.99)', "#ab3232", "darkblue", "#de38db"];

function reprendre(){
    const jeu = document.querySelector('.jeu');
    const page2h = document.querySelector('.globalee');

    jeu.style.display = 'block';
    page2h.style.display = 'none';
}

const elem = document.documentElement;
const TACTILE =  "TACTILE";
const SOURIS =  "SOURIS";

/* Function tour ouvrir fullscreen mode */
function ouvrirPlienEcran() {
    if (elem.requestFullscreen) {//ON OUVRE LE PLEIN ECRAN
        elem.requestFullscreen().then(r => console.log("PLEIN ECRAN"));
    }

    if (document.exitFullscreen) {//ON FERME LE PLEIN ECRAN
        document.exitFullscreen().then(r => console.log("FERME PLEIN ECRAN"));
    }
}

function play(){
    const music2 = document.querySelector('#music2');//le son d
    if (jouer2) {
        jouer2 = false;
        music2.pause();
        console.log("ici")
    }else{
        music2.play();
        jouer2 = true;
        console.log("ici")
    }
    changeSound(jouer2); // on change dans la BD
    return jouer2;
}

function soundInitValue(value) {
    if (!parseInt(value)) {
        jouer2 = false;
        const music2 = document.querySelector('#music2');//le son d
        music2.pause();
    }
}

function changeNbreDique(value) {
    if (value) {
        nombreDisques = parseInt(value);
        tourHanoiMain.launch();
    }
}
