<?php

class Logs {
    private $id;
    private $joueur_id;
    private $information;
    private $cree_le;

    public function __construct($joueur_id, $information) {
        $this->joueur_id = $joueur_id;
        $this->information = $information;
        $this->cree_le = date("Y-m-d H:i:s"); // today
        // 2001-03-10 17:16:18 (le format DATETIME de MySQL)
    }

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
     * @return int
     */
    public function getJoueurId(): int {
        return $this->joueur_id;
    }

    /**
     * @param mixed $joueur_id
     */
    public function setJoueurId($joueur_id)
    {
        $this->joueur_id = $joueur_id;
    }

    /**
     * @return mixed
     */
    public function getInformation()
    {
        return $this->information;
    }

    /**
     * @param mixed $information
     */
    public function setInformation($information)
    {
        $this->information = $information;
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
        // chaîne JSON des attributs
        return \json_encode($attributes, JSON_UNESCAPED_UNICODE);
    }

    public function getAttributes(): array {
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

