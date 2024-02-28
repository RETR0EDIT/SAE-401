-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 28 fév. 2024 à 17:51
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
  `nom_aliment` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aliment`
--

INSERT INTO `aliment` (`id_aliment`, `nom_aliment`) VALUES
(1, 'California Saumon Avocat'),
(2, 'Sushi Saumon'),
(3, 'Spring Avocat Cheese'),
(4, 'California pacific'),
(5, 'Edamame/Salade de chou'),
(6, 'Maki Salmon Roll'),
(7, 'Spring Saumon Avocat'),
(8, 'Maki Cheese Avocat'),
(9, 'California Thon Avocat'),
(10, 'Sushi Thon'),
(11, 'California Thon Cuit Avocat'),
(12, 'Sando Chicken Katsu'),
(13, 'Sando Salmon Aburi'),
(14, 'California Crevette'),
(15, 'California Chicken Katsu'),
(16, 'Signature Dragon Roll'),
(17, 'California French Touch'),
(18, 'California French salmon'),
(19, 'California Yellowtail Ponzu'),
(20, 'Signature Rock n Roll'),
(21, 'Sushi Salmon'),
(22, 'Sushi Saumon Tsukudani');

-- --------------------------------------------------------

--
-- Structure de la table `boxes`
--

CREATE TABLE `boxes` (
  `id_boxe` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prix` decimal(15,2) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `boxes`
--

INSERT INTO `boxes` (`id_boxe`, `nom`, `prix`, `image`) VALUES
(1, 'Tasty Blend', 12.50, 'Tasty Blend.png'),
(2, 'Amateur Mix', 15.90, 'Amateur Mix.png'),
(3, 'Saumon Original', 12.50, 'Saumon Original.png'),
(4, 'Salmon Lovers', 15.90, 'Salmon Lovers.png'),
(5, 'Salmon Classic', 15.90, 'Salmon Classic.png'),
(6, 'Master Mix', 15.90, 'Master Mix.png'),
(7, 'Sunrise', 15.90, 'Sunrise.png'),
(8, 'Sando Box Chicken Katsu', 15.90, 'Sando Box Chicken Katsu.png'),
(9, 'Sando Box Salmon Aburi', 15.90, 'Sando Box Salmon Aburi.png'),
(10, 'Super Salmon', 19.90, 'Super Salmon.png'),
(11, 'California Dream', 19.90, 'California Dream.png'),
(12, 'Gourmet Mix', 24.50, 'Gourmet Mix.png'),
(13, 'Fresh Mix', 24.50, 'Fresh Mix.png');

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
(6, 'admin', ' ', 'admin', 'admin@gmail.com', '$2y$10$1dPumd8bktNeFDe5Sqoaw.rFuAHKOpL.wcFKKfsf3TEfnqYT8DoUa', 'admin'),
(81, 'nn', 'nn', 'nn nn, nn', 'nn@nn', '$2y$10$0aKEKFPRiggnJhI0U5FqWuwzyAV5zdWJoMElaRGtmG227/9Tj8mXa', 'user');

-- --------------------------------------------------------

--
-- Structure de la table `contenir`
--

CREATE TABLE `contenir` (
  `id_boxe` int(11) NOT NULL,
  `id_aliment` int(11) NOT NULL,
  `quantite` decimal(15,2) NOT NULL DEFAULT 1.00
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contenir`
--

INSERT INTO `contenir` (`id_boxe`, `id_aliment`, `quantite`) VALUES
(1, 1, 3.00),
(1, 2, 3.00),
(1, 3, 3.00),
(1, 4, 3.00),
(1, 5, 1.00),
(2, 6, 3.00),
(2, 7, 3.00),
(2, 8, 6.00),
(2, 1, 3.00),
(2, 5, 1.00),
(3, 1, 6.00),
(3, 2, 5.00),
(3, 5, 1.00),
(4, 1, 6.00),
(4, 7, 6.00),
(4, 2, 6.00),
(4, 5, 1.00),
(5, 2, 10.00),
(5, 5, 1.00),
(6, 2, 4.00),
(6, 10, 2.00),
(6, 9, 3.00),
(6, 1, 3.00),
(6, 5, 1.00),
(7, 6, 6.00),
(7, 1, 6.00),
(7, 11, 6.00),
(7, 5, 1.00),
(8, 12, 0.50),
(8, 6, 6.00),
(8, 1, 6.00),
(8, 11, 6.00),
(8, 5, 1.00),
(9, 13, 0.50),
(9, 1, 6.00),
(9, 11, 6.00),
(9, 5, 1.00),
(10, 1, 6.00),
(10, 6, 6.00),
(10, 7, 6.00);

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
  `id_saveur` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `posseder`
--

INSERT INTO `posseder` (`id_boxe`, `id_saveur`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(4, 4),
(5, 1),
(6, 1),
(6, 2),
(6, 3),
(6, 5),
(7, 1),
(7, 2),
(7, 5),
(7, 6),
(8, 1),
(8, 3),
(8, 5),
(8, 6),
(9, 1),
(9, 2),
(9, 6),
(10, 1),
(10, 4),
(10, 5),
(10, 6),
(11, 1),
(11, 4),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(12, 1),
(12, 3),
(12, 4),
(12, 5),
(12, 6),
(12, 9),
(13, 2),
(13, 3),
(13, 4),
(13, 5),
(13, 6);

-- --------------------------------------------------------

--
-- Structure de la table `saveur`
--

CREATE TABLE `saveur` (
  `id_saveur` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `saveur`
--

INSERT INTO `saveur` (`id_saveur`, `nom`) VALUES
(1, 'avocat'),
(2, 'cheese'),
(3, 'coriandre'),
(4, 'crevette'),
(5, 'saumon'),
(6, 'seriole lalandi'),
(7, 'spicy'),
(8, 'thon'),
(9, 'viande');

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
-- Index pour la table `boxes`
--
ALTER TABLE `boxes`
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
  ADD PRIMARY KEY (`id_boxe`,`id_saveur`),
  ADD KEY `nom` (`id_saveur`);

--
-- Index pour la table `saveur`
--
ALTER TABLE `saveur`
  ADD PRIMARY KEY (`id_saveur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `aliment`
--
ALTER TABLE `aliment`
  MODIFY `id_aliment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `boxes`
--
ALTER TABLE `boxes`
  MODIFY `id_boxe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
