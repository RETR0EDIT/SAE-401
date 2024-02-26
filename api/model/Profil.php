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

    public function getUserInfo($id)
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
}
