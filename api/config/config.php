
<?php

if (!class_exists('Dotenv\Dotenv')) {
    require_once __DIR__ . '/../../vendor/autoload.php';
}

use Dotenv\Dotenv;

// Load environment variables from root directory
$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

// Define constants using environment variables
define("DB_HOST", $_ENV['DB_HOST']);
define("DB_USER", $_ENV['DB_USER']);
define("DB_PASS", $_ENV['DB_PASS']);
define("DB_NAME", $_ENV['DB_NAME']);
define("JWT_SECRET", $_ENV['JWT_SECRET']);
define("APP_PASSWORD", $_ENV['APP_PASSWORD']);
define("EMAIL_NAME", $_ENV['EMAIL_NAME']);
