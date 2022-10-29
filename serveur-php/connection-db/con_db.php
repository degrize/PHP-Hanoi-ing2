<?php
class ConnectionDB {
    public $db;
    public function __construct() {
        try {
            $this->db = new PDO('mysql:host=localhost;dbname=hanoi_db', 'root', '');
        }
        catch(Exception $e) {
            $this->db = null;
            die('Erreur : '.$e->getMessage());
        }
    }
}
