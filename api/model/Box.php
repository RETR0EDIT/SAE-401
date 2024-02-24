<?php
class Box
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllBoxes()
    {
        $stmt = $this->conn->prepare("SELECT nom, prix, image, saveur, id_boxe FROM boxes");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}
