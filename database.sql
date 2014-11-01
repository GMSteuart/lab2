-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 01, 2014 at 07:10 PM
-- Server version: 5.5.29
-- PHP Version: 5.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `adventure`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`) VALUES
(1, 'Piece of Art'),
(2, 'KU Flag'),
(3, 'Basketball'),
(4, 'Coffee'),
(5, 'laptop');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `north` int(11) NOT NULL,
  `east` int(11) NOT NULL,
  `south` int(11) NOT NULL,
  `west` int(11) NOT NULL,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `item_id` int(11) NOT NULL DEFAULT '0',
  `img` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `north`, `east`, `south`, `west`, `text`, `item_id`, `img`) VALUES
(1, 'Lied Center', 0, 3, 2, 0, 'You are outside the Lied Center', 0, 'LiedCenter.jpg'),
(2, 'Dole Institute', 1, 10, 0, 0, 'You take in the view of the Dole Institute of Politics. This is the best part of your walk to Nichols Hall.', 0, 'DoleInstituteofPolitics.jpg'),
(3, 'Eaton Hall', 0, 4, 10, 1, 'You are outside Eaton Hall. You should recognize here.', 0, 'EatonHall.jpg'),
(4, 'Snow Hall', 0, 5, 6, 3, 'You are outside Snow Hall. Math class? Waiting for the bus?', 0, 'SnowHall.jpg'),
(5, 'Strong Hall', 9, 7, 0, 4, 'You are outside Stong Hall.', 0, 'StrongHall.jpg'),
(6, 'Ambler Recreation', 4, 0, 0, 10, 'It''s the starting of the semester, and you feel motivated to be at the Gym. Let''s see about that in 3 weeks.', 3, 'AmblerRecreation.jpg'),
(7, 'Fraser', 8, 0, 0, 5, 'On your walk to the Kansas Union, you wish you had class outside.', 4, 'OutsideFraserHall.jpg'),
(8, 'Spencer Museum', 0, 0, 7, 9, 'You are at the Spencer Museum of Art.', 1, 'SpencerMuseum.jpg'),
(9, 'Memorial Stadium', 0, 8, 5, 0, 'Half the crowd is wearing KU Basketball gear at the football game.', 2, 'MemorialStadium.jpg'),
(10, 'Allen Fieldhouse', 3, 6, 0, 2, 'Rock Chalk! You''re at the field house.', 0, 'AllenFieldhouse.jpg'),
(11, 'Secret Room', 7, 1, 10, 9, 'You are in the secret room!', 0, 'secret.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `location_id` int(11) NOT NULL,
  `updated` datetime NOT NULL,
  `secret` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `location_id`, `updated`, `secret`) VALUES
(5, 'test', 'test', 5, '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `users_items`
--

CREATE TABLE `users_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users_items`
--

INSERT INTO `users_items` (`id`, `user_id`, `item_id`) VALUES
(1, 5, 5);
