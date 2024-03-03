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
    public $role;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    /**
     * Creer un client method POST 
     */
    public function create($nom, $prenom, $email, $password, $adresse, $role)
    {
        $query = "INSERT INTO " . $this->table_name . " SET nom=?, prenom=?, email=?, password=?, adresse=?, role=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $nom);
        $stmt->bindParam(2, $prenom);
        $stmt->bindParam(3, $email);
        $stmt->bindParam(4, $password);
        $stmt->bindParam(5, $adresse);
        $stmt->bindParam(6, $role);
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
    //read one client

    // Ajouter methode pour creer, maj et suppr des clients
    /**
     * Mettre a jour un client method PUT
     */
    public function update($data)
    {
        $query = "UPDATE " . $this->table_name . " SET nom=?, prenom=?, email=?, password=?, adresse=? WHERE id_client=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $data['nom']);
        $stmt->bindParam(2, $data['prenom']);
        $stmt->bindParam(3, $data['email']);
        $stmt->bindParam(4, $data['password']);
        $stmt->bindParam(5, $data['adresse']);
        $stmt->bindParam(6, $data['id']);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_client=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function emailExists($email)
    {
        $query = "SELECT id_client FROM " . $this->table_name . " WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }
}
