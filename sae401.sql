-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 24 fév. 2024 à 16:18
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
-- Structure de la table `boxes`
--

CREATE TABLE `boxes` (
  `id_boxe` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prix` decimal(15,2) NOT NULL,
  `nbr_pieces` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `composition` varchar(255) DEFAULT NULL,
  `saveur` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `boxes`
--

INSERT INTO `boxes` (`id_boxe`, `nom`, `prix`, `nbr_pieces`, `image`, `composition`, `saveur`) VALUES
(1, 'Tasty Blend', 12.50, 12, 'Tasty Blend.png', 'California Saumon Avocat, Sushi Saumon, Spring Avocat Cheese, California pacific, Edamame/Salade de chou', ' Saumon, Avocat, Cheese'),
(2, 'Amateur Mix', 15.90, 18, 'Amateur Mix.png', 'Maki Salmon Roll, Spring Saumon Avocat, Maki Cheese Avocat, California Saumon Avocat, Edamame/Salade de chou', 'Coriandre, Saumon, Avocat, Cheese'),
(3, 'Saumon Original', 12.50, 11, 'Saumon Original.png', 'California Saumon Avocat, Sushi Saumon, Edamame/Salade de chou', 'Saumon, Avocat'),
(4, 'Salmon Lovers', 15.90, 18, 'Salmon Lovers.png', 'California Saumon Avocat, Spring Saumon Avocat, Sushi Saumon, Edamame/Salade de chou', 'Coriandre, Saumon, Avocat'),
(5, 'Salmon Classic', 15.90, 10, 'Salmon Classic.png', 'Sushi Saumon, Edamame/Salade de chou', 'Saumon'),
(6, 'Master Mix', 15.90, 12, 'Master Mix.png', ' Sushi Saumon, Sushi Thon, California Thon Avocat, California Saumon Avocat, Edamame / Salade de chou', 'Saumon, Thon, Avocat'),
(7, 'Sunrise', 15.90, 18, 'Sunrise.png', 'Maki Salmon Roll, California Saumon Avocat, California Thon Cuit Avocat, Edamame / Salade de chou', 'Saumon, Thon, Avocat, Cheese'),
(8, 'Sando Box Chicken Katsu', 15.90, 13, 'Sando Box Chicken Katsu.png', 'Sando Chicken Katsu, Maki Salmon Roll, California Saumon Avocat, California Thon Cuit Avocat, Edamame / Salade de chou', 'Saumon, Viande, Avocat, Cheese'),
(9, 'Sando Box Salmon Aburi', 15.90, 13, 'Sando Box Salmon Aburi.png', 'Sando Salmon Aburi, California Saumon Avocat, California Thon Cuit Avocat, Edamame / Salade de chou', 'Saumon, Thon, Avocat'),
(10, 'Super Salmon', 19.90, 24, 'Super Salmon.png', 'California Saumon Avocat, Maki Salmon Roll, Maki Salmon, Spring Saumon Avocat, Edamame / Salade de chou', 'Coriandre, Saumon, Avocat, Cheese'),
(11, 'California Dream', 19.90, 24, 'California Dream.png', 'California Saumon Avocat, California Crevette, California Thon Cuit Avocat, California Chicken Katsu, Edamame / Salade de chou', 'Spicy, Saumon, Thon, Crevette, Viande, Avocat'),
(12, 'Gourmet Mix', 24.50, 22, 'Gourmet Mix.png', 'Spring tataki Saumon, Signature Dragon Roll, California French Touch, California French salmon, California Yellowtail Ponzu, Edamame / Salade de chou', 'Coriandre, Spicy, Saumon, Viande, Avocat, Seriole lalandi'),
(13, 'Fresh Mix', 24.50, 22, 'Fresh Mix.png', 'Signature Rock\'n Roll, Maki Salmon Roll, California Pacific, Sushi Salmon, Sushi Saumon Tsukudani, Edamame / Salade de chou', 'Spicy, Saumon, Thon, Avocat, Cheese');

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
-- Structure de la table `historique`
--

CREATE TABLE `historique` (
  `id_historique` int(11) NOT NULL,
  `prix` decimal(15,2) NOT NULL,
  `_date` datetime NOT NULL,
  `id_boxe` int(11) DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Index pour la table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id_historique`),
  ADD KEY `id_boxe` (`id_boxe`),
  ADD KEY `id_client` (`id_client`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `boxes`
--
ALTER TABLE `boxes`
  MODIFY `id_boxe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
