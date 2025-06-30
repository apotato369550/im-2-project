<?php

class ServiceController{
    public function addService(){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $service = new Service();
        $newService = $service->addService($data);
        if($newService){
            echo json_encode([
                "message" => "Service". " " . $data['service_type'] . " " . "has been added sucessfully" 
            ]);
        }else{
            ErrorHelper::sendError('408', 'Bad Request, could not add the new service');
        }
    }

    public function renderServices(){
        $decoded = AuthMiddleware::verifyToken();
        $service = new Service();
        $serviceList = $service->getAllServices();
        echo json_encode($serviceList ?: []);
    } 

}