<?php

Class User {

    public function findByEmail(string $email) : ?array
    {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM users WHERE user_email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ?: null;
    }
}
