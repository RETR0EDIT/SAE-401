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
        $query = "SELECT b.*, a.date, a.quantite, a.id_client, a.id_acheter, GROUP_CONCAT(DISTINCT s.nom_saveur) as saveurs, GROUP_CONCAT(DISTINCT al.nom_aliment) as aliments
        FROM " . $this->table_name . " a 
        JOIN boxes b ON a.id_boxe = b.id_boxe
        LEFT JOIN posseder p ON b.id_boxe = p.id_boxe
        LEFT JOIN saveur s ON p.id_saveur = s.id_saveur
        LEFT JOIN contenir c ON b.id_boxe = c.id_boxe
        LEFT JOIN aliment al ON c.id_aliment = al.id_aliment
        WHERE a.valider != 'valider'
        GROUP BY a.id_acheter";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
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
        $query = "INSERT INTO " . $this->table_name . " (id_client, id_boxe, quantite, date, valider) VALUES (?, ?, ?, ?, 'en cours...')";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id_client);

        foreach ($id_boxe as $index => $boxe) {
            $stmt->bindParam(2, $boxe);
            $stmt->bindParam(3, $quantite[$index]);
            $stmt->bindParam(4, $date);
            if (!$stmt->execute()) {
                return false;
            }
        }

        return true;
    }

    public function update($id_acheter, $valider)
    {
        $query = "UPDATE " . $this->table_name . " SET valider = ? WHERE id_acheter = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $valider);
        $stmt->bindParam(2, $id_acheter);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
