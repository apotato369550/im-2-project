<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");
    http_response_code(200);
    exit();
}

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
$router->get('/im-2-project/api/users/profile', 'UserController@profile');
$router->get('/im-2-project/api/users/fetch-list', 'UserController@fetchAllUsers');


/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/users/login', 'UserController@login');
$router->post('/im-2-project/api/users/register', 'UserController@register');
$router->post('/im-2-project/api/users/update-profile/{id}', 'UserController@updateProfile');


/**************************************************************************
 *                          ASSIGNMENTs    ROUTES
 *************************************************************************/


/**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/assignments/recent', 'AssignmentController@getRecentAssignments');
$router->get('/im-2-project/api/assignments/available', 'AssignmentController@availableAssignments');
$router->get('/im-2-project/api/assignments', 'AssignmentController@viewAssignments');
$router->get('/im-2-project/api/assignments/fetch-list', 'AssignmentController@fetchList');
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
$router->get('/im-2-project/api/orders/fetch-list', 'OrderController@fetchList');

/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/orders/create', 'OrderController@createOrder');

/**********************************
 *          PUT ENDPOINTS
 *********************************/
$router->put('/im-2-project/api/orders/edit/{id}', 'OrderController@editOrderStatus');

/**********************************
 *          DELETE ENDPOINTS
 *********************************/
$router->delete('/im-2-project/api/orders/delete/{id}', 'OrderController@deleteOrder');


/**************************************************************************
 *                          QUOTATION    ROUTES
 *************************************************************************/

/**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/quotations/user', 'QuotationController@viewUserQuotations');
$router->get('/im-2-project/api/quotations/fetch-list', 'QuotationController@fetchList');
$router->get('/im-2-project/api/quotations/order/{orderId}', 'QuotationController@viewQuotationsByOrder');


/**********************************
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/quotations/create', 'QuotationController@createQuotation');

/**********************************
 *          PUT ENDPOINTS
 *********************************/
// $router->put('/im-2-project/api/quotations/update/{id}', 'QuotationController@updateQuotationStatus');

/**********************************
 *          DELETE ENDPOINTS
 *********************************/
// $router->delete('/im-2-project/api/quotations/delete/{quotationId}', 'QuotationController@deleteQuotation');



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
$router->post('/im-2-project/api/items/upload-image', 'ItemController@uploadImage');
$router->post('/im-2-project/api/items/edit-item/{id}', 'ItemController@updateItemDetails');

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
//  $router->post('/im-2-project/api/services/add', 'ServiceController@addService');


/**************************************************************************
 *                          SUPPLIER    ROUTES
 *************************************************************************/
 /**********************************
 *          GET ENDPOINTS
 *********************************/
 $router->get('/im-2-project/api/suppliers/fetch', 'SupplierController@getAllSupplier');



 /**********************************
 *          POST ENDPOINTS
 *********************************/
 $router->post('/im-2-project/api/suppliers/add', 'SupplierController@addSupplier');


/**************************************************************************
 *                          UPDATE    ROUTES
 *************************************************************************/
/**********************************
 *          GET ENDPOINTS
 *********************************/
$router->get('/im-2-project/api/updates/{client_id}', 'UpdateController@getClientUpdates');
$router->get('/im-2-project/api/updates/recent', 'UpdateController@recentUpdates');
$router->get('/im-2-project/api/updates', 'UpdateController@fetchUpdates');


/**************************************************************************
 *                          PASSWORD    ROUTES
 *************************************************************************/
/********************************** 
 *          POST ENDPOINTS
 *********************************/
$router->post('/im-2-project/api/passwords/forget', 'PasswordController@forgetPassword');
$router->post('/im-2-project/api/passwords/verify', 'PasswordController@verifyDBToken');
$router->post('/im-2-project/api/passwords/change', 'PasswordController@newPassword');


/**************************************************************************
 *                          PASSWORD    ROUTES
 *************************************************************************/
$router->post('/im-2-project/api/feedbacks/create', 'FeedbackController@feedback');



$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
