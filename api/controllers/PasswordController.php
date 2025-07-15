<?php

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

Class PasswordController{
    public function forgetPassword(){
        $data = json_decode(file_get_contents("php://input"), true);
        MissingRequiredFields::checkMissingFields($data, [
            "user_email"
        ]); 

        $password = new Password();
        $exists = $password->verifyEmail($data);
        if($exists['found'] === 0){
            ErrorHelper::sendError(401, "Email Does Not Exist");
        }
        $payload = [
            "user_id" => $exists['user_id'],
            "exp" => time() + 300
        ];
        $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');
        $newToken = $password->storeDBToken($jwt, $exists);
        
        $mail = new Mailer();
        $subject = "Cebu Best Value: Account Forget Password Link";
        $body = "Hi {$exists['user_full_name']},<br><br>" .
        "Click the link below to reset your password:<br>" .
        "<a href='http://localhost/password/changePassword?token={$jwt}'>Reset Password</a><br><br>" .
        "If you didn’t request this, please ignore this email.";

        if ($mail->send($exists['user_email'], $subject, $body)) {
            echo json_encode(["message" => "Password reset email sent"]);
        }else {
            ErrorHelper::sendError(500, "Failed to send email");
        }

    }   

    public function verifyDBToken() {
        $token = $_GET['token'];
        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));

            echo json_encode([
                "message" => "Verification Successful",
                "verified" => 1,
                "user_id" => $decoded->user_id ?? null
            ]);
        } catch (\Firebase\JWT\ExpiredException $e) {
            ErrorHelper::sendError(401, "Token has expired");
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            ErrorHelper::sendError(401, "Invalid token signature");
        } catch (\Exception $e) {
            ErrorHelper::sendError(401, "Invalid token");
        }
    }

     public function newPassword() {
        $decoded = AuthMiddleware::verifyToken();

        $data = json_decode(file_get_contents('php://input'), true);
        MissingRequiredFields::checkMissingFields($data, [
            "password"
        ]);

        $data['user_id'] = $decoded->user_id;

        $headers = getallheaders();
        $authHeader = $headers['Authorization'];
        list($type, $token) = explode(" ", $authHeader, 2);
        $password = new Password();
        if ($password->checkTokenUsed($token)) {
            ErrorHelper::sendError(401, "This token has already been used");
        }
        $newPass = $password->changePassword($data);

        if (!$newPass) {
            ErrorHelper::sendError(401, "Something went wrong");
        }

        // OPTIONAL: mark token as used here
        $password->isUsed($token);


        echo json_encode([
            "message" => "Password updated successfully"
        ]);
    }

}