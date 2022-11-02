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
        // chaîne JSON des attributs
        return \json_encode($attributes, JSON_UNESCAPED_UNICODE);
    }

    public function getAttributes() {
        return \get_object_vars($this);
    }

    private function getRecursiveAttributes(array &$attributes, $value, $keys)
    {
        // analyse de la valeur [$value]
        // $keys est un tableau [key1, key2, .., keyn]
        // $value=$attributes[key1][key2]….[keyn]
        // si [$value] est un objet on utilise sa méthode [getAttributes]
        if (\is_object($value)) {
            // attributs de l'objet [$value]
            $objectAttributes = $value->getAttributes();
            // que fait-on du résultat ?
            if ($keys) {
                // dans [$attributes], on va remplacer $value par le tableau de ses attributs
                // il faut construire l'élément $attributes[key1][key2]…[keyn]
                // où $keys est le tableau [key1, key2, .., keyn]
                // on prend la référence du tableau [$attributes]
                $attribute = &$attributes;
                // on scanne le tableau des clés
                foreach ($keys as $key) {
                    // on prend la référence de l'attribut
                    $attribute = &$attribute[$key];
                }
                // ici $attribut et $attributes[key1][key2]…[key(n)] sont identiques
                // ils partagent le même emplacement mémoire
                // l'objet [$value] est remplacé par son tableau d'attributs;
                // il faut écrire $attributes[key1][key2]…[keyn]=$objectAttributes
                // ce qui équivaut à $attribute = $objectAttributes
                $attribute = $objectAttributes;
            } else {
                // pas de clés - on est au début de l'exploration de l'objet
                // $objectAttributes représente les attributs de 1er niveau de la classe
                $attributes += $objectAttributes;
            }
            // peut-être que dans [$objectAttributes] il y a encore des objets
            // on explore les attributs de [$objectAttributes]
            $this->getRecursiveAttributes($attributes, $objectAttributes, $keys);
        } else {
            if (\is_array($value)) {
                // on a un tableau - on analyse chacun de ses éléments
                foreach ($value as $key => $élément) {
                    // on rajoute la clé courante au tableau $keys
                    \array_push($keys, $key);
                    // on analyse $élément
                    $this->getRecursiveAttributes($attributes, $élément, $keys);
                    // on enlève du tableau $keys la clé qui vient d'être analysée
                    \array_pop($keys);
                }
            }
        }
    }


}

