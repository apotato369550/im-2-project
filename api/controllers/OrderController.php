    
<?php


class OrderController{
    public function fetchList() {
        $decoded = AuthMiddleware::verifyToken();
        $orderModel = new Order();
        $allOrders = $orderModel->fetchList();
        echo json_encode($allOrders);
    }

    public function viewOrders(){
        $decoded = AuthMiddleware::verifyToken();
        $orders = new Order();
        $listOfOrders = $orders->viewOrders($decoded->user_id);
        header('Content-Type: application/json');
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
    
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'concern', 'phone_number', 'address', 'service_id'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
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

    public function editOrderStatus($id){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            "order_status"
        ]);

        $data['order_id'] = $id;        
        
        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

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
    
    public function trackOrderStatus($data){
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            "order_status",  "order_id"
        ]);
        
        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

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

    public function deleteOrder($orderId){
        $decoded = AuthMiddleware::verifyToken();
        if(!$orderId){
            ErrorHelper::sendError(400, "Missing Order Id");
        }

        $assignment = new AssignmentController();
        $orderHasAssignment = $assignment->findAssignmentByOrderId($orderId);

        if($orderHasAssignment){
            $order = new Order();
            $removeOrder = $order->deleteOrder($orderId);

            if($removeOrder){
                echo json_encode([
                "message" => "Successfully Deleted Order No." . $orderId
                ]);
            }else{
                ErrorHelper::sendError(401, "Something went wrong");
            }
        }else{
            ErrorHelper::sendError(400, "Assignment Still On Going Unable to Delete");
        }
        
    }
}