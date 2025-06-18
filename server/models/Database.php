<?php

class Database {
    private $conn;

    public function __construct(){
        $config = require __DIR__ '../config/db.php'
        $this->connect($config);
    }

    private function connect($config){
        try{
            $dsn = "mysql:host={$config['host']};dbname={$config[dbname]}";
            $this->conn = new PDO($dsn, $config['user'], $config['pass']);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOE)
    }

    public function getConnection(){
        return $this->conn;
    }
}


// require_once __DIR__ . '/../config/config.php';

// class Database {
//     private $pdo;

//     public function __construct() {
//         $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

//         try {
//             $this->pdo = new PDO($dsn, DB_USER, DB_PASS);
//             $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//         } catch (PDOException $e) {
//             die("Database connection failed: " . $e->getMessage());
//         }
//     }

//     public function getConnection() {
//         return $this->pdo;
//     }
// }