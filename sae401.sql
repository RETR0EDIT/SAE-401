-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 21 fév. 2024 à 14:08
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sae401`
--

-- --------------------------------------------------------

--
-- Structure de la table `acheter`
--

CREATE TABLE `acheter` (
  `id_boxe` int(11) NOT NULL,
  `id_client` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `aliment`
--

CREATE TABLE `aliment` (
  `id_aliment` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `quantite` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aliment`
--

INSERT INTO `aliment` (`id_aliment`, `nom`, `quantite`) VALUES
(2, 'California Saumon Avocat', 0),
(3, 'Sushi Saumon', 0),
(4, 'Spring Avocat Cheese', 0),
(5, 'California pacific', 0),
(6, 'Edamame/Salade de chou', 0),
(7, 'Maki Salmon Roll', 0),
(8, 'Spring Saumon Avocat', 0),
(9, 'Maki Cheese Avocat', 0),
(10, 'California Thon Avocat', 0),
(11, 'Sushi Thon', 0),
(12, 'California Thon Cuit Avocat', 0),
(13, 'Sando Chicken Katsu', 0),
(14, 'Sando Salmon Aburi', 0),
(15, 'California Crevette', 0),
(16, 'California Chicken Katsu', 0),
(17, 'Signature Dragon Roll', 0),
(18, 'California French Touch', 0),
(19, 'California French salmon', 0),
(20, 'California Yellowtail Ponzu', 0),
(21, 'Sushi Salmon', 0),
(22, 'Sushi Saumon Tsukudani', 0),
(23, 'Signature Rock\'n Roll', 0);

-- --------------------------------------------------------

--
-- Structure de la table `boxe`
--

CREATE TABLE `boxe` (
  `id_boxe` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prix` decimal(15,2) NOT NULL,
  `nbr_pieces` int(11) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `boxe`
--

INSERT INTO `boxe` (`id_boxe`, `nom`, `prix`, `nbr_pieces`, `image`) VALUES
(1, 'Tasty Blend', 12.50, 12, ''),
(2, 'Amateur Mix', 15.90, 18, ''),
(3, 'Saumon Original', 12.50, 11, ''),
(4, 'Salmon Lovers', 15.90, 18, ''),
(5, 'Salmon Classic', 15.90, 10, ''),
(6, 'Master Mix', 15.90, 12, ''),
(7, 'Sunrise', 15.90, 18, ''),
(8, 'Sando Box Chicken Katsu', 15.90, 13, ''),
(9, 'Sando Box Salmon Aburi', 15.90, 13, ''),
(10, 'Super Salmon', 19.90, 24, ''),
(11, 'California Dream', 19.90, 24, ''),
(12, 'Gourmet Mix', 24.50, 22, ''),
(13, 'Fresh Mix', 24.50, 22, '');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom`, `prenom`, `adresse`, `email`, `password`, `role`) VALUES
(6, 'admin', ' ', 'admin', 'admin@gmail.com', '$2y$10$1dPumd8bktNeFDe5Sqoaw.rFuAHKOpL.wcFKKfsf3TEfnqYT8DoUa', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `contenir`
--

CREATE TABLE `contenir` (
  `id_boxe` int(11) NOT NULL,
  `id_aliment` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE `historique` (
  `id_historique` int(11) NOT NULL,
  `prix` decimal(15,2) NOT NULL,
  `_date` datetime NOT NULL,
  `id_boxe` int(11) DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `posseder`
--

CREATE TABLE `posseder` (
  `id_boxe` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `saveur`
--

CREATE TABLE `saveur` (
  `nom` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `saveur`
--

INSERT INTO `saveur` (`nom`) VALUES
('Avocat'),
('Cheese'),
('Coriandre'),
('Crevette'),
('Saumon'),
('Seriole lalandi'),
('Spicy'),
('Thon'),
('Viande');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `acheter`
--
ALTER TABLE `acheter`
  ADD PRIMARY KEY (`id_boxe`,`id_client`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `aliment`
--
ALTER TABLE `aliment`
  ADD PRIMARY KEY (`id_aliment`);

--
-- Index pour la table `boxe`
--
ALTER TABLE `boxe`
  ADD PRIMARY KEY (`id_boxe`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

--
-- Index pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD PRIMARY KEY (`id_boxe`,`id_aliment`),
  ADD KEY `id_aliment` (`id_aliment`);

--
-- Index pour la table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id_historique`),
  ADD KEY `id_boxe` (`id_boxe`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `posseder`
--
ALTER TABLE `posseder`
  ADD PRIMARY KEY (`id_boxe`,`nom`),
  ADD KEY `nom` (`nom`);

--
-- Index pour la table `saveur`
--
ALTER TABLE `saveur`
  ADD PRIMARY KEY (`nom`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `aliment`
--
ALTER TABLE `aliment`
  MODIFY `id_aliment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `boxe`
--
ALTER TABLE `boxe`
  MODIFY `id_boxe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
