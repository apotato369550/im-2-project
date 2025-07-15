<?php

Class FeedbackController{
    function feedback(){
        $data = json_decode(file_get_contents('php://input'), true);
        $missingFields = MissingRequiredFields::checkMissingFields($data, [
            "email", "message", "name"
        ]);

        if(!empty($missingFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingFields));
        }

        $mailer = new Mailer();

        $from = $data['email'];
        $name = $data['name'];
        $message = $data['message'];
        $body = "
            <h3>New Feedback Received</h3>
            <p><strong>From:</strong> {$name} ({$from})</p>
            <p><strong>Subject:</strong> FeedBack on Cebu Best Value Trading Site</p>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        ";

        $mailer->send(
            EMAIL_NAME,
            'New FeedBack on Cebu Best Value Trading Site' ,
            $body,
            '',
            $data['email'],  // Reply-to email
            $data['name']    // Reply-to name
        );
    }
}