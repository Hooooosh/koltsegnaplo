<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // allow all domains (dev only)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Load .env
$dotenv = Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

// Get DB credentials from environment
$host = $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$dbname = $_ENV['DB_NAME'];

// Create connection
$conn = new mysqli(hostname: $host, username: $user, database: $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}
