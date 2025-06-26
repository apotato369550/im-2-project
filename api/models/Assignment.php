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
    
    public function findAssignment($id)
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
        SELECT * FROM assignments WHERE assignment_id = :id
        ");
        $stmt->execute(['id'=> $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function createAssignment($data){
        $db = DBHELPER::getConnection();
        $stmt = $db->prepare("
            INSERT INTO assignments(service_id, order_id, assignment_details, asssignment_status)
            VALUES(:service_id, :order_id, :assignment_details, :assignment_status) 
        ");

        $success = $stmt->execute([
            'service_id' => $data['service_id'],
            'order_id' => $data['order_id'],
            'assignment_details' => $data['assignment_details'],
            'assignnment_stats' => 'Pending'
        ]);

        return $success ?: null;
    }
}