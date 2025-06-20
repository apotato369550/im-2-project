<?php

class UserController{
    public function login(){
        $data = json_decode(file_get_contents("php://input"), true);

        if(empty(trim($data['user_email'])) || empty(trim($data['user_password']))){
            ErrorHelper::sendError(400, "Email and password are required");
            return;
        }

        $user = new User();
        $existingUser = $user->findByEmail($data['user_email']);

        if($existingUser){
            print_r($existingUser['user_email']);
        }
        
    }
}