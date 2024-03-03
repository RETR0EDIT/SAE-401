<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once '../config/Database.php';
require_once '../model/Client.php';
$database = new Database();
$db = $database->getConnection();
$client = new Client($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] == "PUT") {
    if (!empty($data->id_client) && !empty($data->nom) && !empty($data->prenom) && !empty($data->adresse) && !empty($data->email) && !empty($data->password) && !empty($data->role)) {
        $result = $client->update([
            'id' => $data->id_client,
            'nom' => $data->nom,
            'prenom' => $data->prenom,
            'adresse' => $data->adresse,
            'email' => $data->email,
            'password' => $data->password,
            'role' => $data->role
        ]);
        if ($result === true) {
            http_response_code(200);
            echo json_encode(array("message" => "Client mis à jour."));
        } elseif ($result === "duplicate") {
            http_response_code(400);
            echo json_encode(array("message" => "Le nom du client est déjà utilisé."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de mettre à jour le client."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de mettre à jour le client. L'ID du client et/ou les informations du client sont manquants."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
