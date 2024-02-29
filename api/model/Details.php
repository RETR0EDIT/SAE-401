<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
require_once '../config/database.php';

class Details
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Create
    public function create($nom, $prix, $image, $saveur)
    {
        $sql = "INSERT INTO boxes (nom, prix, image, saveur) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$nom, $prix, $image, $saveur]);
    }

    // Read
    public function read()
    {
        $query = "SELECT * FROM boxes";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    // Read one

    public function readOne($id)
    {
        $sql = "SELECT b.id_boxe,
        b.nom,
        b.pieces,
        b.prix,
        b.image,
        GROUP_CONCAT(DISTINCT s.nom) AS saveurs,
        a.nom_aliment,
        c.quantite AS aliment_quantite
        FROM boxes b
        LEFT JOIN posseder p ON b.id_boxe = p.id_boxe
        LEFT JOIN saveur s ON p.id_saveur = s.id_saveur
        LEFT JOIN contenir c ON b.id_boxe = c.id_boxe
        LEFT JOIN aliment a ON c.id_aliment = a.id_aliment
        WHERE b.id_boxe = ?
        GROUP BY b.id_boxe, a.nom_aliment";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // Update
    public function update($id, $nom, $prix, $image, $saveur)
    {
        $sql = "UPDATE boxes SET nom = ?, prix = ?, image = ?, saveur = ? WHERE id_boxe = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$nom, $prix, $image, $saveur, $id]);
    }

    // Delete
    public function delete($id)
    {
        $sql = "DELETE FROM boxes WHERE id_boxe = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
    }
}
