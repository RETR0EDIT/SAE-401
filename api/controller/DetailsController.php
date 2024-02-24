<?php
require_once '../config/database.php';
require_once '../model/Details.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$db = $database->getConnection();

$details = new Details($db);

$boxId = isset($_GET['id']) ? $_GET['id'] : die();

$boxDetails = $details->getDetails($boxId);

if ($boxDetails) {
    echo json_encode($boxDetails);
} else {
    echo json_encode(["error" => "No box found with ID $boxId"]);
}

$db = null;
