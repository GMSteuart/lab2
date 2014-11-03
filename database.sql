-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 03, 2014 at 04:07 AM
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
  `default_location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `default_location_id`) VALUES
(1, 'Piece of Art', 8),
(2, 'KU Flag', 9),
(3, 'Basketball', 6),
(4, 'Coffee', 7),
(5, 'laptop', 0);

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
  `img` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `north`, `east`, `south`, `west`, `text`, `img`) VALUES
(1, 'Lied Center', 0, 3, 2, 0, 'You are outside the Lied Center', 'LiedCenter.jpg'),
(2, 'Dole Institute', 1, 10, 0, 0, 'You take in the view of the Dole Institute of Politics. This is the best part of your walk to Nichols Hall.', 'DoleInstituteofPolitics.jpg'),
(3, 'Eaton Hall', 0, 4, 10, 1, 'You are outside Eaton Hall. You should recognize here.', 'EatonHall.jpg'),
(4, 'Snow Hall', 0, 5, 6, 3, 'You are outside Snow Hall. Math class? Waiting for the bus?', 'SnowHall.jpg'),
(5, 'Strong Hall', 9, 7, 0, 4, 'You are outside Stong Hall.', 'StrongHall.jpg'),
(6, 'Ambler Recreation', 4, 0, 0, 10, 'It''s the starting of the semester, and you feel motivated to be at the Gym. Let''s see about that in 3 weeks.', 'AmblerRecreation.jpg'),
(7, 'Fraser', 8, 0, 0, 5, 'On your walk to the Kansas Union, you wish you had class outside.', 'OutsideFraserHall.jpg'),
(8, 'Spencer Museum', 0, 0, 7, 9, 'You are at the Spencer Museum of Art.', 'SpencerMuseum.jpg'),
(9, 'Memorial Stadium', 0, 8, 5, 0, 'Half the crowd is wearing KU Basketball gear at the football game.', 'MemorialStadium.jpg'),
(10, 'Allen Fieldhouse', 3, 6, 0, 2, 'Rock Chalk! You''re at the field house.', 'AllenFieldhouse.jpg'),
(11, 'Secret Room', 7, 1, 10, 9, 'You are in the secret room!', 'secret.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '5',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `location_id`, `updated`) VALUES
(11, 'test', 'test', 8, '2014-11-03 03:05:15');

-- --------------------------------------------------------

--
-- Table structure for table `users_items`
--

CREATE TABLE `users_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=14 ;

--
-- Dumping data for table `users_items`
--

INSERT INTO `users_items` (`id`, `user_id`, `item_id`, `location_id`) VALUES
(9, 11, 1, 8),
(10, 11, 2, 9),
(11, 11, 3, 6),
(12, 11, 4, 0),
(13, 11, 5, 0);
