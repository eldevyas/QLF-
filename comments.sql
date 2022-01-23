-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 23, 2022 at 04:44 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comments`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `subject` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `name`, `email`, `subject`, `date`) VALUES
(1, 'Yassine Chettouch', 'yassine_ct@pm.me', 'I\'m just testing if the actual MySQL database is connected to the website, and the PHP code is working too for importing this comment to the comments section.\nI\'m also going to check if any new comment is sent properly to my personal email address.', '2022-01-22 15:40:40'),
(16, 'Yassine Chettouch', 'yassine_ct@pm.me', 'Well, it works now. Let me continue the work later. But not really as it is not as important of staying stuck on the screen till 6 AM, so see you in the next few days!', '2022-01-23 01:59:51'),
(2, 'Yassine Chettouch', 'yassine@chettouch.me', 'This is a pre-loaded comment using JQuery, it works by sending the form data to the PHP file then loading the current Form value to a temporary comment, and when the current page is refreshed, the main comment will appear permanently as he is already submitted on the database.', '2022-01-22 22:22:04'),
(15, 'Yassine Chettouch', 'yassine_ct@pm.me', 'Is the system willing to load this comment even if it contains an already used e-mail? It should probably do because I disabled the privilege adjustment of the e-mail column, but it is still in debt...', '2022-01-23 01:57:13');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
