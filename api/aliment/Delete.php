<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
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

if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
    if (!empty($data->id_aliment)) {
        $result = $aliment->delete($data->id_aliment);
        if ($result === true) {
            http_response_code(200);
            echo json_encode(array("message" => "Aliment supprimé."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de supprimer l'aliment."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de supprimer l'aliment. L'ID de l'aliment est manquant."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
