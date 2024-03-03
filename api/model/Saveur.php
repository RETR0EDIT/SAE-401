<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
class Saveur
{
    private $conn;
    public $id_saveur;
    public $nom_saveur;
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Create
    public function create()
    {

        $stmt = $this->conn->prepare("SELECT id_saveur FROM saveur WHERE nom_saveur = ?");
        $stmt->execute([$this->nom_saveur]);
        if ($row = $stmt->fetch()) {
            return $row['id_saveur'];
        }


        $stmt = $this->conn->prepare("INSERT INTO saveur (nom_saveur) VALUES (?)");
        if ($stmt->execute([$this->nom_saveur])) {
            return true;
        } else {
            error_log("Erreur lors de l'exécution de la requête : " . $stmt->error);
            return false;
        }
    }

    // Read
    public function read()
    {
        $stmt = $this->conn->prepare("SELECT * FROM saveur");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update
    public function update($id_saveur, $nom_saveur)
    {

        $stmt = $this->conn->prepare("SELECT * FROM saveur WHERE nom_saveur = ? AND id_saveur != ?");
        $stmt->execute([$nom_saveur, $id_saveur]);
        if ($stmt->fetch()) {

            return "duplicate";
        }


        $stmt = $this->conn->prepare("UPDATE saveur SET nom_saveur = ? WHERE id_saveur = ?");
        if ($stmt->execute([$nom_saveur, $id_saveur])) {
            return true;
        } else {
            return false;
        }
    }

    // Delete
    public function delete($id_saveur)
    {
        $stmt = $this->conn->prepare("DELETE FROM saveur WHERE id_saveur = ?");
        if ($stmt->execute([$id_saveur])) {
            return true;
        } else {
            error_log("Erreur lors de l'exécution de la requête : " . $stmt->error);
            return false;
        }
    }
}
