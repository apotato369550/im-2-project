<?php

class Service {
    // public function addService($data){
    //    $db = DBHelper::getConnection();
    //    $stmt = $db->prepare('
    //     INSERT INTO service (service_details, service_type)
    //     VALUES (:serviceDetails, :serviceType);
    //    ');
    //    $newService = $stmt->execute([
    //     'serviceDetails'=> $data['service_details'],
    //     'serviceType' => $data['service_type']
    //    ]);

    //    return $newService ?: null;
    // }   

    public function getAllServices(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            SELECT *
            FROM service
        ');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC); 
    }
}