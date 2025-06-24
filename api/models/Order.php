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
}