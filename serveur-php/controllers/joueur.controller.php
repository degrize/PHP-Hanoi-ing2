<?php
header('Content-type: text/javascript'); // on precise qu'il est possible de faire du Js dans PHP
session_start();
// on importe nos modules
include_once('../domains/Joueur.php');
include_once('../repository/joueur.repository.php');
include_once('../mappers/joueur.mapper.php');
include_once('../connection-db/con_db.php');

$joueur = new Joueur();
$joueurRepository = new JoueurRepository($pdo_db); // la variable exite
$joueur = joueurMapper(json_decode($_GET['data']));

// on recupere la tache que nous voulons executer
$mehode = $_GET['methode'];
$rep = false;

switch ($mehode) {
    case "connection":
        $rep = $joueurRepository->connection($joueur);
        echo "reponseServeur($rep);";
        break;
    case "joueurConnecte":
        if (isset($_SESSION['joueur_id'])) {
            $joueur = $joueurRepository->findById($_SESSION['joueur_id']);
        }
        echo "reponseServeur($joueur);";
        break;

    case "save":
        $rep = $joueurRepository->save($joueur);
        echo 'reponseServeur('.$rep.');';
        break;
    case "edit":
        $rep = $joueurRepository->edit($joueur);
        if ($rep) {
            $joueur = $joueurRepository->findById($_SESSION['joueur_id']);
            echo 'reponseServeurEdit('.$joueur.');';
        }
        break;
    case "delete":
        $rep = $joueurRepository->delete($joueur);
        echo 'reponseServeur('.$joueur.');';
        break;
    case "findById":
        $rep = $joueurRepository->findById($joueur->getId());
        echo 'reponseServeur('.$joueur.');';
        break;
    case "findAll":
        $joueurList = $joueurRepository->findAll();
        echo 'joueurList ='. json_encode($joueurList) .';';
        break;
    case "findAllEmail":
        $emailList = $joueurRepository->findAllEmail();
        echo 'emailList ='. json_encode($emailList) .';';
        break;
    case "findAllLogin":
        $loginList = $joueurRepository->findAllLogin();
        echo 'loginList = '.json_encode($loginList).';';
        break;
    case "checkLastPwd":
        $rep = $joueurRepository->checkLastPwd($joueur);
        echo 'var_checkLastPwd = ' . json_encode($rep) . ';';
        break;
    case "retrievePassword":
        try {
            $rep = $joueurRepository->retrievePassword($joueur);
        } catch (\PHPMailer\PHPMailer\Exception $e) {
            echo 'reponseServeur('. false .');';
        }
        echo 'reponseServeur('.$rep.');';
        break;
    case "changeAvatar":
        $rep = $joueurRepository->changeAvatar($joueur);
        if ($rep) {
            $rep = $joueurRepository->findById($joueur->getId());
        }
        echo "reponseServeur($rep);";
        break;

    case "enableDisableSound":
        $joueur->setId($_SESSION['joueur_id']);
        $rep = $joueurRepository->enableDisableSound($joueur);
        if ($rep) {
            $rep = $joueurRepository->findById($joueur->getId());
        }
        echo "reponseServeurSound($rep);";
        break;

    case "updateUserStatus":
        /* Les utilisateurs connectés au jeu */
        $time = time();
        $joueur->setId($_SESSION['joueur_id']);
        $rep = $joueurRepository->updateUserStatus($joueur);
        break;

    case "getUserStatus":
        /* Les utilisateurs connectés au jeu */
        $joueursOnline = $joueurRepository->findAllOnline();
        echo 'showPlayerSatus();';
        break;

    case "logout":
        /* Les utilisateurs connectés au jeu */
        $joueur = $joueurRepository->findById($_SESSION['joueur_id']);
        $rep = $joueurRepository->logout($joueur);
        if ($rep) {
            echo "reponseServeurLogout();";
        }
        break;

    default:
        break;

}


// echo "alert('$joueur')";


?>

