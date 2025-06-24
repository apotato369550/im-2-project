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
        if(!$data['concern'] && !$data['order_type']){
            ErrorHelper::sendError(404, "Missing some required fields");
        }

        $data['client_id'] = $decoded->user_id;
        
        $order = new Order();
        $newOrder = $order->createOrder($data);
        if($newOrder){
            echo json_encode([
                "message" => "order added sucessfully"
            ]);
        }else{
            ErrorHelper::sendError(408, "Error creating order");
        }
        
    }

    public function editOrder($id){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $data['order_id'] == $id;
        $order = new Order();
        $updatedOrder = $order->editOrder($data);
        if($updatedOrder){
            echo json_encode([
                "message" => "order updated successfully"
            ]);
        }else{
            ErrorHelper::sendError(408, "Error updating order");
        }
    }  
}