<?php
class ConnectionDB {
    public static $db;
    public function __construct() {}

    /**
     * @return PDO|null
     */
    public static function getDb(): PDO
    {
        try {
            self::$db = new PDO('mysql:host=localhost;dbname=hanoi_db', 'root', '',
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        }
        catch(Exception $e) {
            self::$db = null;
            die('Erreur : '.$e->getMessage());
        }
        return self::$db;
    }
}
