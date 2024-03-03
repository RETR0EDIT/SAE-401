<?php
require_once '../config/Database.php';
require_once '../model/Saveur.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");

$database = new Database();
$db = $database->getConnection();

$saveur = new Saveur($db);

$requestMethod = $_SERVER["REQUEST_METHOD"];
switch ($requestMethod) {
    case 'GET':
        $saveurs = $saveur->read();
        echo json_encode($saveurs);
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $saveur->create($data->nom_saveur);
        echo json_encode(array("message" => "Saveur created."));
        break;
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $saveur->update($data->id_saveur, $data->nom_saveur);
        echo json_encode(array("message" => "Saveur updated."));
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $saveur->delete($data->id_saveur);
        echo json_encode(array("message" => "Saveur deleted."));
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
