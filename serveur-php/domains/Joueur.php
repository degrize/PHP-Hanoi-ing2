<?php

class Joueur {
    private $id;
    private $email;
    private $login;
    private $mot_de_passe;
    private $photo;
    private $est_suspendu;
    private $cree_le;
    private $modifie_le;

    /**
     * @return mixed
     */
    public function getId()
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
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * @param mixed $login
     */
    public function setLogin($login)
    {
        $this->login = $login;
    }

    /**
     * @return mixed
     */
    public function getMotDePasse()
    {
        return $this->mot_de_passe;
    }

    /**
     * @param mixed $mot_de_passe
     */
    public function setMotDePasse($mot_de_passe)
    {
        $this->mot_de_passe = $mot_de_passe;
    }

    /**
     * @return mixed
     */
    public function getPhoto()
    {
        return $this->photo;
    }

    /**
     * @param mixed $photo
     */
    public function setPhoto($photo)
    {
        $this->photo = $photo;
    }

    /**
     * @return mixed
     */
    public function getEstSuspendu()
    {
        return $this->est_suspendu;
    }

    /**
     * @param mixed $est_suspendu
     */
    public function setEstSuspendu($est_suspendu)
    {
        $this->est_suspendu = $est_suspendu;
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

    /**
     * @return mixed
     */
    public function getModifieLe()
    {
        return $this->modifie_le;
    }

    /**
     * @param mixed $modifie_le
     */
    public function setModifieLe($modifie_le)
    {
        $this->modifie_le = $modifie_le;
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

