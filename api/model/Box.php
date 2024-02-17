<?php
class Box
{
    private $conn;
    private $table_name = "boxes";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllBoxes()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    // ajouter des methode pour mettre à jour et suppr des boxes
}
