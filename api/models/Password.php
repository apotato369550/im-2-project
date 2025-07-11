<?php 

Class Password{
    public function verifyEmail($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('SELECT * FROM users WHERE user_email = :userEmail');
        $stmt->execute([
            'userEmail' => $data['user_email']
        ]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if($result){
            $result['found'] = 1;
        }else{
            $result = ['found' => 0];
        }

        return $result;
    }

    public function storeDBToken($token, $user){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('INSERT INTO password_resets(user_id, token, expires_at)
        VALUES(:userID, :token, :expires_at)
        ');

        $expiresAt = date('Y-m-d H:i:s', time() + 300);
        $success = $stmt->execute([
            "userID" => $user['user_id'],
            "token" => $token,
            "expires_at" => $expiresAt, 
        ]);
        
        return $success;
    }

    public function changePassword($data){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('UPDATE users SET user_password = :newPassword WHERE user_id = :userID');
        $hashPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $success = $stmt->execute([
            "newPassword" => $hashPassword,
            "userID" => $data['user_id']
        ]);

        return $success;
    }


    public function isUsed($token){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("UPDATE password_resets SET used = 1 WHERE token = :token");
        $success = $stmt->execute(["token" => $token]);
        return $success;
    }

    public function checkTokenUsed($token) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT used FROM password_resets WHERE token = :token");
        $stmt->execute(['token' => $token]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result && $result['used'] == 1;
    }
}