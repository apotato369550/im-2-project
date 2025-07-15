<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer{
    private $mail;

    public function __construct() {
        $this->mail = new PHPMailer(true);

        $this->mail->isSMTP();
        $this->mail->Host = 'smtp.gmail.com';
        $this->mail->SMTPAuth = true;
        $this->mail->Username = EMAIL_NAME;
        $this->mail->Password = APP_PASSWORD;
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mail->Port = 587;

        $this->mail->setFrom(EMAIL_NAME, 'Cebu Best Value');
    }

    public function send($to, $subject, $body, $altBody = '', $replyToEmail = null, $replyToName = null) {
        try {
            $this->mail->clearAllRecipients();
            $this->mail->addAddress($to);

            if($replyToEmail){
                $this->mail->addReplyTo($replyToEmail, $replyToName ?: $replyToEmail);
            }

            $this->mail->isHTML(true);
            $this->mail->Subject = $subject;
            $this->mail->Body    = $body;
            $this->mail->AltBody = $altBody ?: strip_tags($body);

            return $this->mail->send();
        } catch (Exception $e) {
            error_log("Mailer Error: " . $this->mail->ErrorInfo);
            return false;
        }
    }
}