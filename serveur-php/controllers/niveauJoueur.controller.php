<?php
header('Content-type: text/javascript'); // on precise qu'il est possible de faire du Js dans PHP
session_start();
// on importe nos modules
include_once('../domains/NiveauJoueur.php');
include_once('../mappers/niveauJoueur.mapper.php');
include_once('../repository/niveau.repository.php');
include_once('../repository/niveau-joueur.repository.php');
include_once('../repository/joueur.repository.php');
include_once('../connection-db/con_db.php');

$niveauJoueur = new NiveauJoueur();
$niveauJoueurRepository = new NiveauJoueurRepository($pdo_db); // la variable existe
$niveauJoueur = niveauJoueurMapper(json_decode($_GET['data']));

$joueur = new Joueur();
$joueurRepository = new JoueurRepository($pdo_db); // la variable existe
$joueur = $joueurRepository->findById($_SESSION['joueur_id']);

$niveau = new Niveau();
$niveauRepository = new NiveauRepository($pdo_db); // la variable existe
$niveau = $niveauRepository->findByNbreDisque($niveauJoueur->getNbreDisque());

// on recupere la tache que nous voulons executer
$methode = $_GET['methode'];
$rep = false;

switch ($methode) {
    case "save":
        $niveauJoueur->setJoueur($joueur);
        $niveauJoueur->setNiveau($niveau);
        $rep = $niveauJoueurRepository->updateNiveauJoueur($niveauJoueur);
        if ($rep) {
            // On ajoute a ses coins le pourcentage du jeu gagné
            $piece = ($niveau->getGain() * $rep / 100) + $joueur->getPiece();
            $joueur->setPiece($piece);

            if ((int)$niveau->getNbreDisque() < 8) {
                $joueur->setNiveauActuel( (int)$niveau->getNbreDisque() + 1);
            } else {
                $joueur->setNiveauActuel($niveau->getNbreDisque());
            }

            $rep = $joueurRepository->editPlayerGame($joueur);
            $joueur = $joueurRepository->findById($_SESSION['joueur_id']);
            echo 'reponseServeurlevelUp('.$joueur.');';
        }
        break;

    default:
        break;
}

// echo "alert('$joueur')";

?>

