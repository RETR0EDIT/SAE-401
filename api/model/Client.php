<?php
class Client
{
    private $conn;
    private $table_name = "client";

    public $id;
    public $nom;
    public $prenom;
    public $email;
    public $password;
    public $adresse;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    /**
     * Creer un client method POST 
     */
    public function create($nom, $prenom, $email, $password, $adresse)
    {
        $query = "INSERT INTO " . $this->table_name . " SET nom=?, prenom=?, email=?, password=?, adresse=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssss", $nom, $prenom, $email, $password, $adresse);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    /**
     * Lire les clients method GET 
     */
    public function read()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function readOne($id)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id_client=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Ajouter methode pour creer, maj et suppr des clients
    /**
     * Mettre a jour un client method PUT
     */
    public function update($data)
    {
        $query = "UPDATE " . $this->table_name . " SET nom=?, prenom=?, email=?, password=?, adresse=? WHERE id_client=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssssi", $data['nom'], $data['prenom'], $data['email'], $data['password'], $data['adresse'], $data['id']);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    /**
     * Supprimer un client method DELETE
     */
    public function  delete()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_client=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("?", $id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}