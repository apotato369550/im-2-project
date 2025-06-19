<?php

Class ErrorHelper
{
    public static function sendError(int $statusCode, string $message) : void
    {
        http_response_code($statusCode);
        echo json_encode(["error" => $message]);
        exit;
    }
}