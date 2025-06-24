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

    public function create(){

    }

    public function edit(){
        
    }
}