<?php
header('Content-type: text/javascript'); // on precise qu'il est possible de faire du Js dans PHP
session_start();
// on importe nos modules
include_once('../domains/ContactUs.php');
include_once('../repository/contactUs.repository.php');
include_once('../mappers/contactUs.mapper.php');
include_once('../connection-db/con_db.php');

$contactUs = new ContactUs();
$contactUsRepository = new ContactUsRepository($pdo_db); // la variable exite
$contactUs = contactUsMapper(json_decode($_GET['data']));

// on recupere la tache que nous voulons executer
$mehode = $_GET['methode'];

switch ($mehode) {
    case "sendHelp":
        try {
            $rep = true;
            $rep = $contactUsRepository->save($contactUs);
        } catch (\PHPMailer\PHPMailer\Exception $e) {
            $rep = false;
        }
        echo "reponseServeur($rep);";
        break;

    default:
        break;
}

?>

