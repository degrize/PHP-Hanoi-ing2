<?php
header('Content-type: text/javascript'); // on precise qu'il est possible de faire du Js dans PHP
session_start();
// on importe nos modules
include_once('../domains/Multijoueurs.php');
include_once('../mappers/multijoueurs.mapper.php');
include_once('../connection-db/con_db.php');
include_once('../repository/niveau.repository.php');
include_once('../repository/joueur.repository.php');
include_once('../repository/multijoueurs.repository.php');


$multijoueurs = new Multijoueurs();
$multijoueursRepository = new MultijoueursRepository($pdo_db); // la variable exite
$multijoueurs = multijoueursMapper(json_decode($_GET['data']));

$niveauRepository = new NiveauRepository($pdo_db); // la variable exite
$joueurRepository = new JoueurRepository($pdo_db); // la variable exite


// on recupere la tache que nous voulons executer
$methode = $_GET['methode'];

switch ($methode) {
    case "creeSalleMultijoueur":
        $rep = false;
        $niveau = $niveauRepository->findByNbreDisque(3);
        $multijoueurs->setNiveau($niveau);

        $joueur = $joueurRepository->findById($_SESSION['joueur_id']);
        $multijoueurs->setJoueur($joueur);

        $rep = $multijoueursRepository->save($multijoueurs);
        echo "reponseServeurMultijoueurs($rep);";
        break;

    case "findAll":
        $rep = $multijoueursRepository->findAll();
        echo "showAllMultiJoueurClass();";
        break;

    case "checkIfGameFinish":
        $rep = $multijoueursRepository->checkIfGameFinish($multijoueurs);
        if ($rep) {
            echo "closeGameForAllPlayers();";
        }
        break;

    case "playerFinishFirst":
        $rep = $multijoueursRepository->fermeMultijoueur($multijoueurs);
        break;

    default:
        break;
}

?>

