<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'config/database.php';
$database = new Database();

try {
    $conn = $database->getConnection();
} catch (PDOException $e) {
    die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $mail = $_POST['email'];
    $password = $_POST['password'];

    if (empty($mail)) {
        echo json_encode(["error" => "Veuillez entrer un email."]);
    } elseif (empty($password)) {
        echo json_encode(["error" => "Veuillez entrer un mot de passe."]);
    } else {
        $sql = "SELECT * FROM `client` WHERE `mail` = :mail";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':mail', $mail);
        $stmt->execute();
        $client = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($client && password_verify($password, $client['password'])) {
            //echo json_encode(["success" => "Connexion réussie"]);
        } else {
            echo json_encode(["error" => "Erreur de connexion : email ou mot de passe incorrect."]);
        }
    }
}
