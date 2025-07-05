    // Fetch all quotations for manager
    
<?php

class QuotationController{

    public function fetchList() {
        $decoded = AuthMiddleware::verifyToken();
        $quotationModel = new Quotation();
        $allQuotations = $quotationModel->fetchList();
        echo json_encode($allQuotations);
    }

    public function createQuotation(){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'total_payment', 'description', 'order_id'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

        $quotation = new Quotation();
        $newId = $quotation->createQuotation($data);
        if($newId){
            echo json_encode([
                'message' => 'Quotation created successfully',
                'quotation_id' => $newId
            ]);
        }else{
            ErrorHelper::sendError(408, 'Error creating quotation');
        }
    }

    public function viewQuotationsByOrder($orderId){
        $decoded = AuthMiddleware::verifyToken();
        $quotation = new Quotation();
        $results = $quotation->viewQuotationsByOrder($orderId);
        echo json_encode($results);
    }

    public function viewUserQuotations(){
        $decoded = AuthMiddleware::verifyToken();
        $userId = $decoded->user_id;
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            SELECT q.* FROM quotation q
            INNER JOIN orders o ON q.order_id = o.order_id
            WHERE o.client_id = :user_id
        ");
        $stmt->execute(['user_id' => $userId]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        echo json_encode($results);
    }

    public function updateQuotationStatus($quotationId){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'quotation_status'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

        $quotation = new Quotation();
        $updateQuotation = $quotation->updateQuotationStatus($quotationId, $data['quotation_status']);
        if($updateQuotation){
            echo json_encode([
                'message' => 'Quotation Status Updated to '. $data['quotation_status'] . ' successfully',
            ]);
        }else{
            ErrorHelper::sendError(408, 'Error updating quotation');
        }
        
    }

    public function deleteQuotation($quotationId){
        $decoded = AuthMiddleware::verifyToken();
        $quotation = new Quotation();
        $deleted = $quotation->deleteQuotation($quotationId);
        if($deleted){
            echo json_encode([
                'message' => 'Quotation deleted successfully'
            ]);
        }else{
            ErrorHelper::sendError(408, 'Error deleting quotation');
        }
    }
}