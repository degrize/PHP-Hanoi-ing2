<?php
include_once('../domains/Joueur.php');
include_once('../domains/Niveau.php');
include_once('../domains/NiveauJoueur.php');
include_once('../connection-db/con_db.php');
include_once('../repository/niveau.repository.php');
include_once('../repository/joueur.repository.php');

class NiveauJoueurRepository {
    private static $db;
    public function __construct($pdo_db) {
        self::$db = $pdo_db; // variable depuis la classe CONECTIONDB
    }

    public function save(NiveauJoueur $niveauJoueur): bool {
        $rep = false;
        $niveau_id = $niveauJoueur->getNiveau()->getId();
        $joueur_id = $niveauJoueur->getJoueur()->getId();
        if ($niveau_id && $joueur_id) {
            $req = self::$db->prepare('
                INSERT INTO hanoi_rel_niveau_joueur(niveau_id, joueur_id,
                    deplacement, temps) 
                VALUES(:niveau_id, :joueur_id, :deplacement, :temps)');
            $req->execute(array(
                'niveau_id' => $niveau_id,
                'joueur_id' => $joueur_id,
                'deplacement' => $niveauJoueur->getDeplacement(),
                'temps' => $niveauJoueur->getTemps()
            ));
            $rep = true;
        }

        return $rep;
    }

    public function edit(NiveauJoueur $niveauJoueur): string
    {
        $rep = false;
        $niveau_id = $niveauJoueur->getNiveau()->getId();
        $joueur_id = $niveauJoueur->getJoueur()->getId();
        if ($niveau_id && $joueur_id) {
            $req = self::$db->prepare('
            UPDATE hanoi_rel_niveau_joueur SET 
                deplacement = :deplacement, temps = :temps  
            WHERE niveau_id = :niveau_id AND joueur_id = :joueur_id');
            $req->execute(array(
                'deplacement' => $niveauJoueur->getDeplacement(),
                'temps' => $niveauJoueur->getTemps(),
                'niveau_id' => $niveau_id,
                'joueur_id' => $joueur_id
            ));
            $rep = true;
        }
        return $rep;
    }

    public function delete(NiveauJoueur $niveauJoueur): string
    {
        return "true";
    }

    public function findById($id) {
        $niveauJoueur = new NiveauJoueur();
        return $niveauJoueur;
    }

    public function findAllByJoueur(Joueur $joueur): array
    {
        $niveauJoueurList = array();
        $req = self::$db->query("SELECT * FROM hanoi_rel_niveau_joueur where joueur_id =" . $joueur->getId() . ";");
        while ($donnees = $req->fetch()) {
            $niveauJoueur = new NiveauJoueur();
            $niveauJoueur->setNiveau((new NiveauRepository(self::$db ))->findById($donnees['niveau_id']));
            $niveauJoueur->setDeplacement($donnees['deplacement']);
            $niveauJoueur->setTemps($donnees['temps']);

            $niveauJoueurList[] = $niveauJoueur;
        }
        $req->closeCursor();
        return $niveauJoueurList;
    }

    public function findAllByNiveau(Niveau $niveau): array
    {
        $niveauJoueurList = array();
        $req = self::$db->query("SELECT * FROM hanoi_rel_niveau_joueur where niveau_id =" . $niveau->getId() . ";");
        while ($donnees = $req->fetch()) {
            $niveauJoueur = new NiveauJoueur();
            $niveauJoueur->setNiveau((new NiveauRepository(self::$db ))->findById($donnees['niveau_id']));
            $niveauJoueur->setJoueur((new JoueurRepository(self::$db ))->findById($donnees['joueur_id']));
            $niveauJoueur->setDeplacement($donnees['deplacement']);
            $niveauJoueur->setTemps($donnees['temps']);

            $niveauJoueurList[] = $niveauJoueur;
        }
        $req->closeCursor();
        return $niveauJoueurList;
    }

    public function findByNiveauAndJoueur(Niveau $niveau, Joueur $joueur): NiveauJoueur
    {
        $rep = false;
        $niveau_id = $niveau->getId();
        $joueur_id = $joueur->getId();
        $niveauJoueur = new NiveauJoueur();
        if ($niveau_id && $joueur_id) {
            $req = self::$db->query("SELECT * FROM hanoi_rel_niveau_joueur 
                                        WHERE niveau_id = $niveau_id AND joueur_id = $joueur_id;");
            while ($donnees = $req->fetch()) {
                $niveauJoueur->setNiveau((new NiveauRepository(self::$db ))->findById($donnees['niveau_id']));
                $niveauJoueur->setJoueur((new JoueurRepository(self::$db ))->findById($donnees['joueur_id']));
                $niveauJoueur->setDeplacement($donnees['deplacement']);
                $niveauJoueur->setTemps($donnees['temps']);
            }
            $req->closeCursor();
        }
        return $niveauJoueur;
    }

    public function findAll(): array
    {
        $niveauJoueurList = array();
        $req = self::$db->query("SELECT * FROM hanoi_rel_niveau_joueur");
        while ($donnees = $req->fetch()) {
            $niveauJoueur = new NiveauJoueur();
            $niveauJoueur->setNiveau((new NiveauRepository(self::$db ))->findById($donnees['niveau_id']));
            $niveauJoueur->setJoueur((new JoueurRepository(self::$db ))->findById($donnees['joueur_id']));
            $niveauJoueur->setDeplacement($donnees['deplacement']);
            $niveauJoueur->setTemps($donnees['temps']);

            $niveauJoueurList[] = $niveauJoueur;
        }
        $req->closeCursor();
        return $niveauJoueurList;
    }

}
