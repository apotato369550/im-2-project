<?php

declare(strict_types=1);

spl_autoload_register(function ($class) {
    $paths = [
        __DIR__ . '/../models/',
        __DIR__ . '/../controllers/',
        __DIR__ . '/../middlewares/',
        __DIR__ . '/../helpers/',
    ];

    foreach($paths as $path){
        $file = $path . $class . '.php';
        if(file_exists($file)){
            require_once $file;
            return;
        }
    }
});

$db = new Database();
$conn = $db->getConnection();
set_exception_handler("ErrorHandler::handleException");


// set_error_handler("ErrorHandler::handleError");

