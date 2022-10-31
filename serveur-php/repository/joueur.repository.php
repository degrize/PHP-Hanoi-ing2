<?php
include_once('../domains/Joueur.php');
include_once('../connection-db/con_db.php');
include_once('../services/sendEmail.php');

class JoueurRepository {
    private static $db;
    public function __construct() {
        self::$db = (new ConnectionDB())->db;
    }

    public function save(Joueur $joueur): bool
    {
        $joueur->setId(null);
        $req = self::$db->prepare('
            INSERT INTO hanoi_joueur(id,
                email,login, mot_de_passe, photo, est_suspendu, cree_le, modifie_le) 
            VALUES(:id, :email, :login, :mot_de_passe, :photo, :est_suspendu, :cree_le, :modifie_le)');
        $req->execute(array(
            'id' => $joueur->getId(),
            'email' => $joueur->getEmail(),
            'login' => $joueur->getLogin(),
            'mot_de_passe' => $this->hash_password($joueur->getMotDePasse()),
            'photo' => $joueur->getPhoto(),
            'est_suspendu' => $joueur->getEstSuspendu(),
            'cree_le' => $joueur->getCreeLe(),
            'modifie_le' => $joueur->getModifieLe(),
        ));
        return true;
    }

    public function edit(Joueur $joueur): string
    {
        $rep = false;
        if ($joueur->getId()) {
            $req = self::$db->prepare('
            UPDATE hanoi_joueur SET 
                email = :email,login = :login, mot_de_passe = :mot_de_passe,
                photo = :photo, est_suspendu = :est_suspendu, cree_le = :cree_le, modifie_le = :modifie_le 
            WHERE id = :id');
            $req->execute(array(
                'email' => $joueur->getEmail(),
                'login' => $joueur->getLogin(),
                'mot_de_passe' => $this->hash_password($joueur->getMotDePasse()),
                'photo' => $joueur->getPhoto(),
                'est_suspendu' => $joueur->getEstSuspendu(),
                'cree_le' => $joueur->getCreeLe(),
                'modifie_le' => $joueur->getModifieLe(),
                'id' => (int) $joueur->getId(),
            ));
            $rep = true;
        }
        return $rep;
    }

    public function delete(Joueur $joueur): string
    {
        return "true";
    }

    public function findById($id) {
        $joueur = new Joueur();
        return $joueur;
    }

    public function findByEmail($email): Joueur
    {
        $joueur = new Joueur();
        $req = self::$db->query("SELECT * FROM hanoi_joueur where email = '$email'");
        while ($donnees = $req->fetch()) {
            $joueur->setId($donnees['id']);
            $joueur->setLogin($donnees['login']);
            $joueur->setEmail($donnees['email']);
            $joueur->setMotDePasse($donnees['mot_de_passe']);
            $joueur->setPhoto($donnees['photo']);
            $joueur->setEstSuspendu($donnees['est_suspendu']);
            $joueur->setCreeLe($donnees['cree_le']);
            $joueur->setModifieLe($donnees['modifie_le']);
        }
        $req->closeCursor();
        return $joueur;
    }

    public function findAll() {
        $joueurs = array();
        $joueur = new Joueur();
        $joueurs[] = $joueur;
        return $joueurs;
    }

    public function findAllEmail(): array
    {
        $emails = array();
        $req = self::$db->query('SELECT email FROM hanoi_joueur');
        while ($donnees = $req->fetch()) {
            $emails[] = $donnees['email'];
        }
        $req->closeCursor();

        return $emails;
    }

    public function findAllLogin(): array
    {
        $logins = array();
        $req = self::$db->query('SELECT login FROM hanoi_joueur');
        while ($donnees = $req->fetch()) {
            $logins[] = $donnees['login'];
        }
        $req->closeCursor();

        return $logins;
    }

    public function findAllPassword(): array
    {
        $mot_de_passe = array();
        $req = self::$db->query('SELECT mot_de_passe FROM hanoi_joueur');
        while ($donnees = $req->fetch()) {
            $mot_de_passe[] = $donnees['mot_de_passe'];
        }
        $req->closeCursor();

        return $mot_de_passe;
    }

    public function hash_password(string $pwd): string {
        $pepper = "c1isvFdxMDdmjOlvxpecFw";
        $pwd_peppered = hash_hmac("sha256", $pwd, $pepper);
        return password_hash($pwd_peppered, PASSWORD_ARGON2ID);
    }

    public function encode_password(string $pwd): string {
        $pepper = "c1isvFdxMDdmjOlvxpecFw";
        return hash_hmac("sha256", $pwd, $pepper);
    }

    public function connection(Joueur $joueur): string
    {
        $email = $joueur->getEmail();
        $rep = "false";
        $req = self::$db->query("SELECT mot_de_passe FROM hanoi_joueur where email = '$email'");
        while ($donnees = $req->fetch()) {
            $pwd_hashed  = $donnees['mot_de_passe'];
            if (password_verify($this->encode_password($joueur->getMotDePasse()), $pwd_hashed)) {
                $rep = "true";
            }
        }
        $req->closeCursor();
        return $rep;
    }

    /**
     * @throws \PHPMailer\PHPMailer\Exception
     */
    public function retrievePassword(Joueur $joueur): string
    {
        $joueur = $this->findByEmail($joueur->getEmail());
        $joueur->setMotDePasse($joueur->getLogin() . "1234");
        $this->edit($joueur);
        $body_email = '<!doctype html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport"
					  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
			</head>
			<body>
			    <div style="background-color: #eeeeef;padding: 50px 0; font-family: Consolas,sans-serif">
                    <table style="max-width: 640px" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td style="padding-top: 20px" align="center" bgcolor="#3ab2a6">
                                    <h1 style="color: #fff">Jeu Hanoi</h1>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td width="260" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td><h4>Salut! Vos identifiants au jeu HANOI.</h4></td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0 0 0"><u>Pseudo</u>: '. $joueur->getLogin() .'</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0 0 0"><u>Email</u>: '. $joueur->getEmail() .'</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0 0 0"><u>Mot de passe</u>: '. $joueur->getMotDePasse() .'</td>
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
                                                    &reg; Projet PHP-Hanoi
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

        $sendEmail = new SendEmail($joueur->getEmail(), $body_email, "reinitialisation du mot de passe");
        return $sendEmail->sendmail();;
    }





}
