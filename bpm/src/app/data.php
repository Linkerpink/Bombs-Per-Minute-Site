<?php
header('Content-Type: application/json');
$pdo = new PDO("mysql:host=localhost;dbname=bombs_per_minute_db", "user", "pass");
$stmt = $pdo->query("SELECT * FROM items");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
