<?php
include_once('../domains/Joueur.php');

function joueurMapper($joueur): Joueur
{
    $joueurMapper = new Joueur();
    $joueurMapper->setId($joueur->{'id'});
    $joueurMapper->setEmail($joueur->{'email'});
    $joueurMapper->setLogin($joueur->{'login'});
    $joueurMapper->setMotDePasse($joueur->{'mot_de_passe'});
    $joueurMapper->setPhoto($joueur->{'photo'});
    $joueurMapper->setEstSuspendu($joueur->{'est_suspendu'});
    $joueurMapper->setPiece($joueur->{'piece'});
    $joueurMapper->setNiveauActuel($joueur->{'niveau_actuel'});
    $joueurMapper->setMusique($joueur->{'musique'});
    $joueurMapper->setCreeLe($joueur->{'cree_le'});
    $joueurMapper->setModifieLe($joueur->{'modifie_le'});

    return $joueurMapper;

}
