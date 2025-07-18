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
                "user_id" => $existingUser['user_id'],
                "user_full_name" => $existingUser['user_full_name'],
                "user_email"=> $existingUser['user_email'],
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


    //
    public function updateProfile($id){
    $decoded = AuthMiddleware::verifyToken();
    $email = $_POST['user_email'];
    $newName = $_POST['user_full_name'];
    $userModel = new User();

    $exist = $userModel->findEmail($email);
    if ($exist && $exist['user_id'] != $id) {
        ErrorHelper::sendError(409, 'Email already taken');
    }

    $currentUser = $userModel->findId($id);
    if (!$currentUser) {
        ErrorHelper::sendError(404, 'User not found');
    }

    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $image = new ImageController();
        $filename = $image->saveImage($currentUser); // use currentUser, not exist
        if (!$userModel->saveImagePath($currentUser['user_id'], 'uploads/' . $filename)) {
            ErrorHelper::sendError(500, 'Failed to update image path in database');
        }
    }

    // Update if values changed
    if ($currentUser['user_email'] !== $email || $currentUser['user_full_name'] !== $newName) {
        $data = [
            "user_full_name" => $newName,
            "user_email" => $email,
            "user_id" => $id // this was missing before
        ];
        if (!$userModel->updateProfileDetails($data)) {
            ErrorHelper::sendError(500, 'Failed to update profile details in database');
        }
    }

    echo json_encode(['message' => 'Profile Updated Sucessfully']);
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

    public function fetchAllUsers(){
        $decoded = AuthMiddleware::verifyToken();
        $user = new User();
        $userList = $user->fetchAllUser();
        if($userList){
            echo json_encode($userList);
        }else{
            ErrorHelper::sendError(401, "Bad Request");
        }
    }

    public function viewQuotations(){
        
    }
    

}