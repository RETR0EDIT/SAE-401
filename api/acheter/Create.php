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
    require_once '../model/Acheter.php';
    $database = new Database();
    $db = $database->getConnection();
    $acheter = new Acheter($db);

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->id_client) && !empty($data->id_boxe)) {
        $result = $acheter->create($data->id_client, $data->id_boxe, $data->quantite, $data->date);
        if ($result === true) {
            http_response_code(201);
            echo json_encode(array("message" => "Achat créé."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de créer l'achat."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de créer l'achat. Les données sont incomplètes."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
