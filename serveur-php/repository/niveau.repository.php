<?php
include_once('../domains/Joueur.php');
include_once('../domains/Niveau.php');
include_once('../repository/joueur.repository.php');
include_once('../connection-db/con_db.php');

class NiveauRepository {
    private static $db;
    public function __construct($pdo_db) {
        self::$db = $pdo_db;
    }
    public function save(Niveau $niveau): bool
    {
        $niveau->setId(null);
        $req = self::$db->prepare('
            INSERT INTO hanoi_niveau(
                titre, description, deplacement_max, temps_max, nbre_disque, gain) 
            VALUES(:titre, :description, :deplacement_max, :temps_max, :nbre_disque, :gain)');
        $req->execute(array(
            'titre' => $niveau->getTitre(),
            'description' => $niveau->getDescription(),
            'deplacement_max' => $niveau->getDeplacementMax(),
            'temps_max' => $niveau->getTempsMax(),
            'nbre_disque' => $niveau->getNbreDisque(),
            'gain' => $niveau->getGain()
        ));

        return true;
    }

    public function edit(Niveau $niveau): string
    {
        $rep = false;
        if ($niveau->getId()) {
            $req = self::$db->prepare('
            UPDATE hanoi_niveau SET 
                titre = :titre, description = :description, deplacement_max = :deplacement_max,
                temps_max = :temps_max, nbre_disque = :nbre_disque, gain = :gain  
            WHERE id = :id');
            $req->execute(array(
                'titre' => $niveau->getTitre(),
                'description' => $niveau->getDescription(),
                'deplacement_max' => $niveau->getDeplacementMax(),
                'temps_max' => $niveau->getTempsMax(),
                'nbre_disque' => $niveau->getNbreDisque(),
                'gain' => $niveau->getGain(),
                'id' => $niveau->getId(),
            ));
            $rep = true;
        }
        return $rep;
    }

    public function delete(Niveau $niveau): string {
        $rep = false;
        if ($niveau->getId()) {
            $req = self::$db->prepare('DELETE FROM hanoi_niveau WHERE id = :id');
            $req->execute(array(
                'id' => $niveau->getId(),
            ));
            $rep = true;
        }
        return $rep;
    }

    public function findById($id): Niveau
    {
        $niveau = new Niveau();
        $req = self::$db->query("SELECT * FROM hanoi_niveau where id =" . $id);
        while ($donnees = $req->fetch()) {
            $niveau->setId($donnees['id']);
            $niveau->setTitre($donnees['titre']);
            $niveau->setDescription($donnees['description']);
            $niveau->setDeplacementMax($donnees['deplacement_max']);
            $niveau->setTempsMax($donnees['temps_max']);
            $niveau->setNbreDisque($donnees['nbre_disque']);
            $niveau->setGain($donnees['gain']);
            // A ne pas decommenter!
            //$niveau->setJoueurs($this->findAllJoueurByNiveauId($niveau->getId()));
        }
        $req->closeCursor();
        return $niveau;
    }

    public function findByNbreDisque($nbreDisque): Niveau
    {
        $niveau = new Niveau();
        $req = self::$db->query("SELECT * FROM hanoi_niveau where nbre_disque =" . $nbreDisque);
        while ($donnees = $req->fetch()) {
            $niveau->setId($donnees['id']);
            $niveau->setTitre($donnees['titre']);
            $niveau->setDescription($donnees['description']);
            $niveau->setDeplacementMax($donnees['deplacement_max']);
            $niveau->setTempsMax($donnees['temps_max']);
            $niveau->setNbreDisque($donnees['nbre_disque']);
            $niveau->setGain($donnees['gain']);
            // A ne pas decommenter!
            //$niveau->setJoueurs($this->findAllJoueurByNiveauId($niveau->getId()));
        }
        $req->closeCursor();
        return $niveau;
    }

    public function findAll(): array
    {
        $niveauList = array();

        $req = self::$db->query("SELECT * FROM hanoi_niveau");
        while ($donnees = $req->fetch()) {
            $niveau = new Niveau();
            $niveau->setId($donnees['id']);
            $niveau->setTitre($donnees['titre']);
            $niveau->setDescription($donnees['description']);
            $niveau->setDeplacementMax($donnees['deplacement_max']);
            $niveau->setTempsMax($donnees['temps_max']);
            $niveau->setNbreDisque($donnees['nbre_disque']);
            $niveau->setGain($donnees['gain']);

            echo 'findAllNiveau(' . $niveau . ');';
           // $niveau->setJoueurs($this->findAllJoueurByNiveauId($niveau->getId()));

            $niveauList[] = $niveau;
        }
        $req->closeCursor();
        return $niveauList;
    }

    public function findAllJoueurByNiveauId($niveau_id): array
    {
        $joueursList = array();
        if ($niveau_id) {
            $req = self::$db->query("SELECT joueur_id FROM hanoi_rel_niveau_joueur where niveau_id = $niveau_id");
            while ($donnees = $req->fetch()) {
                $joueur = (new JoueurRepository(self::$db))->findById($donnees['joueur_id']);
                $joueursList[] = $joueur;
            }
            $req->closeCursor();
        }
        return $joueursList;
    }

}
