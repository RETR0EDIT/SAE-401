<?php
require_once '../config/Database.php';
require_once '../model/Profil.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$database = new Database();
$db = $database->getConnection();

$user = new Profil($db);

$id = isset($_GET['id']) ? $_GET['id'] : die('ERROR: User ID not found.');

$userInfo = $user->getUserInfo($id);
header('Content-Type: application/json');
echo json_encode($userInfo);
