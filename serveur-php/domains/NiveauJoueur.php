<?php
include_once('../domains/Joueur.php');
include_once('../domains/Niveau.php');

class NiveauJoueur {
    private $niveau;
    private $joueur;
    private $deplacement;
    private $temps;
    private $nbre_disque;

    /**
     * @return Niveau
     */
    public function getNiveau(): Niveau
    {
        return $this->niveau;
    }

    /**
     * @param Niveau $niveau
     */
    public function setNiveau(Niveau $niveau)
    {
        $this->niveau = $niveau;
    }

    /**
     * @return Joueur
     */
    public function getJoueur()
    {
        return $this->joueur;
    }

    /**
     * @param Joueur $joueur
     */
    public function setJoueur(Joueur $joueur)
    {
        $this->joueur = $joueur;
    }

    /**
     * @return mixed
     */
    public function getDeplacement()
    {
        return $this->deplacement;
    }

    /**
     * @param mixed $deplacement
     */
    public function setDeplacement($deplacement)
    {
        $this->deplacement = $deplacement;
    }

    /**
     * @return mixed
     */
    public function getTemps()
    {
        return $this->temps;
    }

    /**
     * @param mixed $temps
     */
    public function setTemps($temps)
    {
        $this->temps = $temps;
    }

    /**
     * @return int
     */
    public function getNbreDisque(): int
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

