<?php


use YourNamespace\Controller\BoxeController;
use YourNamespace\Controller\ClientController;
// etc. pour vos autres contrôleurs

$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['REQUEST_URI'];

$boxeController = new BoxeController();
$clientController = new ClientController();
// etc. pour vos autres contrôleurs

switch ($url) {
    case '/boxes':
        if ($method == 'GET') {
            $boxeController->getAll();
        } elseif ($method == 'POST') {
            $boxeController->create();
        }
        break;
    case '/clients':
        if ($method == 'GET') {
            $clientController->getAll();
        } elseif ($method == 'POST') {
            $clientController->create();
        }
        break;
        // etc. pour vos autres routes
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
}
