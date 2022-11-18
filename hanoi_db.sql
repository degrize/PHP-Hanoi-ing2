-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 18 nov. 2022 à 07:54
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hanoi_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_authority`
--

CREATE TABLE `hanoi_authority` (
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_contact_us`
--

CREATE TABLE `hanoi_contact_us` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `send_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hanoi_contact_us`
--

INSERT INTO `hanoi_contact_us` (`id`, `email`, `nom`, `objet`, `message`, `send_date`) VALUES
(1, '', '', '', '', '2022-11-18 00:54:01'),
(2, '', '', '', '', '2022-11-18 00:55:55'),
(3, '', '', '', '', '2022-11-18 00:56:18'),
(4, 'mdegrize@gmail.com', 'niche eletienne Borges', 'niche eletienne Borges', 'eeee', '2022-11-18 01:00:12'),
(5, 'mdegrize@gmail.com', 'niche eletienne Borges', 'niche eletienne Borges', 'eeee', '2022-11-18 01:00:13'),
(6, 'mdegrize@gmail.com', 'niche eletienne Borges', 'niche eletienne Borges', 'lzlzlmz', '2022-11-18 01:01:49'),
(7, 'mdegrize@gmail.com', 'Monsieur MEDA', 'Monsieur MEDA', 'je suis entrain de vous parler', '2022-11-18 03:42:59'),
(8, 'mdegrize@gmail.com', 'Monsieur MEDA', 'Monsieur MEDA', 'je suis entrain de vous parler', '2022-11-18 03:48:32'),
(9, 'mdegrize@gmail.com', ' N\'GUESSAN BRIGITTE', ' N\'GUESSAN BRIGITTE', 'Salut la communauté je vous ecrit pour un test sur votre plateforme d\'envoi de mail de contact. SVP', '2022-11-18 03:56:45'),
(10, 'mdegrize@gmail.com', 'niche eletienne Borges', 'niche eletienne Borges', 'jj', '2022-11-18 04:09:49'),
(11, 'mdegrize@gmail.com', 'niche eletienne Borges', 'niche eletienne Borges', 'jj', '2022-11-18 04:10:09'),
(12, 'mdegrize@gmail.com', 'niche eletienne Borges', 'niche eletienne Borges', 'eorpe ke rpze', '2022-11-18 04:11:00');

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_joueur`
--

CREATE TABLE `hanoi_joueur` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `est_suspendu` tinyint(1) DEFAULT 0,
  `piece` double DEFAULT 0,
  `niveau_actuel` int(11) NOT NULL DEFAULT 3,
  `musique` tinyint(1) NOT NULL DEFAULT 1,
  `last_login` bigint(20) DEFAULT NULL,
  `multijoueur` tinyint(1) NOT NULL DEFAULT 0,
  `cree_le` datetime DEFAULT NULL,
  `modifie_le` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hanoi_joueur`
--

