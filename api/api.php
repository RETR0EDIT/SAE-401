<?php
// Co a la bdd
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sae401.sql";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérif co
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Def du header
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Récupliste des boxe
        $sql = "SELECT * FROM boxes";
        $result = $conn->query($sql);

        $boxes = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $boxes[] = $row;
            }
            http_response_code(200);
            echo json_encode($boxes);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Aucune box de sushi trouvée."));
        }
        break;

    case 'POST':

        break;

    default:

        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}

$conn->close();