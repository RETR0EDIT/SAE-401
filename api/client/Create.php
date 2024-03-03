<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    require_once '../config/Database.php';
    require_once '../model/Client.php';
    $database = new Database();
    $db = $database->getConnection();
    $client = new Client($db);

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->nom) && !empty($data->prenom) && !empty($data->adresse) && !empty($data->email) && !empty($data->password) && !empty($data->role)) {
        $client->nom = $data->nom;
        $client->prenom = $data->prenom;
        $client->adresse = $data->adresse;
        $client->email = $data->email;
        $client->password = $data->password;
        $client->role = $data->role;

        if (!filter_var($client->email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(array("message" => "L'email n'est pas valide."));
        } else if ($client->emailExists($client->email)) {
            http_response_code(400);
            echo json_encode(array("message" => "L'email existe déjà."));
        } else {
            $result = $client->create($client->nom, $client->prenom, $client->email, $client->password, $client->adresse, $client->role);
            if ($result === true) {
                http_response_code(201);
                echo json_encode(array("message" => "Client créé."));
            } elseif (is_numeric($result)) {
                http_response_code(409);
                echo json_encode(array("message" => "Le client existe déjà.", "id_client" => $result));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Impossible de créer le client."));
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Impossible de créer le client. Les données sont incomplètes."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
