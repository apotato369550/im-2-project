<?php

class Assignment{
    public function viewAssignments(string $userId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            SELECT a.* 
            FROM assignments a
            INNER JOIN orders o ON a.order_id = o.order_id
            WHERE o.client_id = :client_id AND o.order_id IS NOT NULL
        ");
        $stmt->execute(['client_id' => $userId]);
        $assignments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $assignments ?: [];
    }
    
    public function findAssignment($id){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
        SELECT * FROM assignments WHERE assignment_id = :id
        ");
        $stmt->execute(['id'=> $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
}