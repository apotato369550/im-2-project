<?php

class Assignment{

    public function fetchList() {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            "SELECT a.assignment_id,
                    a.assignment_details,
                    a.assignment_status,
                    a.assignment_due,
                    a.assignment_date_created,
                    s.service_type as service_name,
                    o.address as location
             FROM assignments a
             JOIN service s ON a.service_id = s.service_id
             JOIN orders o ON o.order_id = a.order_id
             WHERE a.is_removed <> :isRemoved");
        $stmt->execute([
            "isRemoved" => 1
        ]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        return  $result;
    }

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
            INSERT INTO assignments(service_id, order_id, assignment_details, assignment_status, assignment_due, assignment_date_created)
            VALUES(:service_id, :order_id, :assignmentDetails, :assignmentStatus, :assignmentDue, CURDATE());
        ");

        $success = $stmt->execute([
            'service_id' => $data['service_id'],
            'order_id' => $data['order_id'],
            'assignmentDetails' => $data['assignment_details'],
            'assignmentStatus' => 'Pending',
            'assignmentDue' => $data['assignment_due'],
        ]);
    
        $stmt = $db->prepare('UPDATE orders SET order_status = ? WHERE order_id = ?');
        $stmt->execute(["Assignment Created", $data['order_id']]);

        return $success ?: null;
    }

    public function acceptAssignment($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            UPDATE assignments
            SET worker_id = :workerId, assignment_status = 'ONGOING'
            WHERE assignment_id = :assignmentId
        ");
        $success = $stmt->execute([
            'workerId' => $data['worker_id'],
            'assignmentId'=> $data['assignment_id']
        ]);

        return $success ?: null;
    }
    
    public function editAssignmentStatus($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            UPDATE assignments
            SET assignment_status = :assignment_status
            WHERE assignment_id = :assignment_id
        ");
        $success = $stmt->execute([
            'assignment_status' => $data['assignment_status'],
            'assignment_id' => $data['assignment_id']
        ]);
        return $success ?: null;
    }

    public function orderExist($orderId){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            SELECT *
            FROM assignments
            WHERE order_id = :orderId
        ');
        $stmt->execute([
            "orderID" => $orderId
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function deleteAssignment($assigmentId){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            'UPDATE assignments
             SET is_removed = 1
            WHERE assignment_id = :assignmentId');
        $result = $stmt->execute([
            "assignmentId" => $assigmentId
        ]);
        
        return $result;
    }
    
}