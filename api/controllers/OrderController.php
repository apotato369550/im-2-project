<?php

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

class OrderController{

    public function viewOrders(){
        $decoded = AuthMiddleware::verifyToken();
        $orders = new Order();
        $listOfOrders = $orders->viewOrders($decoded->user_id);
        echo json_encode($listOfOrders ?: []);
    
    }

    public function findOrder($id){
        $decoded = AuthMiddleware::verifyToken();
        $orders = new Order();
        $orderById= $orders->viewOrder($id);
        echo json_encode($orderById ?: []);
    }

    public function createOrder(){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $data['user_id'] = $decoded->user_id;
        
        $order = new Order();
        $createOrder = $order->createOrder($data);
        if($createOrder){
            echo json_encode([
            "message" => "order added sucessfully",
            ]);
        }else{
            ErrorHelper::sendError(408, "Error creating your order");
        }
        
    }

    public function editOrder(){
        
    }

}