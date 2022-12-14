<?php

class Multijoueurs {
    private $id;
    private $niveau;
    private $joueur;
    private $nom_salle;
    private $cle_salle;
    private $nbre_joueur;
    private $victoire;
    private $cree_le;

    /**
     * @return int
     */
    public function getId(): int
    {
        return (int) $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return Niveau
     */
    public function getNiveau(): Niveau
    {
        return $this->niveau;
    }

    /**
     * @param mixed $niveau
     */
    public function setNiveau($niveau)
    {
        $this->niveau = $niveau;
    }

    /**
     * @return Joueur
     */
    public function getJoueur(): Joueur
    {
        return $this->joueur;
    }

    /**
     * @param mixed $joueur
     */
    public function setJoueur($joueur)
    {
        $this->joueur = $joueur;
    }

    /**
     * @return mixed
     */
    public function getNomSalle()
    {
        return $this->nom_salle;
    }

    /**
     * @param mixed $nom_salle
     */
    public function setNomSalle($nom_salle)
    {
        $this->nom_salle = $nom_salle;
    }

    /**
     * @return mixed
     */
    public function getCleSalle()
    {
        return $this->cle_salle;
    }

    /**
     * @param mixed $cle_salle
     */
    public function setCleSalle($cle_salle)
    {
        $this->cle_salle = $cle_salle;
    }

    /**
     * @return mixed
     */
    public function getNbreJoueur()
    {
        return $this->nbre_joueur;
    }

    /**
     * @param mixed $nbre_joueur
     */
    public function setNbreJoueur($nbre_joueur)
    {
        $this->nbre_joueur = $nbre_joueur;
    }

    /**
     * @return mixed
     */
    public function getVictoire()
    {
        return $this->victoire;
    }

    /**
     * @param mixed $victoire
     */
    public function setVictoire($victoire)
    {
        $this->victoire = $victoire;
    }


    /**
     * @return mixed
     */
    public function getCreeLe()
    {
        return $this->cree_le;
    }

    /**
     * @param mixed $cree_le
     */
    public function setCreeLe($cree_le)
    {
        $this->cree_le = $cree_le;
    }


    public function __toString()
    {
        $attributes = [];
        $this->getRecursiveAttributes($attributes, $this, []);
        // cha??ne JSON des attributs
        return \json_encode($attributes, JSON_UNESCAPED_UNICODE);
    }

    public function getAttributes() {
        return \get_object_vars($this);
    }

    private function getRecursiveAttributes(array &$attributes, $value, $keys)
    {
        // analyse de la valeur [$value]
        // $keys est un tableau [key1, key2, .., keyn]
        // $value=$attributes[key1][key2]???.[keyn]
        // si [$value] est un objet on utilise sa m??thode [getAttributes]
        if (\is_object($value)) {
            // attributs de l'objet [$value]
            $objectAttributes = $value->getAttributes();
            // que fait-on du r??sultat ?
            if ($keys) {
                // dans [$attributes], on va remplacer $value par le tableau de ses attributs
                // il faut construire l'??l??ment $attributes[key1][key2]???[keyn]
                // o?? $keys est le tableau [key1, key2, .., keyn]
                // on prend la r??f??rence du tableau [$attributes]
                $attribute = &$attributes;
                // on scanne le tableau des cl??s
                foreach ($keys as $key) {
                    // on prend la r??f??rence de l'attribut
                    $attribute = &$attribute[$key];
                }
                // ici $attribut et $attributes[key1][key2]???[key(n)] sont identiques
                // ils partagent le m??me emplacement m??moire
                // l'objet [$value] est remplac?? par son tableau d'attributs;
                // il faut ??crire $attributes[key1][key2]???[keyn]=$objectAttributes
                // ce qui ??quivaut ?? $attribute = $objectAttributes
                $attribute = $objectAttributes;
            } else {
                // pas de cl??s - on est au d??but de l'exploration de l'objet
                // $objectAttributes repr??sente les attributs de 1er niveau de la classe
                $attributes += $objectAttributes;
            }
            // peut-??tre que dans [$objectAttributes] il y a encore des objets
            // on explore les attributs de [$objectAttributes]
            $this->getRecursiveAttributes($attributes, $objectAttributes, $keys);
        } else {
            if (\is_array($value)) {
                // on a un tableau - on analyse chacun de ses ??l??ments
                foreach ($value as $key => $??l??ment) {
                    // on rajoute la cl?? courante au tableau $keys
                    \array_push($keys, $key);
                    // on analyse $??l??ment
                    $this->getRecursiveAttributes($attributes, $??l??ment, $keys);
                    // on enl??ve du tableau $keys la cl?? qui vient d'??tre analys??e
                    \array_pop($keys);
                }
            }
        }
    }


}

