<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <form action="connexion.php" method="post">
            <input type="text" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Mot de passe">
            <input type="submit" value="Connexion">
        </form>
    </div>
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

        $sql = "SELECT * FROM `client` WHERE `mail` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $mail);
        $stmt->execute();
        $result = $stmt->get_result();
        $client = $result->fetch_assoc();

        if (password_verify($password, $client['password'])) {
            echo "Connexion réussie";
        } else {
            echo "Erreur de connexion";
        }
    }
    ?>
</body>

</html>