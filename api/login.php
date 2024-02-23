<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once 'config/database.php';
$database = new Database();

try {
    $conn = $database->getConnection();
} catch (PDOException $e) {
    die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $mail = $data['email'];
    $password = $data['password'];

    if (empty($mail)) {
        echo json_encode(["error" => "Veuillez entrer un email."]);
    } elseif (empty($password)) {
        echo json_encode(["error" => "Veuillez entrer un mot de passe."]);
    } else {
        $query = "SELECT * FROM client WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $mail);
        $stmt->execute();
        $client = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($client && password_verify($password, $client['password'])) {
            echo json_encode(["success" => "Connexion réussie"]);
            session_start();

            $credentialsAreCorrect = true;

            if ($credentialsAreCorrect) {

                $_SESSION['email'] = $mail;
                exit;
            } else {
                echo 'Les informations d\'identification sont incorrectes.';
            }
        } else {
            echo json_encode(["error" => "Erreur de connexion : email ou mot de passe incorrect."]);
        }
    }
}
