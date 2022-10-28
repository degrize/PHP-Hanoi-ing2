function handle(evnt){
    tourHanoiMain.supprimerDisques();//on supprime tout les disques
    tourHanoiMain.showVictoire(false);
    tourHanoiMain.launch();//on relance le programme principale
    return true;
}
window.onresize = handle;

var nombreDisques = 3;//on commence avec 3 disques
var nombreDisquesMax = 8;//le nombre minimum de disque
var nombreDisquesMin = 3;//le nombre minimum de disque
var intervalID;
var jouer = true, jouer2 = false;

var colorsDisques = ["green" ,"white", "orange", "blue", 'rgba(83,212,224,0.99)', "#ab3232", "darkblue", "#de38db"];

function reprendre(){
    var jeu = document.querySelector('.jeu');
    var page2h = document.querySelector('.globalee');

    jeu.style.display = 'block';
    page2h.style.display = 'none';

}


var elem = document.documentElement;

/* Function tour ouvrir fullscreen mode */
function ouvrirPlienEcran() {
    if (elem.requestFullscreen) {//ON OUVRE LE PLEIN ECRAN
        elem.requestFullscreen();
    }

    if (document.exitFullscreen) {//ON FERME LE PLEIN ECRAN
        document.exitFullscreen();
    }
}



function play(son){
    if (son == 'music') {
        var music2 = document.querySelector('#music2');//le son d

        if (jouer2) {
            jouer2 = false;
            music2.pause();

        }else{
            music2.play();
            jouer2 = true;
        }
        return jouer2;
    }
    else{
        if (jouer) {
            jouer = false;
        }else{
            jouer = true;
        }
        return jouer;
    }

}

