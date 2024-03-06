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
    require_once '../model/Box.php';
    $database = new Database();
    $db = $database->getConnection();
    $box = new Box($db);

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->nom) && !empty($data->prix) && !empty($data->image) && !empty($data->pieces) && !empty($data->id_aliment) && !empty($data->id_saveur) && !empty($data->quantite)) {
        $nom = $data->nom;
        $prix = $data->prix;
        $image = $data->image;
        $pieces = $data->pieces;
        $id_aliment = $data->id_aliment;
        $id_saveur = $data->id_saveur;
        $quantite = $data->quantite;

        $result = $box->create($nom, $prix, $image, $pieces, $id_aliment, $id_saveur, $quantite);
        if ($result === true) {
            http_response_code(201);
            echo json_encode(array("message" => "box créé."));
        } elseif (is_numeric($result)) {
            http_response_code(409);
            echo json_encode(array("message" => "La box existe déjà.", "id_boxe" => $result));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Impossible de créer la boxe."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de créer la boxe. Les données sont incomplètes."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
