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

}