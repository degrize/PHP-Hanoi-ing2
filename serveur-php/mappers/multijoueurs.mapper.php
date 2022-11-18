<?php
include_once('../domains/Multijoueurs.php');

function multijoueursMapper($joueur): Multijoueurs
{
    $multijoueursMapper = new Multijoueurs();
    $multijoueursMapper->setId($joueur->{'id'});
    $multijoueursMapper->setCleSalle($joueur->{'cle_salle'});
    $multijoueursMapper->setNomSalle($joueur->{'nom_salle'});
    $multijoueursMapper->setNbreJoueur($joueur->{'nbre_joueur'});
    $multijoueursMapper->setVictoire($joueur->{'victoire'});
    $multijoueursMapper->setCreeLe($joueur->{'cree_le'});

    return $multijoueursMapper;

}
