<?php

Class User {

    public function loginRequest(string $email) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM users WHERE user_email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ?: null;
    }

    public function registerNewAccount(array $account) : bool
    {
        $db = DBHelper::getConnection();
        $hashPassword = password_hash($account['user_password'], PASSWORD_DEFAULT);
        $stmt = $db->prepare('INSERT INTO users(user_name, user_email, user_password, user_type) VALUES(:name, :email, :password, :type)');
        $success = $stmt->execute([
            'name' => $account['user_name'],
            'email' => $account['user_email'],
            'password' => $hashPassword,
            'type' => $account['user_type']
        ]);

        return $success ?: null;
    }

    /**
     * 
     * MADE SOME VIEW FUNCTIONS HERE FOR DATABASE
     *  
     */
    
    public function viewProfile(string $email) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM users WHERE user_email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        unset($user['user_password']);
        return $user ?: null;
    }

    public function viewOrders(string $userId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM orders WHERE client_id = :userId");
        $stmt->execute(['userId' => $userId]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $orders;
    }

    public function viewQuotations(array $orderId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM quotation WHERE order_id = :orderId");
        $stmt->execute(['orderId' => $orderId['order_id']]);
        $quotations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $quotations;
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
        $quotations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $quotations;
    }



}
