<?php
include_once('../domains/NiveauJoueur.php');
include_once('../mappers/joueur.mapper.php');
include_once('../mappers/niveau.mapper.php');

function niveauJoueurMapper($niveauJoueur): NiveauJoueur
{
    $niveauJoueurMapper = new NiveauJoueur();
    $niveauJoueurMapper->setTemps($niveauJoueur->{'temps'});
    $niveauJoueurMapper->setDeplacement($niveauJoueur->{'deplacement'});
    $niveauJoueurMapper->setNbreDisque($niveauJoueur->{'nbre_disque'});

    return $niveauJoueurMapper;
}
