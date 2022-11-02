<?php
class ConnectionDB {
    public $db;
    public function __construct() {}

    /**
     * @return PDO|null
     */
    public function getDb(): PDO
    {
        try {
            $this->db = new PDO('mysql:host=localhost;dbname=hanoi_db', 'root', '',
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        }
        catch(Exception $e) {
            $this->db = null;
            die('Erreur : '.$e->getMessage());
        }
        return $this->db;
    }
}

$pdo = new ConnectionDB();
$pdo_db = $pdo->getDb();
