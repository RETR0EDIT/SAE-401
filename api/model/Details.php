<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
require_once '../config/database.php';

// Récupérez l'ID de la box à partir de l'URL
$boxId = isset($_GET['id']) ? $_GET['id'] : die();

// Préparez une requête SQL pour obtenir les détails de la box
$sql = "SELECT * FROM boxe WHERE id_boxe = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $boxId);

// Exécutez la requête
$stmt->execute();

// Récupérez le résultat
$result = $stmt->get_result();

// Vérifiez si nous avons obtenu un résultat
if ($result->num_rows > 0) {
    // Si oui, encodez le premier enregistrement en JSON et imprimez-le
    $boxDetails = $result->fetch_assoc();
    echo json_encode($boxDetails);
} else {
    // Si non, imprimez un message d'erreur
    echo json_encode(["error" => "No box found with ID $boxId"]);
}

// Fermez la connexion
$conn->close();
