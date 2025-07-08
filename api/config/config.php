
<?php

// Make sure autoloader is loaded (in case it's not loaded yet)
if (!class_exists('Dotenv\Dotenv')) {
    require_once __DIR__ . '/../../vendor/autoload.php';
}

use Dotenv\Dotenv;

// Load environment variables from root directory
$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

// Define constants using environment variables
define("DB_HOST", $_ENV['DB_HOST'] ?? 'localhost');
define("DB_USER", $_ENV['DB_USER'] ?? 'root');
define("DB_PASS", $_ENV['DB_PASS'] ?? '');
define("DB_NAME", $_ENV['DB_NAME'] ?? 'testdb');
define("JWT_SECRET", $_ENV['JWT_SECRET'] ?? 'default_secret');