<?php

declare(strict_types=1);
require __DIR__ . '/config/config.php';
require __DIR__ . '/config/autoloader.php';

header("Content-type: application/json; charset=UTF-8");

set_exception_handler("ErrorHandler::handleException");


//list of routes depending on what endpoint is needed stephencurry

$router = new Router();

$router->post('/im-2-project/api/user/login', 'UserController@login');
$router->post('/im-2-project/api/user/register', 'UserController@register');


$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);



