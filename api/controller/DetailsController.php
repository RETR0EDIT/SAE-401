<?php
include_once '../config/Database.php';
include_once '../model/Details.php';

$database = new Database();
$db = $database->getConnection();

$acheter = new Acheter($db);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];



$db->close();
