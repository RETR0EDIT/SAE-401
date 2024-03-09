<?php
class Acheter
{
    private $conn;
    private $table_name = "acheter";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    public function create($id_client, $id_boxe, $quantite, $date)
    {
        $query = "INSERT INTO " . $this->table_name . " (id_client, id_boxe, quantite, date) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id_client);

        foreach ($id_boxe as $index => $boxe) {
            // Vérifiez d'abord si l'entrée existe déjà
            $checkQuery = "SELECT * FROM " . $this->table_name . " WHERE id_client = ? AND id_boxe = ?";
            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->bindParam(1, $id_client);
            $checkStmt->bindParam(2, $boxe);
            $checkStmt->execute();
            if ($checkStmt->rowCount() > 0) {
                // Si l'entrée existe déjà, passez à la prochaine
                continue;
            }

            $stmt->bindParam(2, $boxe);
            $stmt->bindParam(3, $quantite[$index]);
            $stmt->bindParam(4, $date);
            if (!$stmt->execute()) {
                return false;
            }
        }

        return true;
    }
}
