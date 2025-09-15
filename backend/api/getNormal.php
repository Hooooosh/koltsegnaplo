<?php

require './db.php';

// Query expenses
$sql = "SELECT id, title, amount, date FROM normal ORDER BY date DESC";
$result = $conn->query($sql);

$expenses = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $expenses[] = $row;
    }
}

echo json_encode($expenses);
$conn->close();