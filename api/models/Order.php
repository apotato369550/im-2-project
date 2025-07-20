<?php

class Order{
    public function fetchList() {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
        "SELECT o.order_id,
                o.concern,
                o.order_status,
                o.phone_number,
                o.address,
                o.order_date_created,
                u.user_id,
                u.user_full_name,
                u.user_email, 
                s.service_id,
                s.service_type, 
                s.service_details, 
                i.item_id,
                i.model,
                i.type,
                i.inverter,
                i.brand, 
                q.total_payment,
                o.is_removed
            FROM orders o 
            JOIN users u ON o.client_id = u.user_id
            JOIN service s ON o.service_id = s.service_id
            LEFT JOIN items i ON i.item_id = o.item_id
            LEFT JOIN quotation q ON q.order_id = o.order_id
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function viewOrders(string $userId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            "SELECT 
                o.*,
                s.*,
                q.quotation_id,
                q.total_payment,
                -- Don't select q.order_id since it conflicts
                a.assignment_id
            FROM orders o 
            LEFT JOIN quotation q ON q.order_id = o.order_id
            LEFT JOIN assignments a ON a.order_id = o.order_id
            LEFT JOIN service s ON o.service_id = s.service_id
            WHERE o.client_id = :userId
            GROUP BY o.order_id");
        $stmt->execute(['userId' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: null;
    }

    public function viewOrder($id){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM orders WHERE order_id = :orderId");
        $stmt->execute(['orderId' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
    
    public function createOrder($data) : bool
    {
        $db = DBHELPER::getConnection();
        
        $stmt = $db->prepare("
            INSERT INTO orders(client_id, manager_id, concern, order_status, phone_number, address, service_id, item_id, order_date_created)
            VALUES(:clientId, 1, :concern, :orderStatus, :phoneNumber, :address, :serviceId, :item_id, CURDATE()); 
        ");
        $success = $stmt->execute([
            'clientId' => $data['client_id'],
            'concern' => $data['concern'],
            'orderStatus' => 'Pending',
            'phoneNumber' => $data['phone_number'],
            'address' => $data['address'],
            'serviceId' => $data['service_id'],
            'item_id' => isset($data['item_id']) ? $data['item_id'] : NULL
        ]);

        return $success ?: null;
    }

    public function editOrder($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            UPDATE orders
            SET order_status = :orderStatus
            WHERE order_id = :orderId
        ");
        $success = $stmt->execute([
            "orderStatus" => $data['order_status'],
            "orderId" => $data['order_id']
        ]);

        return $success ?: null;
    }

    public function deleteOrder($orderId){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            'UPDATE orders
             SET is_removed = 1
             WHERE order_id = :orderId');
        $result = $stmt->execute([
            "orderId" => $orderId
        ]);

        return $result;
    }

}