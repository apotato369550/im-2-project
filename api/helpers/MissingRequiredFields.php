<?php

class MissingRequiredFields{
    public static function checkMissingFields($fields, $requiredFields){
        $missing = [];
        foreach($requiredFields as $field){
            if(!isset($fields[$field]) || $fields[$field] === ""){
                $missing[] = $field;
            }
        }
        return $missing;
    }
}