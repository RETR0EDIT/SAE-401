<?php
class Client
{
    private $conn;
    private $table_name = "client";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllClients()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    // Ajouter methode pour creer, maj et suppr des clients
}
