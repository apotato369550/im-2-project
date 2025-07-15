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

    public function findEmail(string $email) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM users WHERE user_email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ?: null;
    }

    public function saveImagePath($userId, $imagePath) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("UPDATE users SET image_path = :image_path WHERE user_id = :user_id");
        return $stmt->execute([
            'image_path' => $imagePath,
            'user_id' => $userId
        ]);
    }

    public function registerNewAccount(array $account) : bool
    {
        $db = DBHelper::getConnection();
        $hashPassword = password_hash($account['user_password'], PASSWORD_DEFAULT);
        $stmt = $db->prepare('INSERT INTO users(user_full_name, user_email, user_password, user_type) VALUES(:name, :email, :password, :type)');
        $success = $stmt->execute([
            'name' => $account['user_full_name'],
            'email' => $account['user_email'],
            'password' => $hashPassword,
            'type' => $account['user_type']
        ]);

        return $success ?: null;
    }

    
    public function viewProfile(string $email) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM users WHERE user_email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ?: null;
    }
    
    public function viewQuotations(string $userId) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT q.* FROM quotation 
        INNER JOIN order o ON q.order_id = o.order_id
        WHERE o.client_id = :userId");
        $stmt->execute(['userId' => $userId]);
        $quotations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $quotations;
    }

    public function fetchAllUser(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            SELECT  u.*,
                    COALESCE(SUM(q.total_payment), 0) as total_spent,
                    COUNT(o.order_id) as order_count
            FROM users u
            LEFT JOIN orders o ON u.user_id = o.client_id
            LEFT JOIN quotation q ON q.order_id = o.order_id AND q.quotation_status = "Approved"
            WHERE u.user_id <> 1
            GROUP BY u.user_id
            ORDER BY total_spent;
        ');
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

        foreach($users as &$user){
            unset($user['user_password']);
        }

        return $users;
    }

}
