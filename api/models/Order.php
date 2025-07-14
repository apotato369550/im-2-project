<?php

class Order{
    public function fetchList() {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM orders");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function viewOrders(string $userId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare(
            "SELECT * 
            FROM orders
            WHERE client_id = :userId");
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
}