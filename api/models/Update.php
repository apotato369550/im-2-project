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

    public function renderUpdates(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            SELECT up.*, us.user_full_name
            FROM updates up
            JOIN users us ON us.user_id = up.worker_id
        ');
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;;
    }

    public function retrieveUserUpdates($client_id){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            SELECT u.*
            FROM updates u
            JOIN assignments a ON a.assignment_id = u.assignment_id
            JOIN orders o ON o.order_id = a.order_id
            WHERE o.client_id = :client_id
        ');
        $stmt->execute(['client_id' => $client_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function getRecentUpdates(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            'SELECT up.*, us.user_full_name
            FROM updates up
            JOIN users us ON us.user_id = up.worker_id
            WHERE date_last_update >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}

//check if update