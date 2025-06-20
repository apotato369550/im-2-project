<?php

spl_autoload_register(function ($class) {
    $paths = [
        __DIR__ . '/../models/',
        __DIR__ . '/../controllers/',
        __DIR__ . '/../middlewares/',
        __DIR__ . '/../helpers/',
        __DIR__ . '/../core/'
    ];
    
    foreach($paths as $path){
        $file = $path . $class . '.php';
        if(file_exists($file)){
            require_once $file;
            return;
        }
    }

    error_log("Autoloader: Class '$class' not found.");
    ErrorHelper::sendError(500, "Class '$class' not found");
});