INSERT INTO `hanoi_joueur` (`id`, `email`, `login`, `mot_de_passe`, `photo`, `est_suspendu`, `piece`, `niveau_actuel`, `musique`, `last_login`, `multijoueur`, `cree_le`, `modifie_le`) VALUES
(9, 'mde@gmail.com', 'Meda', 'Meda##$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', NULL, 0, 0, 3, 1, NULL, 0, NULL, NULL),
(10, 'fegg@gmail.com', 'luis', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', NULL, 1, 0, 3, 1, NULL, 0, NULL, NULL),
(11, 'luisbo@gmail.com', 'luisbo', 'A1234$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', NULL, 1, 0, 3, 1, NULL, 0, NULL, NULL),
(17, 'luibo@gmail.com', 'luibo', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', 'A1234zllzmlzm', 1, 0, 3, 1, NULL, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'ousmtra@gmail.co', 'degrized', '$argon2id$v=19$m=65536,t=4,p=1$ai9oR1JHdlpLUjkuR3Y4Yg$l2HLFL6tgfdUkqnl3lumBp7C7tKx/0UL89XinABI0Ag', 'man1', 0, 90, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-11-04 19:16:15'),
(23, 'ji@gmail.com', '', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(24, 'mdegrize3@gmail.com', 'niche eletienne Borges', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(25, 'zoizieoz', 'root', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(28, 'kmeda@ebenyx.com', 'rooto', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(29, 'patricktrabi220@gmail.com', 'rootaz', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(31, 'ousmtra@gmail.com', 'degrizeAZ', '$argon2id$v=19$m=65536,t=4,p=1$OXJxS0JIUHlIY2FweGtWWA$uTZB34KkTfjcSDPi5ZA/KdCQ9prf32AAv2rpeUmbZ4I', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(32, 'mdegrize1@gmail.com', 'degrize', '$argon2id$v=19$m=65536,t=4,p=1$UjAzVVptOHBxZ1MyTHRvWQ$WAMfgw6ZLrKOn/CcvNqliXnn/MAG+0EyzcYVTa/cJw0', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(33, 'ousmtra1@gmail.com', 'degrize1', '$argon2id$v=19$m=65536,t=4,p=1$M3ZSdGNoQVBHSGI1WldZMw$jlTs6QY2UZEh40AmenpLXHTcirclx8KIs1g9+4FDPfQ', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(34, 'mdegrize@gmail.ci', 'degrize2', '$argon2id$v=19$m=65536,t=4,p=1$TEd2LndQL0VVSDBTMG5DaA$IldJ1XGB3RPZpaiWQR/rGPaMaZ6LFFtRIjPfGbxXgZ8', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(35, 'kakouwilliams@gmail.com', 'amenan01', '$argon2id$v=19$m=65536,t=4,p=1$OUJzU3FlejVrZG8waDZXOA$k3+Fb2Ip9rzVCAU+PRAw6yjLmqASyM3mR8eNRIZixm0', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(36, 'kmeda@ebenyx.co', 'root1', '$argon2id$v=19$m=65536,t=4,p=1$Z2dyeXNBb3VscUdNaFh5bQ$04V69fo0ZLzk71MgGeyykFQ8zrpgRChM/JYASQ+msBE', 'woman4', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(37, 'mdegrize@gmail.com', 'luis-borges', '$argon2id$v=19$m=65536,t=4,p=1$VjNNRkVBb1N4cEpFYVZoMg$QI8ZxL8V8XL4KBb8xV/nUEakaTCslmrA9+TDdrR/1Go', 'man8', 0, 2817.92, 4, 0, 1668753625, 0, '2022-09-03 00:00:00', '2022-11-14 23:21:40'),
(38, 'kdegrize@gmail.ci', 'degrizea', '$argon2id$v=19$m=65536,t=4,p=1$S0t3S3ZWTjhLM0dlWEZtNQ$AmhJ8OxdCJdYk1metA52lvkHIglFCrHaO40CBHLfTqE', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(39, 'kdegrize@gmail.fr', 'degrizeb', '$argon2id$v=19$m=65536,t=4,p=1$dnA5d2N2Qmp1bEdMcVJPWg$DRAWTJAcWRYinXxht5FE+S0fpzNVctPWUjBt0zdFrXk', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(40, 'kdegrize@gmail.co', 'degrizec', '$argon2id$v=19$m=65536,t=4,p=1$TnRsNnl6eDJWeEpLenE5Ug$dF6gCKhKQ7hy8J2K2K+1qGaChFu/AOIx7IlJa8CwBJA', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(41, 'mdegrize@gmail.co', 'roota', '$argon2id$v=19$m=65536,t=4,p=1$WjF5Vml1MFhrNUdrQ28zMQ$XS07uLTu1OWiPoIcEwgqTKxECb2+CupMbT/eVeeXfEM', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00'),
(42, 'kdegrize@gmail.cp', 'amenan0', '$argon2id$v=19$m=65536,t=4,p=1$Z0c3a0pZRUpNd1NPMWNKMw$7RuesWCfIUoGQYRFqIgKL+CCLCIWGDadObZq62Nt9mA', 'loginInput.value', 0, 0, 3, 1, NULL, 0, '2022-09-03 00:00:00', '2022-09-03 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_joueur_authority`
--

CREATE TABLE `hanoi_joueur_authority` (
  `joueur_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_logs`
--

CREATE TABLE `hanoi_logs` (
  `id` bigint(20) NOT NULL,
  `joueur_id` bigint(20) NOT NULL,
  `information` varchar(255) DEFAULT NULL,
  `cree_le` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hanoi_logs`
--

INSERT INTO `hanoi_logs` (`id`, `joueur_id`, `information`, `cree_le`) VALUES
(1, 20, 'connexion au jeu', '2022-11-02 04:11:48'),
(2, 20, 'connexion au jeu', '2022-11-02 04:32:58'),
(3, 20, 'connexion au jeu', '2022-11-02 10:27:15'),
(4, 20, 'connexion au jeu', '2022-11-02 10:35:14'),
(5, 20, 'connexion au jeu', '2022-11-02 10:38:18'),
(6, 20, 'connexion au jeu', '2022-11-02 10:42:18'),
(7, 20, 'connexion au jeu', '2022-11-02 10:43:59'),
(8, 20, 'connexion au jeu', '2022-11-02 10:48:26'),
(9, 20, 'connexion au jeu', '2022-11-02 10:48:48'),
(10, 20, 'connexion au jeu', '2022-11-02 10:49:32'),
(11, 20, 'connexion au jeu', '2022-11-02 10:50:57'),
(12, 20, 'connexion au jeu', '2022-11-02 10:51:56'),
(13, 20, 'connexion au jeu', '2022-11-02 11:23:39'),
(14, 20, 'connexion au jeu', '2022-11-02 11:25:03'),
(15, 20, 'connexion au jeu', '2022-11-02 11:25:48'),
(16, 41, 'connexion au jeu', '2022-11-02 11:39:17'),
(17, 20, 'connexion au jeu', '2022-11-02 12:59:29'),
(18, 20, 'connexion au jeu', '2022-11-02 13:08:02'),
(20, 20, 'EDIT du Mot de passe', '2022-11-04 19:00:58'),
(21, 20, 'EDIT du Joueur', '2022-11-04 19:16:15'),
(22, 37, 'EDIT du Joueur', '2022-11-04 19:22:55'),
(23, 37, 'connexion au jeu', '2022-11-04 19:23:54'),
(24, 37, 'EDIT du Joueur', '2022-11-04 19:27:45'),
(25, 37, 'EDIT du Joueur', '2022-11-04 19:28:04'),
(26, 37, 'EDIT du Joueur', '2022-11-04 19:40:33'),
(27, 37, 'connexion au jeu', '2022-11-11 11:11:36'),
(28, 37, 'EDIT du Joueur', '2022-11-11 11:13:10'),
(29, 37, 'EDIT du Joueur', '2022-11-11 11:48:34'),
(30, 37, 'EDIT du Joueur', '2022-11-11 11:50:11'),
(31, 37, 'EDIT du Joueur', '2022-11-11 11:52:49'),
(32, 37, 'EDIT du Joueur', '2022-11-11 11:54:18'),
(33, 37, 'connexion au jeu', '2022-11-11 13:14:29'),
(34, 37, 'EDIT du Joueur', '2022-11-11 13:23:38'),
(35, 37, 'EDIT du Joueur', '2022-11-11 13:24:53'),
(36, 37, 'EDIT du Joueur', '2022-11-11 13:28:34'),
(37, 37, 'EDIT du Joueur', '2022-11-11 13:28:55'),
(38, 37, 'EDIT du Joueur', '2022-11-11 13:29:20'),
(39, 37, 'EDIT du Joueur', '2022-11-11 13:30:07'),
(40, 37, 'EDIT du Joueur', '2022-11-11 13:32:01'),
(41, 37, 'EDIT du Joueur', '2022-11-11 13:34:05'),
(42, 37, 'EDIT du Joueur', '2022-11-11 13:34:36'),
(43, 37, 'EDIT du Joueur', '2022-11-11 13:34:57'),
(44, 37, 'EDIT du Joueur', '2022-11-11 13:37:39'),
(45, 37, 'EDIT du Joueur', '2022-11-11 13:49:05'),
(46, 37, 'EDIT du Joueur', '2022-11-11 13:49:12'),
(47, 37, 'EDIT du Joueur', '2022-11-11 13:49:25'),
(48, 37, 'EDIT du Joueur', '2022-11-11 13:49:27'),
(49, 37, 'EDIT du Joueur', '2022-11-11 13:49:56'),
(50, 37, 'connexion au jeu', '2022-11-12 19:44:22'),
(51, 37, 'connexion au jeu', '2022-11-13 00:26:34'),
(52, 37, 'connexion au jeu', '2022-11-13 03:40:35'),
(53, 37, 'connexion au jeu', '2022-11-13 03:54:46'),
(54, 37, 'connexion au jeu', '2022-11-14 10:06:19'),
(55, 37, 'connexion au jeu', '2022-11-14 22:46:14'),
(56, 37, 'EDIT du Joueur', '2022-11-14 22:49:14'),
(57, 37, 'EDIT du Joueur', '2022-11-14 22:56:38'),
(58, 37, 'EDIT du Joueur', '2022-11-14 22:57:48'),
(59, 37, 'EDIT du Joueur', '2022-11-14 22:59:12'),
(60, 37, 'EDIT du Joueur', '2022-11-14 23:03:10'),
(61, 37, 'EDIT du Joueur', '2022-11-14 23:21:40'),
(62, 37, 'connexion au jeu', '2022-11-14 23:22:31'),
(63, 37, 'connexion au jeu', '2022-11-14 23:51:29'),
(64, 37, 'connexion au jeu', '2022-11-15 00:08:17'),
(65, 37, 'connexion au jeu', '2022-11-15 00:09:36'),
(66, 37, 'connexion au jeu', '2022-11-15 12:07:00'),
(67, 37, 'connexion au jeu', '2022-11-15 12:09:30'),
(68, 37, 'connexion au jeu', '2022-11-15 20:17:29'),
(69, 37, 'connexion au jeu', '2022-11-16 14:44:43'),
(70, 37, 'connexion au jeu', '2022-11-18 01:18:09'),
(71, 37, 'connexion au jeu', '2022-11-18 01:59:57'),
(72, 37, 'connexion au jeu', '2022-11-18 02:04:41'),
(73, 37, 'connexion au jeu', '2022-11-18 04:57:59'),
(74, 37, 'connexion au jeu', '2022-11-18 04:58:02'),
(75, 37, 'connexion au jeu', '2022-11-18 04:58:03'),
(76, 37, 'connexion au jeu', '2022-11-18 04:58:04'),
(77, 37, 'connexion au jeu', '2022-11-18 04:58:11'),
(78, 37, 'connexion au jeu', '2022-11-18 04:59:22'),
(79, 37, 'connexion au jeu', '2022-11-18 04:59:52'),
(80, 37, 'connexion au jeu', '2022-11-18 05:00:08'),
(81, 37, 'connexion au jeu', '2022-11-18 05:01:35'),
(82, 37, 'connexion au jeu', '2022-11-18 05:02:15');

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_multijoueurs`
--

CREATE TABLE `hanoi_multijoueurs` (
  `id` bigint(20) NOT NULL,
  `niveau_id` int(11) NOT NULL,
  `joueur_id` bigint(20) NOT NULL,
  `nom_salle` varchar(255) DEFAULT NULL,
  `cle_salle` varchar(255) DEFAULT NULL,
  `nbre_joueur` varchar(255) DEFAULT NULL,
  `victoire` tinyint(1) NOT NULL DEFAULT 0,
  `cree_le` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hanoi_multijoueurs`
--

INSERT INTO `hanoi_multijoueurs` (`id`, `niveau_id`, `joueur_id`, `nom_salle`, `cle_salle`, `nbre_joueur`, `victoire`, `cree_le`) VALUES
(1, 7, 37, 'feyt', 'ezerer', '2', 0, '2022-11-18 05:07:01'),
(2, 7, 37, 'niche eletienne borges', '122323', '3', 0, '2022-11-18 05:10:17'),
(3, 7, 37, 'niche eletienne borges', '122323', '3', 0, '2022-11-18 05:10:20'),
(4, 7, 37, 'konan kouadio aka n\'guessan brigitte', '1234', '3', 0, '2022-11-18 05:22:58'),
(5, 7, 37, 'monsieur meda', '1234', '2', 0, '2022-11-18 06:16:52'),
(6, 7, 37, 'niche eletienne luis_borges', '33', '2', 0, '2022-11-18 06:18:25'),
(7, 7, 37, 'bouii', '12', '2', 0, '2022-11-18 06:19:54');

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_niveau`
--

CREATE TABLE `hanoi_niveau` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deplacement_max` int(11) DEFAULT NULL,
  `temps_max` int(11) DEFAULT NULL,
  `nbre_disque` int(11) DEFAULT NULL,
  `gain` double DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hanoi_niveau`
--

INSERT INTO `hanoi_niveau` (`id`, `titre`, `description`, `deplacement_max`, `temps_max`, `nbre_disque`, `gain`) VALUES
(1, 'Niveau 8', 'Le niveau le plus elevé', 30, 380, 8, 3000),
(2, 'Niveau 7', 'RAS', 30, 360, 7, 2000),
(3, 'Niveau 6', 'RAS', 20, 220, 6, 1700),
(5, 'Niveau 5', 'RAS', 16, 190, 5, 1000),
(6, 'Niveau 4', 'RAS', 10, 100, 4, 500),
(7, 'Niveau 3', 'RAS', 7, 40, 3, 100);

-- --------------------------------------------------------

--
-- Structure de la table `hanoi_rel_niveau_joueur`
--

CREATE TABLE `hanoi_rel_niveau_joueur` (
  `niveau_id` int(11) NOT NULL,
  `joueur_id` bigint(20) NOT NULL,
  `deplacement` int(11) DEFAULT 0,
  `temps` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hanoi_rel_niveau_joueur`
--

INSERT INTO `hanoi_rel_niveau_joueur` (`niveau_id`, `joueur_id`, `deplacement`, `temps`) VALUES
(5, 37, 7, 13),
(6, 37, 19, 36),
(7, 37, 7, 10);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `hanoi_authority`
--
ALTER TABLE `hanoi_authority`
  ADD PRIMARY KEY (`name`);

--
-- Index pour la table `hanoi_contact_us`
--
ALTER TABLE `hanoi_contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hanoi_joueur`
--
ALTER TABLE `hanoi_joueur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_joueur_email` (`email`),
  ADD UNIQUE KEY `ux_joueur_login` (`login`);

--
-- Index pour la table `hanoi_joueur_authority`
--
ALTER TABLE `hanoi_joueur_authority`
  ADD PRIMARY KEY (`joueur_id`,`authority_name`),
  ADD KEY `fk_authority_name` (`authority_name`);

--
-- Index pour la table `hanoi_logs`
--
ALTER TABLE `hanoi_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hanoi_logs__joueur_id` (`joueur_id`);

--
-- Index pour la table `hanoi_multijoueurs`
--
ALTER TABLE `hanoi_multijoueurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hanoi_multijoueurs__niveau_id` (`niveau_id`),
  ADD KEY `fk_hanoi_multijoueurs__joueur_id` (`joueur_id`);

--
-- Index pour la table `hanoi_niveau`
--
ALTER TABLE `hanoi_niveau`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hanoi_rel_niveau_joueur`
--
ALTER TABLE `hanoi_rel_niveau_joueur`
  ADD PRIMARY KEY (`niveau_id`,`joueur_id`),
  ADD KEY `fk_hanoi_rel_niveau_joueur__joueur_id` (`joueur_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `hanoi_contact_us`
--
ALTER TABLE `hanoi_contact_us`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `hanoi_joueur`
--
ALTER TABLE `hanoi_joueur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `hanoi_logs`
--
ALTER TABLE `hanoi_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT pour la table `hanoi_multijoueurs`
--
ALTER TABLE `hanoi_multijoueurs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `hanoi_niveau`
--
ALTER TABLE `hanoi_niveau`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `hanoi_joueur_authority`
--
ALTER TABLE `hanoi_joueur_authority`
  ADD CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `hanoi_authority` (`name`),
  ADD CONSTRAINT `fk_joueur_id` FOREIGN KEY (`joueur_id`) REFERENCES `hanoi_joueur` (`id`);

--
-- Contraintes pour la table `hanoi_logs`
--
ALTER TABLE `hanoi_logs`
  ADD CONSTRAINT `fk_hanoi_logs__joueur_id` FOREIGN KEY (`joueur_id`) REFERENCES `hanoi_joueur` (`id`);

--
-- Contraintes pour la table `hanoi_multijoueurs`
--
ALTER TABLE `hanoi_multijoueurs`
  ADD CONSTRAINT `fk_hanoi_multijoueurs__joueur_id` FOREIGN KEY (`joueur_id`) REFERENCES `hanoi_joueur` (`id`),
  ADD CONSTRAINT `fk_hanoi_multijoueurs__niveau_id` FOREIGN KEY (`niveau_id`) REFERENCES `hanoi_niveau` (`id`);

--
-- Contraintes pour la table `hanoi_rel_niveau_joueur`
--
ALTER TABLE `hanoi_rel_niveau_joueur`
  ADD CONSTRAINT `fk_hanoi_rel_niveau_joueur__joueur_id` FOREIGN KEY (`joueur_id`) REFERENCES `hanoi_joueur` (`id`),
  ADD CONSTRAINT `fk_hanoi_rel_niveau_joueur__niveau_id` FOREIGN KEY (`niveau_id`) REFERENCES `hanoi_niveau` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
