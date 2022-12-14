<?php

class Niveau {
    private $id;
    private $titre;
    private $description;
    private $deplacement_max;
    private $temps_max;
    private $nbre_disque;
    private $gain;
    private $joueurs; // la relation entre Niveau et joueur

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * @param mixed $titre
     */
    public function setTitre($titre)
    {
        $this->titre = $titre;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getDeplacementMax()
    {
        return $this->deplacement_max;
    }

    /**
     * @param mixed $deplacement_max
     */
    public function setDeplacementMax($deplacement_max)
    {
        $this->deplacement_max = $deplacement_max;
    }

    /**
     * @return mixed
     */
    public function getTempsMax()
    {
        return $this->temps_max;
    }

    /**
     * @param mixed $temps_max
     */
    public function setTempsMax($temps_max)
    {
        $this->temps_max = $temps_max;
    }

    /**
     * @return mixed
     */
    public function getNbreDisque()
    {
        return $this->nbre_disque;
    }

    /**
     * @param mixed $nbre_disque
     */
    public function setNbreDisque($nbre_disque)
    {
        $this->nbre_disque = $nbre_disque;
    }

    /**
     * @return double
     */
    public function getGain(): float
    {
        return $this->gain;
    }

    /**
     * @param mixed $gain
     */
    public function setGain($gain)
    {
        $this->gain = $gain;
    }

    /**
     * @return array
     */
    public function getJoueurs(): array
    {
        return $this->joueurs;
    }

    /**
     * @param mixed $joueurs
     */
    public function setJoueurs(array $joueurs)
    {
        $this->joueurs = $joueurs;
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

