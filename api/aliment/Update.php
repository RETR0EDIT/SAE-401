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
require_once '../model/Aliment.php';
$database = new Database();
$db = $database->getConnection();
$aliment = new Aliment($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] == "PUT") {
    if (!empty($data->id_aliment) && !empty($data->nom_aliment)) {
        $result = $aliment->update($data->id_aliment, $data->nom_aliment);
        if ($result === true) {
            http_response_code(200);
            echo json_encode(array("message" => "Aliment mis à jour."));
        } elseif ($result === "duplicate") {
            http_response_code(400);
            echo json_encode(array("message" => "Le nom de l'aliment est déjà utilisé."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de mettre à jour l'aliment."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de mettre à jour l'aliment. L'ID de l'aliment et/ou le nom de l'aliment sont manquants."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
