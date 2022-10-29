<?php
include_once('../domains/Joueur.php');
include_once('../connection-db/con_db.php');

class JoueurRepository {
    private static $db;
    public function __construct() {
        self::$db = (new ConnectionDB())->db;
    }
    public function save(Joueur $joueur) {
        $req = self::$db->prepare('INSERT INTO 
            joueur(email,login, mot_de_passe, est_suspendu, photo, cree_le, modifie_le) 
            VALUES(:email, :login, :mot_de_passe, :photo, :est_suspendu, :cree_le, :modifie_le)');
        $req->execute(array(
            'email' => $joueur->getEmail(),
            'login' => $joueur->getLogin(),
            'mot_de_passe' => $joueur->getMotDePasse(),
            'photo' => $joueur->getPhoto(),
            'est_suspendu' => $joueur->getEstSuspendu(),
            'cree_le' => $joueur->getCreeLe(),
            'modifie_le' => $joueur->getModifieLe(),
        ));
        return true;
    }

    public function edit(Joueur $joueur) {
        return true;
    }

    public function delete(Joueur $joueur) {
        return true;
    }

    public function findById($id) {
        $joueur = new Joueur();
        return $joueur;
    }

    public function findAll() {
        $joueurs = array();
        $joueur = new Joueur();
        $joueurs[] = $joueur;
        return $joueurs;
    }


}
