<?php
require_once 'config/database.php';
$database = new Database();
$conn = $database->getConnection();
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $mail = $_POST['email'];
    $password = $_POST['password'];

    if (empty($mail)) {
        echo "Veuillez entrer un email.";
    } elseif (empty($password)) {
        echo "Veuillez entrer un mot de passe.";
    } else {
        $sql = "SELECT * FROM `client` WHERE `mail` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $mail);
        $stmt->execute();
        $result = $stmt->get_result();
        $client = $result->fetch_assoc();

        if ($client && password_verify($password, $client['password'])) {
            echo "Connexion réussie";
            header('Location: '/* mettre a jour le chemin */);
        } else {
            echo "Erreur de connexion : email ou mot de passe incorrect.";
        }
    }
}
?>
<!--
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div class="form-container">
        <form action="connexion.php" method="post">
            <input type="text" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Mot de passe" required>
            <input type="submit" value="Connexion">
        </form>
        <a href="inscription.php">inscription</a>



<style>
    body {
        font-family: Arial, sans-serif;
    }

    .form-container {
        width: 300px;
        margin: 0 auto;
        padding-top: 50px;
    }

    .form-container input[type="text"],
    .form-container input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
    }

    .form-container input[type="submit"] {
        width: 100%;
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    .form-container input[type="submit"]:hover {
        background-color: #45a049;
    }

    .form-container a {
        display: block;
        text-align: center;
        margin-top: 20px;
        color: #4CAF50;
        text-decoration: none;
    }

    .form-container a:hover {
        color: #45a049;
    }
</style>
</div>
</body>

</html>
-->