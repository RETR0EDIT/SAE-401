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
    public function read_One($id_client)
    {
        $query = "SELECT acheter.quantite, acheter.date, boxes.*, GROUP_CONCAT(saveur.nom_saveur) as saveurs FROM " . $this->table_name . "
        JOIN boxes ON acheter.id_boxe = boxes.id_boxe
        LEFT JOIN posseder ON boxes.id_boxe = posseder.id_boxe
        LEFT JOIN saveur ON posseder.id_saveur = saveur.id_saveur
        WHERE id_client = ?
        GROUP BY boxes.id_boxe";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id_client);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
