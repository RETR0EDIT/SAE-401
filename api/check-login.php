<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once 'config/database.php';

if (isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in']) {
    http_response_code(200);
} else {
    http_response_code(401);
}
