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
        $stmt = $db->prepare('INSERT INTO users(user_name, user_email, user_password, user_type) VALUES(:name, :email, :password, :type)');
        $success = $stmt->execute([
            'name' => $account['user_name'],
            'email' => $account['user_email'],
            'password' => $account['user_password'],
            'type' => $account['user_type']
        ]);

        return $success ?: null;
    } 
}
