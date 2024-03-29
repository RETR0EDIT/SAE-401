<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$id = isset($_GET['id']) ? $_GET['id'] : die();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    require_once '../config/Database.php';
    require_once '../model/Details.php';
    $database = new Database();
    $db = $database->getConnection();
    $detail = new Details($db);
    $details = $detail->readOne($id);

    $boxes = [];
    foreach ($details as $row) {
        $id_boxe = $row['id_boxe'];
        if (!isset($boxes[$id_boxe])) {
            $boxes[$id_boxe] = [
                'id_boxe' => $id_boxe,
                'nom' => $row['nom'],
                'pieces' => $row['pieces'],
                'prix' => $row['prix'],
                'image' => $row['image'],
                'saveurs' => explode(',', $row['saveurs']),
                'aliments' => [],
            ];
        }
        $boxes[$id_boxe]['aliments'][] = [
            'nom' => $row['nom_aliment'],
            'quantite' => intval($row['aliment_quantite']),
        ];
    }

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode(array_values($boxes));
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
