<?php
include_once('../domains/Joueur.php');
include_once('../connection-db/con_db.php');
include_once('../services/sendEmail.php');

class LogsRepository {
    private static $db;
    public function __construct() {
        self::$db = ConnectionDB::getDb();
    }

    public static function save(Logs $log): bool
    {
        self::$db = ConnectionDB::getDb();
        $log->setId(null);
        $req = self::$db->prepare('
            INSERT INTO hanoi_logs(joueur_id, information, cree_le) 
            VALUES(:joueur_id, :information, :cree_le)');
        $req->execute(array(
            'joueur_id' => $log->getJoueurId(),
            'information' => $log->getInformation(),
            'cree_le' => $log->getCreeLe()
        ));

        return true;
    }
}
