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


/**************************************************************************
 *                          USER    ROUTES
 *************************************************************************/
/**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/user/profile', 'UserController@profile');
$router->get('/im-2-project/api/user/quotations', 'UserController@quotations');


/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/user/login', 'UserController@login');
$router->post('/im-2-project/api/user/register', 'UserController@register');






/**************************************************************************
 *                          ASSIGNMENT    ROUTES
 *************************************************************************/

/**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/assignment', 'AssignmentController@viewAssignments');
$router->get('/im-2-project/api/assignment/{id}', 'AssignmentController@viewAssignment');


/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/assignment/create', 'AssignmentController@createAssignment');


/**********************************
 *          PUT ENDPOINTS
 *********************************/
$router->put('/im-2-project/api/assignment/accept/{id}', 'AssignmentController@acceptAssignment');


/**************************************************************************
 *                          ORDER    ROUTES
 *************************************************************************/

/**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/orders', 'OrderController@viewOrders');
$router->get('/im-2-project/api/orders/{id}', 'OrderController@findOrder');

/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/orders/create', 'OrderController@createOrder');



$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);



