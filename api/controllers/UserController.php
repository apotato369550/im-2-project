<?php

class UserController{
    public function login()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if(empty(trim($data['user_email'])) || empty(trim($data['user_password']))){
            ErrorHelper::sendError(400, "Email and password are required");
            return;
        }

        $user = new User();
        $existingUser = $user->loginRequest($data['user_email']);

        if($existingUser && $data['user_password'] === $existingUser['user_password']){
            $token = bin2hex(random_bytes(16));
            echo json_encode([
                "message" => 'Login successful',
                "token" => $token
            ]);
        }else{
            ErrorHelper::sendError(401, "Invalid email or password");
        }
        
    }

    public function register()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if(empty(trim($data['user_email'])) || empty(trim($data['user_password'])) || empty(trim($data['user_name'])) || empty(trim($data['user_type']))){
            ErrorHelper::sendError(400, "Missing some required fields");
            return;
        }

        $user = new User();
        $newAccount = $user->registerNewAccount($data);
        
        if($newAccount){
            echo json_encode([
                'message' => 'Registered account successfully'
            ]);
        }else{
            ErrorHelper::sendError(400, "Failed to register account");
        }
        
    }
}