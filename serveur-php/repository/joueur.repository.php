<?php
include_once('../domaines/Joueur.php');

class JoueurRepository {
    /**
     * @param mixed $joueur
     */
    public function save(Joueur $joueur) {
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
