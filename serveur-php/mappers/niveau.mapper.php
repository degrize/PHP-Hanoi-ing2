<?php
include_once('../domains/Niveau.php');

function niveauMapper($niveau): Niveau
{
    $niveauMapper = new Niveau();
    $niveauMapper->setId($niveau->{'id'});
    $niveauMapper->setGain($niveau->{'gain'});
    $niveauMapper->setNbreDisque($niveau->{'nbre_disque'});
    $niveauMapper->setTempsMax($niveau->{'temps_max'});
    $niveauMapper->setDeplacementMax($niveau->{'deplacement_max'});
    $niveauMapper->setDescription($niveau->{'description'});
    $niveauMapper->setTitre($niveau->{'titre'});

    return $niveauMapper;
}
