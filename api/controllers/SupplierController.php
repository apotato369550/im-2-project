<?php

class SupplierController{
    public function addSupplier(){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'company_name', 'contact_number'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

        $supplier = new Supplier();
        $newSupplier = $supplier->addSupplier($data);
        if($newSupplier){
            echo json_encode([
                "message" => "Supplier added succesfully"
            ]);
        }else{
            ErrorHelper::sendError('401', "Error adding supplier");
        }
    }

    public function getAllSupplier(){
        $supplier = new Supplier();
        $supplerList = $supplier->getAllSupplier();
        echo json_encode($supplerList ?: []);
    }
}