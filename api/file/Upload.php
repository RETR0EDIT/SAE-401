<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$target_dir = __DIR__ . "/../../src/assets/ressources/images/box-sushi/caree/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}
$target_file = $target_dir . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    echo "Le fichier " . basename($_FILES["file"]["name"]) . " a été téléversé.";
} else {
    echo "Désolé, une erreur s'est produite lors du téléversement de votre fichier.";
    echo "Erreur : " . $_FILES["file"]["error"];
}
