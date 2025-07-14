<?php

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

class UserController{
    public function login() :void
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'user_email', 'user_password',
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

        $user = new User();
        $existingUser = $user->loginRequest($data['user_email']);

        if($existingUser && password_verify($data['user_password'], $existingUser['user_password'])){
            $payload = [
                "user_id" => $existingUser['user_id'],
                "user_email" => $existingUser['user_email'],
                "user_full_name" => $existingUser['user_full_name'],
                "user_type" => $existingUser['user_type'],
                "exp" => time() + 7200
            ];
            $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');
            echo json_encode([
                "message" => "Login successful",
                "user_full_name" => $existingUser['user_full_name'],
                "user_type" => $existingUser['user_type'],
                "token" => $jwt
            ]);
        }else{
            ErrorHelper::sendError(401, "Invalid email or password");
        }
        
    }

    public function register() :void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'user_email', 'user_password', 'user_full_name', 'user_type'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
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

    /*
    headers for profile must include the authorization header with value Bearer <token> to access protected routes
    */

    public function updateProfilePicture(){
        $decoded = AuthMiddleware::verifyToken();
        $email = $_POST['user_email'];
        $userModel = new User();
        $exist = $userModel->findEmail($email);
        if (!$exist) {
            ErrorHelper::sendError(404, 'Item not found');
        }

        $image = new ImageController();
        $filename = $image->saveImage($exist);


        if (!$userModel->saveImagePath($exist['user_id'], 'uploads/' . $filename)) {
            ErrorHelper::sendError(500, 'Failed to update image path in database');
        }

        echo json_encode(['message' => 'Image uploaded', 'image_path' => 'uploads/' . $filename]);
    }

    public function profile() : void
    {
        $decoded = AuthMiddleware::verifyToken();
        $user = new User();
        $profile = $user->viewProfile($decoded->user_email);
        if($profile){
            echo json_encode($profile);
        }else{
            ErrorHelper::sendError(404, "User not Found");
        }
    }
    

}