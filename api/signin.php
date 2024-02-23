<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, PUT");

require_once "config/database.php";

$database = new Database();
$conn = $database->getConnection();
$role = "user";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    echo json_encode($data);
    if (!empty($data->nom) && !empty($data->prenom) && !empty($data->email) && !empty($data->password) && !empty($data->numero_voie) && !empty($data->rue) && !empty($data->ville)) {
        $adresse = $data->numero_voie . ' ' . $data->rue . ', ' . $data->ville;
        $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);

        $query = "INSERT INTO client SET nom=:nom, prenom=:prenom, email=:email, password=:password, adresse=:adresse, role=:role";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":nom", $data->nom);
        $stmt->bindParam(":prenom", $data->prenom);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":password", $hashedPassword);
        $stmt->bindParam(":adresse", $adresse);
        $stmt->bindParam(":role", $role);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Utilisateur créé avec succès."]);
            session_start();
            $_SESSION['email'] = $data->email;
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Impossible de créer l'utilisateur."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Tous les champs sont requis."]);
    }
} else {
    echo json_encode(["error" => "La méthode de requête n'est pas autorisée."]);
    exit;
}
