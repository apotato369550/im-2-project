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
        $assignment = new Assignment();
        $newAssignment = $assignment->createAssignment($data);
        
        if($newAssignment){
            $update = new UpdateController();
            $data['message'] = "assignment has been created for order no". $data['order_id'];
            $newUpdate  = $update->saveUpdate($data);
            echo json_encode([
                "message" => 'Assignment created successfully'
            ]);
        }else{
            ErrorHelper::sendError(408, "Error creating assignment");
        }
    }


    public function acceptAssignment($id){
        $decoded = AuthMiddleware::verifyToken();
        $data = json_decode(file_get_contents('php://input'), true);
        $data['worker_id'] = $decoded->user_id;
        $data['assignment_id'] = $id;
        $assignment = new Assignment();
        $acceptAssignment = $assignment->acceptAssignment($data);
        if($acceptAssignment){
            $update = new UpdateController();
            $data['message'] = $decoded->user_name . " " . 'has accepted the assignement';
            $newUpdate  = $update->saveUpdate($data);

            echo json_encode([
                'message' => $data['message']
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
        $data['assignment_id'] = $id;
        $assignment = new Assignment();
        $updated = $assignment->editAssignmentStatus($data);
        if($updated){
            $update = new UpdateController();
            $data['message'] = 'The status for assignment no' . $data['assignment_id'] . 'has been changed to ' . $data['assignment_status'];
            $newUpdate  = $update->saveUpdate($data);
            echo json_encode([
                "message" => "Assignment status updated successfully"
            ]);
        }else{
            ErrorHelper::sendError(408, "Error updating assignment status");
        }
    }
}