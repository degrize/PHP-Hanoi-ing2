<?php
include_once('../domains/Joueur.php');

function convertJsonToClass($joueur) {
    $joueurMapper = new Joueur();
    $joueurMapper->setLogin("$joueur->{'login'}");
    $joueurMapper->setMotDePasse("$joueur->{'mot_de_passe'}");
    $joueurMapper->setEstSuspendu("$joueur->{'est_suspendu'}");

    return $joueurMapper;

}
