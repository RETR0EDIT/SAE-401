<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



if ($_SERVER['REQUEST_METHOD'] == "GET") {
    require_once '../config/Database.php';
    require_once '../model/Box.php';
    $database = new Database();
    $db = $database->getConnection();
    $box = new Box($db);
    $boxes = $box->read();
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($boxes);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
