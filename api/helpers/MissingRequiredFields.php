<?php

class MissingRequiredFields{
    public static function checkMissingFields($fields, $requiredFields){
        $missing = [];
        foreach($requiredFields as $field){
            if(!isset($data[$field]) || $data[$field] === ""){
                $missing[] = $field;
            }
        }
        return $missing;
    }
}