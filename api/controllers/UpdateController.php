<?php

Class UpdateController{
    public function saveUpdate($data){
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'worker_id', 'assignment_id', 'message'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }
        $update = new Update();
        $saveUpdate = $update->saveNewUpdate($data);
    }

    public function fetchUpdates(){
        $decoded = AuthMiddleware::verifyToken();
        $update = new Update();
        $updates = $update->renderUpdates();
        echo json_encode($updates ?: []);
    }

    public function getClientUpdates($client_id){
        $decoded = AuthMiddleware::verifyToken();
        $update = new Update();
        $updates = $update->retrieveUserUpdates($client_id);
        echo json_encode($updates ?: []);
    }

    public function recentUpdates(){
        $decoded = AuthMiddleware::verifyToken();
        $update = new Update();
        $recentUpdates = $update->getRecentUpdates();
        echo json_encode($recentUpdates ?: []);
    }

}