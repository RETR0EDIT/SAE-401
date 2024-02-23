-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 23 fév. 2024 à 05:53
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
  `image` varchar(100) NOT NULL,
  `composition` varchar(255) DEFAULT NULL,
  `saveur` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `boxes`
--

INSERT INTO `boxes` (`id_boxe`, `nom`, `prix`, `nbr_pieces`, `image`, `composition`, `saveur`) VALUES
(1, 'Tasty Blend', 12.50, 12, '', 'California Saumon Avocat, Sushi Saumon, Spring Avocat Cheese, California pacific, Edamame/Salade de chou', ' Saumon, Avocat, Cheese'),
(2, 'Amateur Mix', 15.90, 18, '', 'Maki Salmon Roll, Spring Saumon Avocat, Maki Cheese Avocat, California Saumon Avocat, Edamame/Salade de chou', 'Coriandre, Saumon, Avocat, Cheese'),
(3, 'Saumon Original', 12.50, 11, '', 'California Saumon Avocat, Sushi Saumon, Edamame/Salade de chou', 'Saumon, Avocat'),
(4, 'Salmon Lovers', 15.90, 18, '', 'California Saumon Avocat, Spring Saumon Avocat, Sushi Saumon, Edamame/Salade de chou', 'Coriandre, Saumon, Avocat'),
(5, 'Salmon Classic', 15.90, 10, '', 'Sushi Saumon, Edamame/Salade de chou', 'Saumon'),
(6, 'Master Mix', 15.90, 12, '', ' Sushi Saumon, Sushi Thon, California Thon Avocat, California Saumon Avocat, Edamame / Salade de chou', 'Saumon, Thon, Avocat'),
(7, 'Sunrise', 15.90, 18, '', 'Maki Salmon Roll, California Saumon Avocat, California Thon Cuit Avocat, Edamame / Salade de chou', 'Saumon, Thon, Avocat, Cheese'),
(8, 'Sando Box Chicken Katsu', 15.90, 13, '', 'Sando Chicken Katsu, Maki Salmon Roll, California Saumon Avocat, California Thon Cuit Avocat, Edamame / Salade de chou', 'Saumon, Viande, Avocat, Cheese'),
(9, 'Sando Box Salmon Aburi', 15.90, 13, '', 'Sando Salmon Aburi, California Saumon Avocat, California Thon Cuit Avocat, Edamame / Salade de chou', 'Saumon, Thon, Avocat'),
(10, 'Super Salmon', 19.90, 24, '', 'California Saumon Avocat, Maki Salmon Roll, Maki Salmon, Spring Saumon Avocat, Edamame / Salade de chou', 'Coriandre, Saumon, Avocat, Cheese'),
(11, 'California Dream', 19.90, 24, '', 'California Saumon Avocat, California Crevette, California Thon Cuit Avocat, California Chicken Katsu, Edamame / Salade de chou', 'Spicy, Saumon, Thon, Crevette, Viande, Avocat'),
(12, 'Gourmet Mix', 24.50, 22, '', 'Spring tataki Saumon, Signature Dragon Roll, California French Touch, California French salmon, California Yellowtail Ponzu, Edamame / Salade de chou', 'Coriandre, Spicy, Saumon, Viande, Avocat, Seriole lalandi'),
(13, 'Fresh Mix', 24.50, 22, '', 'Signature Rock\'n Roll, Maki Salmon Roll, California Pacific, Sushi Salmon, Sushi Saumon Tsukudani, Edamame / Salade de chou', 'Spicy, Saumon, Thon, Avocat, Cheese'),
(26, 'Fresh Mix', 0.00, 0, '', 'Signature Rock\'n Roll, Maki Salmon Roll, California Pacific, Sushi Salmon, Sushi Saumon Tsukudani, Edamame / Salade de chou', 'Spicy, Saumon, Thon, Avocat, Cheese');

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
(23, 'dzdza', 'dazdaz', 'dzadza dzadza, dazzad', 'dzadaz@ferzfzedfez', '$2y$10$PRaJDInrTvYztx01RU2C3.Bk881rysaPPwaSTVtEicu8BfLInTsiu', 'user'),
(22, 'dzaedaz', 'dzaad', 'dzadaz dzaad, dazadz', 'dazdaz@gmzil.com', '$2y$10$0yvsQVTPIQUhABzRhpbeuuAu2oP4F7Airb2p.o1euxmTqHOnzH.Fq', 'user'),
(21, 'qdaz', 'dazdaz', 'dzadaz dazazd, dazaz', 'dadazza@dazdza', '$2y$10$M1BZN8kCFbCCe5RY3iNBaePCLS37pxw.8S1pZefVTUd2QvmG7oej6', 'user'),
(20, 'dzad', 'csxqwxQ', 'zadazdaz dazdaz, dzadza', 'fczerevdazeefvzfevfe@gmail.com', '$2y$10$QECW0Zh/TLzvbqBPFyy/6eZJILeqz3iIWjAygBvvRbVWghxAqq.GS', 'user');

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
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
