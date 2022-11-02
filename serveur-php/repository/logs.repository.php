<?php

class LogsRepository {
    private static $db;
    public function __construct($pdo_db) {
        self::$db = $pdo_db;
    }

    public function save(Logs $log): bool
    {
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
