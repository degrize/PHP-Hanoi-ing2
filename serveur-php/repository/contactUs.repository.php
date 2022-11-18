<?php
include_once('../domains/ContactUs.php');
include_once('../services/sendEmail.php');
include_once('../repository/logs.repository.php');


class ContactUsRepository {
    private static $db;
    public function __construct($pdo_db) {
        self::$db = $pdo_db;
    }

    /**
     * @throws \PHPMailer\PHPMailer\Exception
     */
    public function save(ContactUs $contactUs): bool {
        $contactUs->setSendDate(date("Y-m-d H:i:s")); // today
        if (!empty($contactUs->getEmail()) && !empty($contactUs->getMessage())) {
            $req = self::$db->prepare('
            INSERT INTO hanoi_contact_us(
                email, nom, objet, message, send_date) 
            VALUES(:email, :nom, :objet, :message, :send_date)');
            $req->execute(array(
                'email' => $contactUs->getEmail(),
                'nom' => $contactUs->getNom(),
                'objet' => $contactUs->getNom(),
                'message' => $contactUs->getMessage(),
                'send_date' => $contactUs->getSendDate(),
            ));
            $this->sendHelp($contactUs);
            return true;
        }
        return false;

    }

    public function findAll(): array
    {
        $contactUsMist = array();

        $req = self::$db->query("SELECT * FROM hanoi_contact_us");
        while ($donnees = $req->fetch()) {
            $contactUs = new ContactUs();
            $contactUs->setId($donnees['id']);
            $contactUs->setNom($donnees['nom']);
            $contactUs->setEmail($donnees['email']);
            $contactUs->setMessage($donnees['message']);
            $contactUs->setSendDate($donnees['send_date']);
            $contactUsMist[] = $contactUs;
        }
        $req->closeCursor();
        return $contactUsMist;
    }

    /**
     * @throws \PHPMailer\PHPMailer\Exception
     */
    public function sendHelp(ContactUs $contactUs): string
    {
        $body_email = '<!doctype html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport"
					  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Jeu d\'Hanoi ING STIC</title>
			</head>
			<body>
			    <div style="background-color: #eeeeef;padding: 50px 0; font-family: Consolas,sans-serif">
                    <table style="max-width: 640px" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td style="padding-top: 20px" align="center" bgcolor="#3ab2a6">
                                    <h1 style="color: #fff">CONTACT & AIDE</h1>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td width="260" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td style="padding: 10px 0 0 0"><u>Nom</u>: '. $contactUs->getNom() .'</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0 0 0"><u>Email</u>: '. $contactUs->getEmail() .'</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0 0 0"><u>Message</u>: <br/> '. $contactUs->getMessage() .'</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #ffffff;padding: 0px 30px 30px 30px">
                                    <table border="0" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td style="font-family: sans-serif;font-size: 14px">
                                                    <b >Proposé par</b> : M. KONAN KAN <br> enseignant à l\'INP-HB <br> <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif;font-size: 14px">
                                                    &reg; PHP-Hanoi - Tel: 0759948254
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
			</body>
			</html>';

        $sendEmail = new SendEmail("mdegrize@gmail.com", $body_email, "Envoi d'aide");
        return $sendEmail->sendmail();;
    }





}
