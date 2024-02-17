<?php
include_once '../config/Database.php';
include_once '../model/Box.php';

$database = new Database();
$db = $database->getConnection();

$box = new Box($db);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $box->getAllBoxes();
        $boxes = array();

        while ($row = $result->fetch_assoc()) {
            $boxes[] = $row;
        }

        http_response_code(200);
        echo json_encode($boxes);
        break;

    case 'POST':
        // ajouter code pour créer une nouvelle box
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}

$db->close();
