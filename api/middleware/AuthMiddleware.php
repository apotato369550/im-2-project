<?php

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

class AuthMiddleware{
    public static function verifyToken(){
        $header = getallheaders();

        if(!isset($header['Authorization'])){
            ErrorHelper::sendError(401, "Authorization header missing");
        }

        $authHeader = $header['Authorization'] ?? ' ';

        list($type, $token) = explode(" ", $authHeader, 2);

        if($type !== 'Bearer' || !$token){
            ErrorHelper::sendError(401, "Invalid Authorization Header");
        }

        try{
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            return $decoded;
        }catch(Exception $e){
            ErrorHelper::sendError(401, "Invalid or expired token");
        }

    }

}