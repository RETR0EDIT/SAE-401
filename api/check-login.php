<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'config/database.php';


// Vérifiez si l'utilisateur est connecté. Cela dépend de la façon dont vous gérez les sessions/les connexions dans votre application.
// Pour cet exemple, nous supposons que vous avez une variable de session 'is_logged_in' qui est définie à true lorsque l'utilisateur est connecté.
session_start();
$is_logged_in = isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'];

// Créez un tableau avec la réponse
$response = array('is_logged_in' => $is_logged_in);

// Définissez l'en-tête de réponse comme JSON
header('Content-Type: application/json');

// Renvoyez la réponse en JSON
echo json_encode($response);
