<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <form action="inscription.php" method="post">
            <input type="text" name="nom" placeholder="Nom">
            <input type="text" name="prenom" placeholder="Prenom">
            <input type="text" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Mot de passe">
            <input type="text" name="adresse" placeholder="Adresse">
            <input type="submit" value="Inscription">
    </div>
</body>
<?php
require_once 'config/database.php';
$database = new Database();
$conn = $database->getConnection();
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['adresse'])) {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $mail = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $adresse = $_POST['adresse'];

    $sql = "INSERT INTO `client`(`nom`, `prenom`, `mail`, `password`, `adresse`) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nom, $prenom, $mail, $password, $adresse);

    if ($stmt->execute()) {
        echo "Inscription réussie";
    } else {
        echo "Erreur d'inscription: " . $stmt->error;
    }
}
?>

</html>