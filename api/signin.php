<?php
require_once 'config/database.php';
$database = new Database();
$conn = $database->getConnection();
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['numero_voie']) && isset($_POST['rue']) && isset($_POST['ville'])) {
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $mail = $_POST['email'];
        $password = $_POST['password'];
        $numero_voie = $_POST['numero_voie'];
        $rue = $_POST['rue'];
        $ville = $_POST['ville'];

        if (empty($nom)) {
            echo "Veuillez entrer un nom.";
        } elseif (empty($prenom)) {
            echo "Veuillez entrer un prénom.";
        } elseif (empty($mail)) {
            echo "Veuillez entrer un email.";
        } elseif (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            echo "Veuillez entrer un email valide.";
        } elseif (empty($password)) {
            echo "Veuillez entrer un mot de passe.";
        } elseif (empty($numero_voie) || empty($rue) || empty($ville)) {
            echo "Veuillez entrer une adresse complète.";
        } else {
            $adresse = $numero_voie . ' ' . $rue . ', ' . $ville;

            $sql = "SELECT * FROM `client` WHERE `mail` = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $mail);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo "Erreur d'inscription: cet email est déjà utilisé.";
            } else {
                $password = password_hash($password, PASSWORD_DEFAULT);

                $sql = "INSERT INTO `client`(`nom`, `prenom`, `mail`, `password`, `adresse`, `role`) VALUES (?, ?, ?, ?, ?, 'user')";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("sssss", $nom, $prenom, $mail, $password, $adresse);

                if ($stmt->execute()) {
                    echo "Inscription réussie";
                    header('Location: '/* mettre a jour le chemin */);
                } else {
                    echo "Erreur d'inscription: " . $stmt->error;
                }
            }
        }
    }
}
?>
<!--
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <style>
    body {
        font-family: Arial, sans-serif;
    }

    .form-container {
        width: 300px;
        margin: 0 auto;
        padding-top: 50px;
    }

    .form-container h2 {
        text-align: center;
        margin-bottom: 20px;
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
    </style>
</head>

<body>
    <div class="form-container">
        <h2>Inscription</h2>
        <form action="inscription.php" method="post">
            <input type="text" name="nom" placeholder="Nom" required>
            <input type="text" name="prenom" placeholder="Prénom" required>
            <input type="text" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Mot de passe" required>
            <input type="text" name="numero_voie" placeholder="Numéro de voie" required>
            <input type="text" name="rue" placeholder="Rue" required>
            <input type="text" name="ville" placeholder="Ville" required>
            <input type="submit" value="Inscription">
        </form>
        <a href="connexion.php">connexion</a>

    </div>
</body>

</html>
-->