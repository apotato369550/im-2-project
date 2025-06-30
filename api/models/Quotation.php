<?php

Class Quotation{
    // Fetch all quotations (for manager)
    public function fetchList() {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM quotation");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createQuotation($data) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            INSERT INTO quotation (total_payment, description, order_id)
            VALUES (:total_payment, :description, :order_id)
        ");
        $success = $stmt->execute([
            'total_payment' => $data['total_payment'],
            'description' => $data['description'],
            'order_id' => $data['order_id']
        ]);
        return $success ? $db->lastInsertId() : null;
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
            WHERE o.client_id = :user_id
        ");
        $stmt->execute(['user_id' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function deleteQuotation($quotationId) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("DELETE FROM quotation WHERE quotation_id = :quotation_id");
        $success = $stmt->execute(['quotation_id' => $quotationId]);
        return $success;
    }
}