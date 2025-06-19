<?php

declare(strict_types=1);
require __DIR__ . '/config/config.php';

header("Content-type: application/json; charset=UTF-8");

spl_autoload_register(function ($class) {
    $paths = [
        __DIR__ . '/models/',
        __DIR__ . '/controllers/',
        __DIR__ . '/middlewares/',
        __DIR__ . '/helpers/',
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

set_exception_handler("ErrorHandler::handleException");

$parts = explode("/", trim($_SERVER["REQUEST_URI"], "/"));
$endpoint = $parts[2] ?? null;
$id = $parts[3] ?? null;

//list of routes depending on what endpoint is needed stephencurry
$routes = [
    'assignments' => 'AssignmentsController',
    'user' => 'UserController' 
];




if(!array_key_exists($endpoint, $routes)){
    ErrorHelper::sendError(404, "Endpoint not Found");
}

$controllerClass = $routes[$endpoint];
if(!class_exists($controllerClass)){
    ErrorHelper::sendError(500, "Controller not Found");
}

$models = [
    'User'
];

$controller = new $controllerClass();
$controller->processRequest($_SERVER['REQUEST_METHOD'], $id);





// $db = new Database(DB_HOST, DB_NAME, DB_USER, DB_PASS);
// $conn = $db->getConnection();

