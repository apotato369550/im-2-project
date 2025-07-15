<?php

Class Quotation{
    public function fetchList() {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM quotation");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createQuotation($data) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            INSERT INTO quotation (total_payment, description, order_id, quotation_status)
            VALUES (:total_payment, :description, :order_id, 'Pending')
        ");
        $success = $stmt->execute([
            'total_payment' => $data['total_payment'],
            'description' => $data['description'],
            'order_id' => $data['order_id']
        ]);

        $stmt = $db->prepare("UPDATE orders SET order_status = :orderStatus WHERE order_id = :orderID");
        $stmt = $stmt->execute([
            'orderID' => $data["order_id"],
            'orderStatus' => "Quotation Pending"
        ]);

        return $success;
    }

    public function viewQuotationsByOrder($orderId) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM quotation WHERE order_id = :order_id");
        $stmt->execute(['order_id' => $orderId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function viewUserQuotations($userId) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            SELECT q.* FROM quotation q
            INNER JOIN orders o ON q.order_id = o.order_id
            WHERE o.client_id = :user_id AND quotation_status <> :quotationStatus
        ");
        $stmt->execute([
            'user_id' => $userId,
            'quotation_status' => 'Declined'
        ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function updateQuotationStatus($quotationId, $status, $orderId){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('UPDATE quotation
            SET quotation_status =  :quotationStatus
            WHERE quotation_id = :quotationId 
        ');
        $success = $stmt->execute([
            'quotationStatus' => $status,
            'quotationId' => $quotationId
        ]);


        //get orderId for this 
        if($status === "Accepted"){
            $stmt = $db->prepare('UPDATE orders SET order_status = :orderStatus WHERE order_id = :orderId');
            $stmt->execute([
                "orderStatus" => "Quotation Approved",
                "orderId" => $orderId
            ]);
        }

        return $success;
    }

    public function deleteQuotation($quotationId) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("DELETE FROM quotation WHERE quotation_id = :quotation_id");
        $success = $stmt->execute(['quotation_id' => $quotationId]);
        return $success;
    }
}