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
$router->get('/im-2-project/api/assignments', 'AssignmentController@viewAssignments');
$router->get('/im-2-project/api/assignments/{id}', 'AssignmentController@viewAssignment');


/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/assignments/create', 'AssignmentController@createAssignment');


/**********************************
 *          PUT ENDPOINTS
 *********************************/
$router->put('/im-2-project/api/assignments/accept/{id}', 'AssignmentController@acceptAssignment');
$router->put('/im-2-project/api/assignments/edit/{id}', 'AssignmentController@editAssignmentStatus');


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

/**********************************
 *          PUT ENDPOINTS
 *********************************/
$router->put('/im-2-project/api/orders/edit/{id}', 'OrderController@editOrder');


/**************************************************************************
 *                          QUOTATION    ROUTES
 *************************************************************************/
/**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/quotations/order/{orderId}', 'QuotationController@viewQuotationsByOrder');
$router->get('/im-2-project/api/quotations/user', 'QuotationController@viewUserQuotations');


/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/quotations/create', 'QuotationController@createQuotation');


/**********************************
 *          DELETE ENDPOINTS
 *********************************/
$router->delete('/im-2-project/api/quotations/delete/{quotationId}', 'QuotationController@deleteQuotation');



/**************************************************************************
 *                          ITEM    ROUTES
 *************************************************************************/

 /**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/items', 'ItemController@getAllItems');
$router->get('/im-2-project/api/items/{itemId}', 'ItemController@getItem');

/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/items/create', 'ItemController@createItem');

/**********************************
 *          PUT ENDPOINTS
 *********************************/
$router->put('/im-2-project/api/items/upload-image', 'ItemController@uploadImage');

/**********************************
 *          DELETE ENDPOINTS
 *********************************/
$router->delete('/im-2-project/api/items/delete/{itemId}', 'ItemController@deleteItem');


/**************************************************************************
 *                          SERVICE    ROUTES
 *************************************************************************/
 /**********************************
 *          GET ENDPOINTS
 *********************************/
 $router->get('/im-2-project/api/services/get-all', 'ServiceController@renderServices');

 /**********************************
 *          POST ENDPOINTS
 *********************************/
 $router->post('/im-2-project/api/services/add', 'ServiceController@addService');


/**************************************************************************
 *                          SUPPLIER    ROUTES
 *************************************************************************/
 /**********************************
 *          GET ENDPOINTS
 *********************************/
 $router->get('/im-2-project/api/suppliers/add', 'SupplierController@addSupplier');

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);


