<?php

declare(strict_types=1);
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/autoloader.php';
require_once __DIR__ . '/../vendor/autoload.php';

header("Content-type: application/json; charset=UTF-8");

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");


//list of routes depending on what endpoint is needed stephencurry

$router = new Router();


//user routes
$router->post('/im-2-project/api/user/login', 'UserController@login');
$router->post('/im-2-project/api/user/register', 'UserController@register');

$router->get('/im-2-project/api/user/profile', 'UserController@profile');
$router->get('/im-2-project/api/user/quotations', 'UserController@quotations');
$router->get('/im-2-project/api/user/assignments', 'UserController@assignments');
$router->get('/im-2-project/api/user/orders', 'UserController@orders');


$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);



