<?php
class Profil
{
    private $conn;
    private $table_name = "client";

    public $nom;
    public $prenom;
    public $email;
    public $adresse;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Create
    public function create($nom, $prenom, $email, $adresse)
    {
        $query = "INSERT INTO " . $this->table_name . " (nom, prenom, email, adresse) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$nom, $prenom, $email, $adresse]);
    }

    // Read
    public function read($id)
    {
        $query = "SELECT nom, prenom, email, adresse FROM " . $this->table_name . " WHERE id_client = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->nom = $row['nom'];
        $this->prenom = $row['prenom'];
        $this->email = $row['email'];
        $this->adresse = $row['adresse'];
        return $row;
    }

    // Read one

    public function readOne($id)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id_client = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->nom = $row['nom'];
        $this->prenom = $row['prenom'];
        $this->email = $row['email'];
        $this->adresse = $row['adresse'];
        return $row;
    }

    // Update
    public function update($id, $nom, $prenom, $email, $adresse)
    {
        $query = "UPDATE " . $this->table_name . " SET nom = ?, prenom = ?, email = ?, adresse = ? WHERE id_client = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$nom, $prenom, $email, $adresse, $id]);
    }

    // Delete
    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_client = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
    }
}
