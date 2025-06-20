<?php

Class ErrorHelper
{
    public static function sendError(int $statusCode, string $message) : void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode(["error" => $message]);
        exit;
    }

    public static function notFound($message = 'Resource not found')
    {
        http_response_code(404);

        echo json_encode([
        'status' => '404',
        'message' => $message
        ]);

        exit;
    }

    public static function unauthorized($message = 'You are not authorized to view this resource')
    {
        http_response_code(403);

        echo_json_encode([
        'status' => '403',
        'message' => $message
        ]);

        exit;
    }
}