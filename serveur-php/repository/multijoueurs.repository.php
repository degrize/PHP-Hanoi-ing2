<?php
include_once('../domains/Multijoueurs.php');

class MultijoueursRepository {
    private static $db;
    public function __construct($pdo_db) {
        self::$db = $pdo_db;
    }

    public function save(Multijoueurs $multijoueurs): bool {
        $multijoueurs->setCreeLe(date("Y-m-d H:i:s")); // today
        $req = self::$db->prepare('
            INSERT INTO hanoi_multijoueurs(
                niveau_id, joueur_id, nom_salle, cle_salle, nbre_joueur, cree_le) 
            VALUES(:niveau_id, :joueur_id, :nom_salle, :cle_salle, :nbre_joueur, :cree_le)');
        $req->execute(array(
            'niveau_id' => $multijoueurs->getNiveau()->getId(),
            'joueur_id' => $multijoueurs->getJoueur()->getId(),
            'nom_salle' => $multijoueurs->getNomSalle(),
            'cle_salle' => $multijoueurs->getCleSalle(),
            'nbre_joueur' => $multijoueurs->getNbreJoueur(),
            'cree_le' => $multijoueurs->getCreeLe()
        ));

        return true;
    }


    public function findAll(): array
    {
        $multijoueursList = array();
        echo 'multijoueurSalle = [];';
        $req = self::$db->query("SELECT * FROM hanoi_multijoueurs ORDER BY id DESC");
        while ($donnees = $req->fetch()) {
            $multijoueurs = new Multijoueurs();
            $multijoueurs->setId($donnees['id']);
            $multijoueurs->setNomSalle($donnees['nom_salle']);
            $multijoueurs->setNbreJoueur($donnees['nbre_joueur']);
            $multijoueurs->setCleSalle($donnees['cle_salle']);
            $multijoueurs->setCreeLe($donnees['cree_le']);
            $multijoueurs->setVictoire($donnees['victoire']);

            echo 'multijoueurSalle.push('. $multijoueurs .');';
            $multijoueursList[] = $multijoueurs;
        }
        $req->closeCursor();
        return $multijoueursList;
    }

    public function checkIfGameFinish(Multijoueurs $multijoueurs): bool
    {
        $rep = false;
        $req = self::$db->query("SELECT victoire FROM hanoi_multijoueurs WHERE id = " . $multijoueurs->getId());
        while ($donnees = $req->fetch()) {
            if ( (int)$donnees['victoire'] == 1) {
                $rep = true;
            }
        }

        return $rep;
    }

    public function fermeMultijoueur(Multijoueurs $multijoueurs): bool {
        $rep = false;
        if ($multijoueurs->getId() != null) {
            $req = self::$db->prepare('
            UPDATE hanoi_joueur SET victoire = :victoire WHERE id = :id');
            $req->execute(array(
                'victoire' => 1,
                'id' => $multijoueurs->getId()
            ));
            $rep = true;
        }
        return $rep;
    }
}
