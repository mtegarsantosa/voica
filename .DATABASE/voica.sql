-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2020 at 03:29 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voica`
--

-- --------------------------------------------------------

--
-- Table structure for table `audio`
--

CREATE TABLE `audio` (
  `id` int(11) NOT NULL,
  `file` varchar(191) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `audio`
--

INSERT INTO `audio` (`id`, `file`, `name`) VALUES
(8, '1584060552139_Pelajaran ke 1.mp3', 'Pelajaran Ke 1'),
(9, '1584060560496_Pelajaran ke 2.mp3', 'Pelajaran Ke 2'),
(10, '1584060590547_Pelajaran ke 3.mp3', 'Pelajaran Ke 3'),
(11, '1584060600660_Pelajaran ke 4.mp3', 'Pelajaran Ke 4'),
(12, '1584060611001_Pelajaran ke 5.mp3', 'Pelajaran Ke 5'),
(13, '1584060620488_Pelajaran ke 6.mp3', 'Pelajaran Ke 6'),
(14, '1584060631925_Pelajaran ke 7.mp3', 'Pelajaran Ke 7'),
(15, '1584060643254_Upacara Bendera Dimulai.mp3', 'Upacara Bendera'),
(16, '1584060661658_5 Menit Awal Sholat Jum\'at.mp3', '5 Menit Shalat Jumat');

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `label`
--

INSERT INTO `label` (`id`, `name`) VALUES
(5, 'Bel Hari Senin'),
(6, 'Bel Hari Selasa'),
(7, 'Bel Hari Rabu'),
(8, 'Bel Hari Kamis'),
(9, 'Bel Hari Jumat'),
(10, 'Bel Hari Sabtu'),
(11, 'Bel Hari Minggu');

-- --------------------------------------------------------

--
-- Table structure for table `label_audio`
--

CREATE TABLE `label_audio` (
  `id` int(11) NOT NULL,
  `id_label` int(11) NOT NULL,
  `id_audio` int(11) NOT NULL,
  `time` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `label_audio`
--

INSERT INTO `label_audio` (`id`, `id_label`, `id_audio`, `time`) VALUES
(9, 5, 15, '07:00'),
(10, 5, 8, '08:00'),
(11, 5, 9, '09:00'),
(12, 5, 10, '10:00'),
(13, 5, 11, '11:00'),
(14, 5, 12, '12:00'),
(15, 5, 13, '13:00'),
(16, 5, 14, '14:00'),
(17, 6, 8, '08:00'),
(18, 6, 9, '09:00'),
(19, 6, 10, '10:00'),
(20, 6, 11, '11:00'),
(21, 6, 12, '12:00'),
(22, 6, 13, '13:00'),
(23, 6, 14, '14:00'),
(24, 7, 8, '07:00'),
(25, 7, 8, '08:00'),
(26, 7, 9, '09:00'),
(27, 7, 10, '10:00'),
(28, 7, 11, '11:00'),
(29, 7, 12, '12:00'),
(30, 7, 13, '13:00'),
(31, 7, 14, '14:00'),
(32, 8, 8, '07:00'),
(33, 8, 8, '08:00'),
(34, 8, 9, '09:00'),
(35, 8, 10, '10:00'),
(36, 8, 11, '11:00'),
(37, 8, 12, '12:00'),
(38, 8, 13, '13:00'),
(39, 8, 14, '14:00'),
(40, 9, 8, '07:00'),
(41, 9, 8, '08:00'),
(42, 9, 9, '09:00'),
(43, 9, 10, '10:00'),
(44, 9, 11, '11:00'),
(45, 9, 12, '12:00'),
(46, 9, 13, '13:00'),
(47, 9, 14, '14:00'),
(48, 10, 8, '07:00'),
(49, 10, 8, '08:00'),
(50, 10, 9, '09:00'),
(51, 10, 10, '10:00'),
(52, 10, 11, '11:00'),
(53, 10, 12, '12:00'),
(54, 10, 13, '13:00'),
(55, 10, 14, '14:00'),
(64, 9, 16, '11:55');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `id_label` int(11) NOT NULL,
  `day` text NOT NULL,
  `status` enum('one','everyweek') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `id_label`, `day`, `status`) VALUES
(15, 5, '1', 'everyweek'),
(16, 6, '2', 'everyweek'),
(17, 7, '3', 'everyweek'),
(18, 8, '4', 'everyweek'),
(19, 9, '5', 'everyweek'),
(20, 10, '6', 'everyweek'),
(22, 11, '7', 'everyweek');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `timezone` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `timezone`) VALUES
(1, 'arsan', '$2a$10$zqf8nrRWDiKemBKoDriOPeID.XZ0wOlclmu3NkW8Mql.V2dm5VMJG', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audio`
--
ALTER TABLE `audio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `label_audio`
--
ALTER TABLE `label_audio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_audio_audio` (`id_audio`),
  ADD KEY `id_label_label` (`id_label`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_id_label` (`id_label`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audio`
--
ALTER TABLE `audio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `label_audio`
--
ALTER TABLE `label_audio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `label_audio`
--
ALTER TABLE `label_audio`
  ADD CONSTRAINT `id_audio_audio` FOREIGN KEY (`id_audio`) REFERENCES `audio` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `id_label_label` FOREIGN KEY (`id_label`) REFERENCES `label` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `foreign_id_label` FOREIGN KEY (`id_label`) REFERENCES `label` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
