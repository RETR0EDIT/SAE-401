<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
class Aliment
{
    private $conn;
    public $id_aliment;
    public $nom_aliment;
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Create
    public function create()
    {

        $stmt = $this->conn->prepare("SELECT id_aliment FROM aliment WHERE nom_aliment = ?");
        $stmt->execute([$this->nom_aliment]);
        if ($row = $stmt->fetch()) {
            return $row['id_aliment'];
        }


        $stmt = $this->conn->prepare("INSERT INTO aliment (nom_aliment) VALUES (?)");
        if ($stmt->execute([$this->nom_aliment])) {
            return true;
        } else {
            error_log("Erreur lors de l'exécution de la requête : " . $stmt->error);
            return false;
        }
    }

    // Read
    public function read()
    {
        $stmt = $this->conn->prepare("SELECT * FROM aliment");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update
    public function update($id_aliment, $nom_aliment)
    {

        $stmt = $this->conn->prepare("SELECT * FROM aliment WHERE nom_aliment = ? AND id_aliment != ?");
        $stmt->execute([$nom_aliment, $id_aliment]);
        if ($stmt->fetch()) {

            return "duplicate";
        }


        $stmt = $this->conn->prepare("UPDATE aliment SET nom_aliment = ? WHERE id_aliment = ?");
        if ($stmt->execute([$nom_aliment, $id_aliment])) {
            return true;
        } else {
            return false;
        }
    }

    // Delete
    public function delete($id_aliment)
    {
        $stmt = $this->conn->prepare("DELETE FROM aliment WHERE id_aliment = ?");
        if ($stmt->execute([$id_aliment])) {
            return true;
        } else {
            error_log("Erreur lors de l'exécution de la requête : " . $stmt->error);
            return false;
        }
    }
}
