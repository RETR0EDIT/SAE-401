<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
class Box
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Create
    public function create($nom, $prix, $image, $pieces, $id_aliment, $id_saveur)
    {
        // Insérer la boxe
        $stmt = $this->conn->prepare("INSERT INTO boxes (nom, prix, image, pieces) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nom, $prix, $image, $pieces]);

        // Récupérer l'ID de la boxe insérée
        $id_boxe = $this->conn->lastInsertId();

        // Insérer les données dans la table 'posseder'
        foreach ($id_saveur as $saveur) {
            $stmt = $this->conn->prepare("INSERT INTO posseder (id_boxe, id_saveur) VALUES (?, ?)");
            $stmt->execute([$id_boxe, $saveur]);
            if ($stmt->rowCount() == 0) {
                return "Erreur lors de l'insertion dans la table 'posseder'";
            }
        }

        // Insérer les données dans la table 'contenir'
        foreach ($id_aliment as $aliment) {
            $stmt = $this->conn->prepare("INSERT INTO contenir (id_boxe, id_aliment) VALUES (?, ?)");
            $stmt->execute([$id_boxe, $aliment]);
            if ($stmt->rowCount() == 0) {
                return "Erreur lors de l'insertion dans la table 'contenir'";
            }
        }

        // Vérifier si toutes les requêtes ont réussi
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }



    // Read
    // Read
    public function read()
    {
        $stmt = $this->conn->prepare(
            "
        SELECT b.id_boxe,
        b.nom,
        b.pieces,
        b.prix,
        b.image,
        GROUP_CONCAT(DISTINCT s.nom_saveur) AS saveurs,
        a.nom_aliment,
        c.quantite AS aliment_quantite
        FROM boxes b
        LEFT JOIN posseder p ON b.id_boxe = p.id_boxe
        LEFT JOIN saveur s ON p.id_saveur = s.id_saveur
        LEFT JOIN contenir c ON b.id_boxe = c.id_boxe
        LEFT JOIN aliment a ON c.id_aliment = a.id_aliment
        GROUP BY b.id_boxe, a.nom_aliment"
        );

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $boxes = [];
        foreach ($result as $row) {
            $id_boxe = $row['id_boxe'];
            if (!isset($boxes[$id_boxe])) {
                $boxes[$id_boxe] = [
                    'id_boxe' => $id_boxe,
                    'nom' => $row['nom'],
                    'pieces' => $row['pieces'],
                    'prix' => $row['prix'],
                    'image' => $row['image'],
                    'saveurs' => explode(',', $row['saveurs']),
                    'aliments' => [],
                ];
            }
            $boxes[$id_boxe]['aliments'][] = [
                'nom' => $row['nom_aliment'],
                'quantite' => $row['aliment_quantite'],
            ];
        }

        return array_values($boxes);
    }



    // Update
    public function delete($id_boxe)
    {
        $stmt = $this->conn->prepare("DELETE FROM contenir WHERE id_boxe = ?");
        $stmt->execute([$id_boxe]);

        $stmt = $this->conn->prepare("DELETE FROM posseder WHERE id_boxe = ?");
        $stmt->execute([$id_boxe]);

        $stmt = $this->conn->prepare("DELETE FROM boxes WHERE id_boxe = ?");
        $result = $stmt->execute([$id_boxe]);

        return $result;
    }
}