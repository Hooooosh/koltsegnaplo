<?php

require 'db.php';

// Expect JSON input
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['title'], $data['amount'], $data['date'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

// Prepare statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO normal (title, amount, date) VALUES (?, ?, ?)");
$stmt->bind_param("sds", $data['title'], $data['amount'], $data['date']); 
// "sds" = string, double, string

if ($stmt->execute()) {
    http_response_code(200);
} else {
    http_response_code(500);
}

$stmt->close();
$conn->close();
