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

    public function getClientUpdates($client_id){
        $decoded = AuthMiddleware::verifyToken();
        // Optionally, check if $decoded->user_id matches $client_id or has permission
        $update = new Update();
        $updates = $update->retrieveUserUpdates($client_id);
        if ($updates) {
            echo json_encode($updates);
        } else {
            ErrorHelper::sendError(404, 'No updates found for this client.');
        }
    }
}