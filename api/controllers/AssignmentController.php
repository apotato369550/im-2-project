<?php

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

class AssignmentController{
    public function viewAssignments(){
        $decoded = AuthMiddleware::verifyToken();
        $assignments = new Assignment();
        $listOfAssignments = $assignments->viewAssignments($decoded->user_id);
        if($listOfAssignments){
            echo json_encode($listOfAssignments);
        }else{
            ErrorHelper::sendError(408, "Error fetching assignments or might have no data");
        }
    }

    public function fetchList() {
        $decoded = AuthMiddleware::verifyToken();
        $assignmentModel = new Assignment();
        $allAssignments = $assignmentModel->fetchList();
        echo json_encode($allAssignments);
    }

    public function viewAssignment($id){
        $decoded = AuthMiddleware::verifyToken();
        $assignment = new Assignment();
        $assignmentById = $assignment->findAssignment($id);
        if($assignmentById){
            echo json_encode($assignmentById);
        }else{
            ErrorHelper::sendError(408, "Error fetching assignments or might have no data");
        }
    }

    //missing validation checkers

    public function createAssignment(){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);

        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'service_id', 'order_id', 'assignment_details', 'assignment_due'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

        $assignment = new Assignment();
        $newAssignmentId = $assignment->createAssignment($data);

        if($newAssignmentId){
            $update = new UpdateController();
            $updateData = [
                'worker_id' => $decoded->user_id,
                'assignment_id' => $newAssignmentId,
                'message' => "Assignment has been created for order no " . $data['order_id']
            ];
            $newUpdate  = $update->saveUpdate($updateData);
            echo json_encode([
                "message" => 'Assignment created successfully',
                "assignment_id" => $newAssignmentId
            ]);
        }else{
            ErrorHelper::sendError(408, "Error creating assignment");
        }
    }


    public function acceptAssignment($id){
        $decoded = AuthMiddleware::verifyToken();
        $data = [];
        $data['worker_id'] = $decoded->user_id;
        $data['assignment_id'] = $id;
        $assignment = new Assignment();
        $acceptAssignment = $assignment->acceptAssignment($data);
        if($acceptAssignment){
            $update = new UpdateController();
            $updateData = [
                'worker_id' => $decoded->user_id,
                'assignment_id' => $id,
                'message' => $decoded->user_name . " has accepted the assignment"
            ];
            $newUpdate  = $update->saveUpdate($updateData);

            echo json_encode([
                'message' => $updateData['message']
            ]);
        }else{
            ErrorHelper::sendError(408, 'There was an error processing your request');
        }
    }

    public function editAssignmentStatus($id){
        $decoded = AuthMiddleware::verifyToken();

        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_array($data)) {
            $data = [];
        }

        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            'assignment_status'
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

        $data['assignment_id'] = $id;
        $assignment = new Assignment();
        $updated = $assignment->editAssignmentStatus($data);
        if($updated){
            $update = new UpdateController();
            $updateData = [
                'worker_id' => $decoded->user_id,
                'assignment_id' => $id,
                'message' => 'The status for assignment no ' . $id . ' has been changed to ' . $data['assignment_status']
            ];
            $newUpdate  = $update->saveUpdate($updateData);
            echo json_encode([
                "message" => "Assignment status updated successfully"
            ]);
        }else{
            ErrorHelper::sendError(408, "Error updating assignment status");
        }
    }
}