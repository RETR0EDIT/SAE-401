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
require_once '../model/Saveur.php';
$database = new Database();
$db = $database->getConnection();
$saveur = new Saveur($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] == "PUT") {
    if (!empty($data->id_saveur) && !empty($data->nom_saveur)) {
        $result = $saveur->update($data->id_saveur, $data->nom_saveur);
        if ($result === true) {
            http_response_code(200);
            echo json_encode(array("message" => "Saveur mise à jour."));
        } elseif ($result === "duplicate") {
            http_response_code(400);
            echo json_encode(array("message" => "Le nom de la saveur est déjà utilisé."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de mettre à jour la saveur."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de mettre à jour la saveur. L'ID de la saveur et/ou le nom de la saveur sont manquants."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
