<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "password", "studyup");

if ($conn->connect_error) {
    echo json_encode(["error" => $conn->connect_error]);
    exit();
}

$sql = "SELECT nom FROM annee";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row['nom']; 
}

echo json_encode($data);
?>
