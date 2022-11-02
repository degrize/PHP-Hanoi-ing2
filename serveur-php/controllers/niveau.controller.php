<?php
header('Content-type: text/javascript'); // on precise qu'il est possible de faire du Js dans PHP
session_start();
// on importe nos modules
include_once('../domains/Niveau.php');
include_once('../repository/niveau.repository.php');
include_once('../connection-db/con_db.php');

$niveau = new Niveau();
$niveauRepository = new NiveauRepository($pdo_db); // la variable exite

// on recupere la tache que nous voulons executer
$mehode = $_GET['methode'];
$rep = false;

switch ($mehode) {
    case "findAll":
        $rep = $niveauRepository->findAll();
        echo 'showAllLevel();';
        break;

    default:
        break;


}

// echo "alert('$joueur')";


?>

