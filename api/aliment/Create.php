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
    require_once '../model/Aliment.php';
    $database = new Database();
    $db = $database->getConnection();
    $aliment = new Aliment($db);

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->nom_aliment)) {
        $aliment->nom_aliment = $data->nom_aliment;

        $result = $aliment->create();
        if ($result === true) {
            http_response_code(201);
            echo json_encode(array("message" => "Aliment créé."));
        } elseif (is_numeric($result)) {
            http_response_code(409);
            echo json_encode(array("message" => "L'aliment existe déjà.", "id_aliment" => $result));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de créer l'aliment."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de créer l'aliment. Les données sont incomplètes."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
