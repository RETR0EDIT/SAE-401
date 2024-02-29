<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *");

$id = isset($_GET['id']) ? $_GET['id'] : die();

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    require_once '../config/Database.php';
    require_once '../model/Profil.php';
    $database = new Database();
    $db = $database->getConnection();
    $user = new Profil($db);
    $userInfo = $user->readOne($id);
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($userInfo);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
