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

    public function createAssignemnt(){
        $data = json_decode(file_get_contents('php://input'), true);
        $decoded = AuthMiddleware::verifyToken();
        $assignment = new Assignment();
        $newAssignment = $assignment->createAssignment($data);
        
        if($newAssignment){
            echo json_encode([
                "message" => 'Assignment created successfully'
            ]);
        }else{
            ErrorHelper::sendError(408, "Error creating assignment");
        }
    }

    public function edit(){
        
    }
}