var tourHanoiMain = {
    launch : function () {

        var rebours = true, secondes = 0;
        var tempsRebours = document.querySelector('.time');//pour le compte a rebous
        tempsRebours.innerHTML = "00:00";//on initialise le compte a rebous

        var tourX = [], tourY = [], tourH;
        var distanceEntreDisque = 0, distanceDivision = 0;//pour un petit ecran ecran
        var nombreDeplacement = 0;

        var deplacement = document.querySelector('.deplacement');
        deplacement.innerHTML = nombreDeplacement;

        var tempsRebours = document.querySelector('.time');//pour le compte a rebous

        function ajouterDisque(nbreDisques){
            var ParentDisque = document.querySelector('.disk');
            var val = nombreDisques;

            for (var i = 0; i < nombreDisques; i++){
                val -=1;
                var newDisque = document.createElement('div');
                var valueDisque = document.createTextNode(val);


                newDisque.setAttribute('class', 'disque');
                newDisque.setAttribute('id', 'd' + (i+1));//on insert les attributs

                newDisque.appendChild(valueDisque);//on ajout les valeurs
                ParentDisque.appendChild(newDisque);//on ajout l'elemnt creer au HTML
            }
        }
        ajouterDisque(nombreDisques);//on applel la fonction qui permettra l'ajout des disques


        // On regle ici la tour
        function toursPosition(){
            var tours = document.getElementsByTagName('span'),
                toursLen = tours.length;

            tourH = tours[0].offsetHeight;//la hauteur d'une tour
            for (var i = 0; i < toursLen; i++){
                //pour La position de chaque tour
                tourX.push(getOffset(tours[i]).left + 10);
                tourY.push(getOffset(tours[i]).top + tourH - 70);
            }
            distanceEntreDisque = tourX[1] - tourX[0];
            distanceDivision = distanceEntreDisque / 2;
        }

        function reset(nbreDisques){
            toursPosition();//Initalasation des tours
            var smallScreen = false;
            var maxDisqueWidth = 280;
            if (distanceEntreDisque < 230) {//pour la responsibilite de l'application
                maxDisqueWidth = 160;
                smallScreen = true;
            }

            var nombres = document.querySelector('.nombres');
            nombres.innerHTML =  nombreDisques;

            var niveau = document.querySelector('.niveau');
            niveau.innerHTML = "Niveau : " + (parseInt(nombreDisques) - 2);


            var zIndex = 10; //on initialise l'indexe à 10
            var disques = [];	//contients les disque
            disques =  DisquesZone(0, 1300);
            var disquesLen = disques.length;
            var top_fak = 10;
            for (var i = 0; i < disquesLen; i++){

                disques[i].style.left = tourX[0] + 'px';
                disques[i].style.top = tourY[0] + top_fak + 'px';
                disques[i].style.backgroundColor = colorsDisques[i];
                top_fak -= 24;
                zIndex += 1;
                disques[i].style.zIndex = zIndex;
                disques[i].style.width = maxDisqueWidth + 'px';

                // POUR LA RESPONSIBILITE DU JEU IL S'ADAPTE A TOUT ECRAN

                if (smallScreen) {//Si est sur un  petit ecran alors
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
            tourY[1] = parseInt(disques[0].style.top) + 24;
            tourY[0] = parseInt(disques[disquesLen - 1].style.top);
            tourY[2] = tourY[1];

            main();//on appel maintenant le programme principal

        }

        function getOffset(element){//Notre fonction qui calcule le positionnement complet
            var top = 0, left = 0;
            do{
                top += element.offsetTop;
                left += element.offsetLeft;
            }while (element = element.offsetParent);//Tantque l' "element" reçoit un "offsetParent"
            // Valide alors on additionne les valeurs de offsets

            return {//On retourne un objet Cela nous permet de retourner deux valeurs calculées
                top : top,
                left : left
            };
        }



        function addEvent(element, event, func){//une fonction pour gerer les evenements sur tout les navigateurs
            if (element.attachEvent) {
                element.attachEvent('on' + event, func);
            }
            else{
                element.addEventListener(event, func, true);

            }
        }


        function DisquesZone(zone, limZonze){//La fonction de tourHanoi
            var elements = document.getElementsByTagName('div'),
                elementsLength = elements.length;
            var disqueElements = [];

            for (var i = 0; i < elementsLength; i++){
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
            var disques = [], disquesLen = 0;
            disques = DisquesZone(zone, finZonze);
            disquesLen = disques.length;
            var elem;//Pour le verre vide du tri bulle

            for (var i = 0; i < disquesLen - 1; i++){//Un algorithme de
                //tri de bulle pour varefier si l'element est selectionable ou non
                for (var j = (i + 1) ; j < disquesLen; j++){
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
            var disquesZoneTour = [];

            var valeurDisqueMove = target.innerHTML;//La valeur du disque en mouvement
            valeurDisqueMove = parseInt(valeurDisqueMove, 10);
            var zonne = true;//si true alors il est inferieur

            zonnick = zonniqu;
            for (var i = 0; i < elements.length; i++){
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
            var tour3disques = DisquesZone(tourX[2], 1400);
            var messageWin = document.querySelector('.message');


            if (tour3disques.length == nombreDisques){
                //si tout les disques sont dans la 3eme tour alors Gagné

                clearInterval(intervalID);
                messageWin.innerHTML = "FELICITATION UTILISATEUR VOUS AVEZ TERMINE LA PARTIE AVEC\
						deplacement : " + nombreDeplacement + "<br> temps : " + tempsRebours.innerHTML;
                setTimeout(function(){

                    tourHanoiMain.showVictoire(true);
                }, 100);


            }
        }


        var storage = {};//contient l'objet div en cours de deplacement

        //LE PROGRAMME PRINCIPAL
        function main(){
            var zonnique = 0, lastZonnique = 0, continuer = true, limZonniqueA = 0;
            var limZonniqueB = 0;
            var entA = true, entB = true, entC = true;
            var posX = tourX[0], posY = tourY[0];





            var input = document.getElementById('input');



            var elements = document.getElementsByTagName('div'),
                elementsLength = elements.length;


            for (var i = 0; i < elementsLength; i++){
                if (elements[i].className === 'disque') {



                    addEvent(elements[i], 'mousedown', function(e){
                        var disqueClickSound = document.querySelector('#disqueClick');//le son du click
                        if (jouer){
                            disqueClickSound.play();
                        }


                        mousemoveLeftClick = e.clientX;//la valeur du curseur au click


                        var s = storage;

                        s.target = e.target || event.srcElement;
                        s.offsetX = e.clientX - s.target.offsetLeft;
                        s.offsetY = e.clientY - s.target.offsetTop;



                        if (continuer){
                            var lastZonne = parseInt(getOffset(s.target).left);

                            if (lastZonne > 0 && lastZonne < tourX[1] - distanceDivision){
                                lastZonnique = 1;
                            }
                            else if (lastZonne > tourX[1] - distanceDivision && lastZonne < tourX[2] - distanceDivision){
                                lastZonnique = 2;
                            }
                            if (lastZonne > tourX[2] - distanceDivision){
                                lastZonnique = 3;
                            }

                        }
                        continuer = false;




                        //Intruction pour deplacer que le disque inferieur //
                        disqueDownZoneB = verifSelection(parseInt(tourX[1]), parseInt(tourX[2]));
                        disqueDownZoneA = verifSelection(parseInt(tourX[0]), parseInt(tourX[1]));
                        disqueDownZoneC = verifSelection(parseInt(tourX[2]), 1200);
                        if (s.target !== disqueDownZoneC && s.target !== disqueDownZoneA &&
                            s.target !== disqueDownZoneB){
                            storage = {};//On vide les deplacements
                        }


                    });

                    addEvent(elements[i], 'mouseup', function(e){// lors du relachement du disque


                        var target = storage.target;

                        var mousemoveLeftUp = e.clientX;//la valeur du curseur au relachement

                        var differenceParcour = mousemoveLeftClick - mousemoveLeftUp;

                        var erreur = false;

                        if (zonnique == lastZonnique){
                            if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){

                                erreur = true;//faut deplacement donc erreur
                            }

                        }


                        if (zonnique == 1){//lors du deplacement et le disque se touve dans la 1ère zone

                            if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){



                                if (lastZonnique == 1){
                                    tourY[0] += 0;


                                }else{
                                    tourY[0] -= 24;
                                }

                                if (lastZonnique == 2){
                                    tourY[1] += 24;
                                }
                                if (lastZonnique == 3){
                                    tourY[2] +=24;
                                }
                                if (!erreur) {
                                    nombreDeplacement += 1;
                                }


                            }




                            posX = tourX[0];
                            posY = tourY[0];
                            target.style.left = posX + 'px';
                            target.style.top = posY + 'px';

                        }
                        if (zonnique == 2){//lors du deplacement et le disque se touve dans la 2ème zone


                            if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){

                                if (lastZonnique == 1){
                                    tourY[0] += 24;
                                }
                                if (lastZonnique == 3){
                                    tourY[2] +=24;
                                }
                                if (lastZonnique == 2){
                                    tourY[1] += 0;
                                }else{
                                    tourY[1] -= 24;
                                }
                                if (!erreur) {
                                    nombreDeplacement += 1;
                                }

                            }

                            posX = tourX[1];
                            posY = tourY[1];
                            target.style.left = posX + 'px';
                            target.style.top = posY + 'px';
                        }
                        if (zonnique == 3){//Ici c'est la zone 3


                            if (differenceParcour > distanceDivision || differenceParcour < (-distanceDivision)){

                                if (lastZonnique == 1){
                                    tourY[0] += 24;
                                }
                                if (lastZonnique == 2){
                                    tourY[1] +=24;
                                }
                                if (lastZonnique == 3){
                                    tourY[2] += 0;
                                }else{
                                    tourY[2] -= 24;
                                }

                                if (!erreur) {
                                    nombreDeplacement += 1;
                                }

                            }

                            posX = tourX[2];
                            posY = tourY[2];
                            target.style.left = posX + 'px';
                            target.style.top = posY + 'px';
                        }
                        if (jouer) {
                            if (erreur){
                                var pasDeplacerSound = document.querySelector('#pasDeplacer');
                                pasDeplacerSound.currentTime = 0.4;
                                pasDeplacerSound.play();
                            }else{
                                var disqueMouseUpSound = document.querySelector('#disqueMouseUp');
                                disqueMouseUpSound.play();
                            }
                        }


                        continuer = true;
                        zonnique = 0;
                        storage = {};//on vide le deplacement
                        var deplacement = document.querySelector('.deplacement');
                        deplacement.innerHTML = nombreDeplacement;

                        verifGagne();







                    });


                }

            }



            addEvent(document, 'mousemove', function(e){//permet le suivi du mouvement
                var target = storage.target;


                if (target) {


                    target.style.top = e.clientY - storage.offsetY + 'px';
                    target.style.left = e.clientX - storage.offsetX + 'px';

                    var valeurTargetLeft = parseInt(target.style.left);

                    if (valeurTargetLeft > (-100) && valeurTargetLeft < tourX[1] - distanceDivision){
                        //Si le curseur est dans la zone de la  1ere tour alors
                        zonnique = 1;
                        limZonniqueA = 0;
                        limZonniqueB = tourX[1] - distanceDivision;

                    }
                    else if (valeurTargetLeft > (tourX[1] - distanceDivision) && valeurTargetLeft < tourX[2] - distanceDivision){
                        //Si le curseur est dans la zone de la  2ème tour alors
                        zonnique = 2
                        limZonniqueB = tourX[2];
                        limZonniqueA = tourX[1] - distanceDivision;

                    }
                    else if (valeurTargetLeft > tourX[2] - distanceDivision ){//ici c'est la zone 3
                        zonnique = 3;
                        limZonniqueB = 1400;
                        limZonniqueA = tourX[2] - distanceDivision;



                    }
                    // apple de le fonction pour verifier si l'utilisateur ne deplace
                    //pas un disque superieur sur un inferieur
                    zonnique = verifmouseUp(target, elements, zonnique, lastZonnique, limZonniqueA, limZonniqueB);


                    // ON ACTIVE LE COMPTE A REBOURS MAINTENANT UNE FOIS
                    if (rebours){
                        // chaque 1 seconde on incremente le compte a rebours
                        secondes += 1;
                        tempsCompte = tourHanoiMain.compteRebours(secondes);
                        tempsRebours.innerHTML = tempsCompte;
                        intervalID = setInterval(function(){

                            secondes += 1;
                            tempsCompte = tourHanoiMain.compteRebours(secondes);
                            tempsRebours.innerHTML = tempsCompte;

                        },1000);
                    }
                    rebours = false;
                }
            });
        }
        // body...

        reset(nombreDisques);


    },

    supprimerDisques : function(){
        var disquesClear = document.querySelectorAll('.disque');
        for (var i = 0; i < disquesClear.length; i++){
            disquesClear[i].parentNode.removeChild(disquesClear[i])
        }


    },
    incrementDisques : function(){

        if (nombreDisques < nombreDisquesMax) {
            var click_Sound = document.querySelector('#bouton');
            click_Sound.currentTime = 0.02;
            click_Sound.play();

            clearInterval(intervalID);//On annule le compte à rebours
            nombreDisques += 1;//on augment le nombre de disques
            tourHanoiMain.supprimerDisques();//on supprime tout les disques
            tourHanoiMain.showVictoire(false);
            tourHanoiMain.launch();//on relance le programme principale

        }else{
            var pasDeplacerSound = document.querySelector('#cramer');
            pasDeplacerSound.currentTime = 0.5;
            pasDeplacerSound.play();
        }


    },
    decrementDisques : function(){

        if (nombreDisques > nombreDisquesMin) {
            var click_Sound = document.querySelector('#bouton');
            click_Sound.currentTime = 0.02;
            click_Sound.play();

            clearInterval(intervalID);//On annule le compte à rebours
            nombreDisques -= 1;//on augment le nombre de disques
            tourHanoiMain.supprimerDisques();//on supprime tout les disques
            tourHanoiMain.launch();//on relance le programme principale

        }else{
            var pasDeplacerSound = document.querySelector('#cramer');
            pasDeplacerSound.currentTime = 0.5;
            pasDeplacerSound.play();
        }


    },
    compteRebours: function(temps){
        var heures = Math.floor(temps / 3600);
        var mins = Math.floor((temps % 3600) / 60);
        var secs = Math.floor(temps % 60);

        if (secs < 10){
            secs = "0" + secs;
        }
        if (heures){
            if (mins < 10){
                mins = "0" + mins;
            }
            return hours + ":" + mins + ":" + secs; //hh:mm:ss
        }else{
            return mins + ":" + secs;//mm:ss
        }

    },

    // LA COULEUR ALEATOIRE DES DISQUES
    change_color_aleat: function(){

        var list = document.getElementById('list');
        list.addEventListener('change', function(){
            var couleur = list.options[list.selectedIndex].innerHTML;
            alert(couleur);
        }, true);



        // Avec une ligne on obtien toutes les couleurs du monde entier.
        var disqueColor = document.querySelector('disque');
        hexadeximal = new Array(0,1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'f');
        function change_color()
        {
            alert('uuiiu');
            couleur = '#';
            max = hexadeximal.length;
            min = 0;
            for(i = 0; i < 6; i++)
            {
                entierAleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
                // math.radom(..) renvoie un nombre a virgule
                // math.floor prend que la partie entiere
                couleur = couleur + hexadeximal[entierAleatoire];
            }
            disqueColor.style.backgroundColor = couleur;
        }
        change_color();
    },


    showVictoire: function(args){
        var victoireBloc = document.querySelector('.victoire');
        if (args){
            victoireBloc.style.visibility = 'visible';
            victoireBloc.style.opacity = '1';


        }else{
            victoireBloc.style.visibility = 'hidden';
            victoireBloc.style.opacity = '0';
        }
    },




};
tourHanoiMain.launch();
