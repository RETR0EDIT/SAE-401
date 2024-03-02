<?php
require_once '../config/Database.php';
require_once '../model/Aliment.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");

$database = new Database();
$db = $database->getConnection();

$aliment = new Aliment($db);

$requestMethod = $_SERVER["REQUEST_METHOD"];
switch ($requestMethod) {
    case 'GET':
        $aliments = $aliment->read();
        echo json_encode($aliments);
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $aliment->create($data->nom_aliment);
        echo json_encode(array("message" => "Aliment created."));
        break;
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $aliment->update($data->id_aliment, $data->nom_aliment);
        echo json_encode(array("message" => "Aliment updated."));
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $aliment->delete($data->id_aliment);
        echo json_encode(array("message" => "aliment deleted."));
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
