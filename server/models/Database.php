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
        }
    }
}