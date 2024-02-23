<?php
require_once '../config/Database.php';
require_once '../model/Box.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$database = new Database();
$db = $database->getConnection();

$box = new Box($db);

$boxes = $box->getAllBoxes();
header('Content-Type: application/json');
echo json_encode($boxes);
