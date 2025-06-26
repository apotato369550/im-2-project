<?php

class Order{
    public function viewOrders(string $userId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM orders WHERE client_id = :userId");
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
            INSERT INTO orders(client_id, manager_id, concern, order_status)
            VALUES(:clientId, 1, :concern, :orderStatus) 
        ");
        $success = $stmt->execute([
            'clientId' => $data['client_id'],
            'concern' => $data['concern'],
            'orderStatus' => $data['order_status']
        ]);

        return $success ?: null;
    }


    //debatable cause they can change the order_status but not the concern
    public function editOrder($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            UPDATE orders
            SET concern = :concern, order_status = :orderStatus
            WHERE order_id = :orderId
        ");
        $success = $stmt->execute([
            "concern" => $data['concern'],
            "orderStatus" => $data['order_status'],
            "orderId" => $data['order_id']
        ]);

        return $success ?: null;
    }

}