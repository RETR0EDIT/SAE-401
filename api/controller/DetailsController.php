<?php
require_once '../config/database.php';
require_once '../model/Details.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$db = $database->getConnection();

$details = new Details($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = isset($_GET['id']) ? $_GET['id'] : die();
        $result = $details->read($id);
        break;
    case 'POST':
        $nom = $_POST['nom'];
        $prix = $_POST['prix'];
        $image = $_POST['image'];
        $saveur = $_POST['saveur'];
        $result = $details->create($nom, $prix, $image, $saveur);
        break;
    case 'PUT':
        parse_str(file_get_contents("php://input"), $post_vars);
        $id = $post_vars['id'];
        $nom = $post_vars['nom'];
        $prix = $post_vars['prix'];
        $image = $post_vars['image'];
        $saveur = $post_vars['saveur'];
        $result = $details->update($id, $nom, $prix, $image, $saveur);
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"), $post_vars);
        $id = $post_vars['id'];
        $result = $details->delete($id);
        break;
    default:
        http_response_code(405);
        die();
}

echo json_encode($result);

$db = null;
