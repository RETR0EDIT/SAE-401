<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    require_once '../config/Database.php';
    require_once '../model/Saveur.php';
    $database = new Database();
    $db = $database->getConnection();
    $saveur = new Saveur($db);

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->nom_saveur)) {
        $saveur->nom_saveur = $data->nom_saveur;

        $result = $saveur->create();
        if ($result === true) {
            http_response_code(201);
            echo json_encode(array("message" => "Saveur créée."));
        } elseif (is_numeric($result)) {
            http_response_code(409);
            echo json_encode(array("message" => "La saveur existe déjà.", "id_saveur" => $result));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de créer la saveur."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de créer la saveur. Les données sont incomplètes."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
