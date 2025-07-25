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
                    a.is_removed,
                    u.user_id as clientId,
                    u.user_full_name as clientName,
                    w.user_id as assignedWorkerId,
                    w.user_full_name as assignedWorker,
                    s.service_type as service_name,
                    o.address as Location,
                    o.order_id as orderId,
                    q.total_payment
             FROM assignments a
             JOIN orders o ON o.order_id = a.order_id
             JOIN service s ON o.service_id = s.service_id
             LEFT JOIN quotation q ON o.order_id = q.order_id
             LEFT JOIN users u ON u.user_id = o.client_id
             LEFT JOIN users w ON w.user_id = a.worker_id");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        return  $result;
    }

    public function getAvailableAssignments(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            SELECT a.assignment_id,
                    a.assignment_details,
                    a.assignment_status,
                    a.assignment_due,
                    a.assignment_date_created,
                    u.user_id as clientId,
                    u.user_full_name as clientName,
                    w.user_id as assignedWorkerId,
                    w.user_full_name as assignedWorker,
                    s.service_type as service_name,
                    o.address as Location,
                    q.total_payment
             FROM assignments a
             JOIN orders o ON o.order_id = a.order_id
             JOIN service s ON o.service_id = s.service_id
             LEFT JOIN quotation q ON o.order_id = q.order_id
             LEFT JOIN users u ON u.user_id = o.client_id
            WHERE worker_id IS NULL
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function viewAssignments($userId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            "SELECT a.assignment_id,
                    a.assignment_details as notes,
                    a.assignment_status,
                    a.assignment_due,
                    a.order_id,
                    o.address AS location,
                    o.phone_number AS clientNumber,
                    u.user_full_name AS clientName,
                    s.service_type AS serviceName,
                    COALESCE(q.total_payment, 0) as price
            FROM assignments a
            LEFT JOIN orders o ON a.order_id = o.order_id
            LEFT JOIN users u ON o.client_id = u.user_id
            LEFT JOIN service s ON o.service_id = s.service_id
            LEFT JOIN quotation q ON q.order_id = o.order_id
            WHERE a.worker_id = :workerId
            
        ");
        $stmt->execute(['workerId' => $userId]);
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
            INSERT INTO assignments(order_id, assignment_details, assignment_status, assignment_due, assignment_date_created)
            VALUES(:order_id, :assignmentDetails, :assignmentStatus, :assignmentDue, CURDATE());
        ");

        $success = $stmt->execute([
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
    
    public function editAssignment($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            UPDATE assignments
            SET assignment_status = :assignment_status, assignment_details = :assignmentDetails, assignment_due = :assignmentDue
            WHERE assignment_id = :assignment_id
        ");
        $success = $stmt->execute([
            'assignment_status' => $data['assignment_status'],
            'assignment_id' => $data['assignment_id'],
            'assignmentDue'=> $data['assignment_due'],
            'assignmentDetails' => $data['assignment_details']
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
            SELECT assignment_id, order_id, assignment_status
            FROM assignments
            WHERE order_id = :orderId
        ');
        $stmt->execute([
            "orderId" => $orderId
        ]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result === false ? null : $result; 
    }

    public function recentAssignments(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            'SELECT a.assignment_id,
                    a.assignment_details,
                    a.assignment_status,
                    a.assignment_due,
                    a.assignment_date_created,
                    u.user_id as clientId,
                    u.user_full_name as clientName,
                    s.service_type as service_name,
                    o.address as Location,
                    q.total_payment
             FROM assignments a
             JOIN orders o ON o.order_id = a.order_id
             JOIN service s ON o.service_id = s.service_id
             LEFT JOIN quotation q ON q.order_id = o.order_id
             LEFT JOIN users u ON u.user_id = o.client_id
             WHERE a.worker_id IS NULL AND assignment_date_created >= CURRENT_DATE - INTERVAL 7 DAY');
        $result = $stmt->execute();
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