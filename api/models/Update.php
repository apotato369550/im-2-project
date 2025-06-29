<?php

class Update{
    public function saveNewUpdate($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            INSERT INTO updates (worker_id,  assignment_id, date_last_update, update_message)
            VALUES (:workerId, :assignmentId, CURDATE(), :updateMessage)
        ');
        $result = $stmt->execute([
            'workerId' => $data['worker_id'],
            'assignmentId' => $data['assignment_id'],
            'updateMessage' => $data['message'],
        ]);

        return $result ?: null;
    }

    public function renderUpdates($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            SELECT *
            FROM updates
        ');
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;;
    }
}