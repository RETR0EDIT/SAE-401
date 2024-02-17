<?php
include_once '../config/Database.php';
include_once '../model/Client.php';

$database = new Database();
$db = $database->getConnection();

$client = new Client($db);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $client->getAllClients();
        $clients = array();

        while ($row = $result->fetch_assoc()) {
            $clients[] = $row;
        }

        http_response_code(200);
        echo json_encode($clients);
        break;

    case 'POST':
        // ajouter le code pour créer un nouveau client
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}

$db->close();
