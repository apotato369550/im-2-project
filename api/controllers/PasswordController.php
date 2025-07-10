<?php

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

Class PasswordController{
    // public function forgetPassword(){
    //     $data = json_decode(file_get_contents("php://input"), true);
    //     MissingRequiredFields::checkMissingFields($data, [
    //         "user_email"
    //     ]); 

    //     $password = new Password();
    //     $exists = $password->verifyEmail($data);
    //     if($exists['found'] === 0){
    //         ErrorHelper::sendError(401, "Email Does Not Exist");
    //     }
    //     $payload = [
    //         "user_id" => $exists['user_id'],
    //         "exp" => time() + 300
    //     ];
    //     $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');
    //     $newToken = $password->storeDBToken($jwt);
    
    //     //phpMailer here later


    // }

    // public function verifyDBToken($token){
    //     $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
    //     if(!$decoded){
    //         ErrorHelper::sendError(401, "Token is invalid or has expired");
    //     }
    //     echo json_encode([
    //         "message" => "Verification Successful",
    //         "verified" => 1
    //     ]);
    // }

    // public function newPassword($token){
    //     $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
    //     if(!$decoded){
    //         ErrorHelper::sendError(401, "Token is invalid or has expired");
    //     }

    //     $data = json_decode(file_get_contents('php://input'));
    //     MissingRequiredFields::checkMissingFields($data, [
    //         "password"
    //     ]);

    //     $data['user_id'] = $decoded->user_id;
    //     $password = new Password();
    //     $newPass = $password->changePassword($data);

    //     if(!$newPass){
    //         ErrorHelper::sendError(401, "Something Went Wrong");
    //     }

    //     echo json_encode([
    //         "message" => "Passsword updated succcessfully"
    //     ]);
        
    // }



}