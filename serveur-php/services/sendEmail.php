<?php
require_once "../utils/PHPMailer/PHPMailer.php";
require_once "../utils/PHPMailer/SMTP.php";
require_once "../utils/PHPMailer/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
class SendEmail {
    public $name = "Jeu d'Hanoi STIC";  // Le nom du JEU
    public $from = "mdegrize@gmail.com";  // Le mail de l'admin du jeu
    public $password = "lzjpafzeudpqjzdj";  // Le mot de passe App-GOOGLE
    public $to = null;  // mail of reciever
    public $subject = null;
    public $message = null;

    public function __construct($to, $message, $subject) {
        $this->to = $to;
        $this->subject = $subject;
        $this->message = $message;
    }

    /**
     * @throws \PHPMailer\PHPMailer\Exception
     */
    public function sendmail(): string {
        $mail = new PHPMailer();

        //SMTP Configuration
        $mail->isSMTP();
        // $mail->SMTPDebug = 3;  Keep It a commenté que cela est utilisé pour le débogage
        $mail->Host = "smtp.gmail.com"; // adresse smtp de votre email
        $mail->SMTPAuth = true;
        $mail->Username = $this->from;
        $mail->Password = $this->password;
        $mail->Port = 587;  // port
        $mail->SMTPSecure = "tls";  // tls ou ssl
        $mail->smtpConnect([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ]);

        //Email Configuration
        $mail->isHTML(true);
        $mail->setFrom($this->from, $this->name);
        $mail->addAddress($this->to); // entrez l'adresse e-mail à qui vous voulez envoyer
        $mail->Subject = ("$this->subject");
        $mail->Body = $this->message;
        if ($mail->send()) {
            return "true";
        } else {
            // echo "Quelque chose ne va pas : <br><br>" . $mail->ErrorInfo;
            return "false";
        }
    }

}


