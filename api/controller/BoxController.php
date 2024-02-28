<?php
require_once '../config/Database.php';
require_once '../model/Box.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");

$database = new Database();
$db = $database->getConnection();

$box = new Box($db);

$requestMethod = $_SERVER["REQUEST_METHOD"];
switch ($requestMethod) {
    case 'GET':
        $boxes = $box->read();
        echo json_encode($boxes);
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $box->create($data->nom, $data->prix, $data->image, $data->saveur);
        echo json_encode(array("message" => "Box created."));
        break;
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $box->update($data->id_boxe, $data->nom, $data->prix, $data->image, $data->saveur);
        echo json_encode(array("message" => "Box updated."));
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $box->delete($data->id_boxe);
        echo json_encode(array("message" => "Box deleted."));
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
