<?php
header('Content-type: text/javascript');
include_once('../domaines/Joueur.php');
include_once('../repository/joueur.repository.php');
include_once('../mappers/joueur.mapper.php');

$joueur = new Joueur();
$joueurRepository = new JoueurRepository();

$mehode = $_GET['methode'];
$rep = false;

$joueur = convertJsonToClass($_GET['data']);

switch ($mehode) {
    case "save":
        $rep = $joueurRepository->save($joueur);
        break;
    case "edit":
        $rep = $joueurRepository->edit($joueur);
        break;
    case "delete":
        $rep = $joueurRepository->delete($joueur);
        break;
    case "findById":
        $rep = $joueurRepository->findById($joueur->getId());
        break;
    case "findAll":
        $rep = $joueurRepository->findAll();
        break;

}

// echo "alert('$joueur')";
echo 'reponseServeur('.$joueur.');';

?>

