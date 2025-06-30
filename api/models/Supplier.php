<?php

class Supplier{
    public function addSupplier(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            INSERT INTO supplier(company_name, contact_number)
            VALUES(:companyName, :companyContactNumber)
        ');
        $result = $stmt->execute([
            'companyName' => $data['company_name'],
            'companyContactNumber'=> $data['contact_number']
        ]);
        return $result ?: null;
    }

    public function getAllSupplier(){
        $db = DBHelper::getConnection();
        $stmt = $db->prepare('
            SELECT *
            FROM supplier
        ');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


}