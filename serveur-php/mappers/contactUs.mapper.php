<?php
include_once('../domains/ContactUs.php');

function contactUsMapper($contactUs): ContactUs {
    $contactUsMapper = new ContactUs();
    $contactUsMapper->setId($contactUs->{'id'});
    $contactUsMapper->setEmail($contactUs->{'email'});
    $contactUsMapper->setNom($contactUs->{'nom'});
    $contactUsMapper->setMessage($contactUs->{'message'});
    $contactUsMapper->setObjet($contactUs->{'objet'});
    $contactUsMapper->setSendDate($contactUs->{'send_date'});

    return $contactUsMapper;

}
