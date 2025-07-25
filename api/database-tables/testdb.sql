-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2025 at 05:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `assignment_details` varchar(255) DEFAULT NULL,
  `assignment_status` varchar(255) DEFAULT NULL,
  `assignment_due` varchar(255) NOT NULL,
  `assignment_date_created` varchar(255) DEFAULT NULL,
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignment_id`, `service_id`, `worker_id`, `order_id`, `assignment_details`, `assignment_status`, `assignment_due`, `assignment_date_created`, `is_removed`) VALUES
(3, 3, NULL, 4, 'A lot has happened lately. Bla bla bla', 'In Progress', '2025-07-26', '2025-07-08', 0),
(4, 3, NULL, 5, 'this client needs cleaning and repairing', 'Completed', '2025-12-01', '2025-07-08', 0),
(10, 3, NULL, 6, 'this client needs cleaning and repairing', 'Completed', '2025-12-01', '2025-07-08', 0),
(11, 0, 21, 12, 'This is assigmnet', 'Completed', '2025-07-31', '2025-07-20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `model` varchar(200) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `type` varchar(200) DEFAULT NULL,
  `inverter` varchar(20) DEFAULT NULL,
  `horsepower` varchar(100) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `image_path` varchar(200) DEFAULT NULL,
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `supplier_id`, `manager_id`, `model`, `price`, `type`, `inverter`, `horsepower`, `brand`, `image_path`, `is_removed`) VALUES
(3, 1, 1, 'P3120', 20000.00, 'SPLIT', 'YES', '3', 'Panasonic', 'uploads/686c7eb78ea88_1801000705.webp', 0),
(5, 1, 1, 'P3100', 3000.00, 'SPLIT', 'YES', '5', 'Panasonic', 'uploads/686c7ef94fbf8_images.jfif', 0),
(6, 1, 1, 'RKF71CVA', 80910.00, 'SPLIT', 'INT', '3HP', 'DAIKIN', 'uploads/687078f99fdd0_D-Smart-Queen-FTKC-AVA-with-CSPF-Label.png', 0),
(7, 1, 1, 'agasd;lfkjas', 0.00, 'Cassette', '1', '0.75', 'New Aircon', 'uploads/687cfb5e0dd88_aircon.webp', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  `concern` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `service_id` int(11) NOT NULL,
  `order_date_created` varchar(255) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `client_id`, `manager_id`, `concern`, `order_status`, `phone_number`, `address`, `service_id`, `order_date_created`, `item_id`, `is_removed`) VALUES
(4, 6, 1, 'ror', 'Completed', '092341551', 'somewhere', 3, '2025-07-08', NULL, 0),
(5, 6, 1, 'Nag ice among aircon', 'Quotation Rejected', '09235194824', 'G. Ouano St. Villamanga Opao M.C', 1, '2025-07-08', NULL, 0),
(6, 13, 1, 'I wanna buy stscvsvsfd s', 'Pending', '09235194824', 'G. Ouano St. Villamanga Opao M.C', 3, '2025-07-14', 3, 0),
(8, 20, 1, 'asdfasdf', 'Quotation Confirmed', '09150443019', 'asdfasdf', 3, '2025-07-20', 3, 0),
(12, 20, 1, 'repair repair repair', 'Completed', '091504403019', 'asdfasdf', 1, '2025-07-20', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `reset_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`reset_id`, `user_id`, `token`, `expires_at`, `used`) VALUES
(1, 11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNzUyMjMxMjE1fQ.5TaqMsF9UBLlcuoSs6grrau9g-UxuGk2RVGcneZctgs', '2025-07-11 12:53:35', 0),
(2, 11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNzUyMjMxNDA0fQ.fWcCZUvQr4lObG9I8paJmhEBpyW0YodLf5NraD47ol0', '2025-07-11 12:56:44', 0),
(3, 11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNzUyMjMyMDI5fQ.Gh3jR5GiNfm6kaT5ezRIsW4EEIwpvhmApLSaxhhqYGE', '2025-07-11 13:07:09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quotation`
--

CREATE TABLE `quotation` (
  `quotation_id` int(11) NOT NULL,
  `total_payment` decimal(11,3) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `quotation_status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotation`
--

INSERT INTO `quotation` (`quotation_id`, `total_payment`, `description`, `order_id`, `quotation_status`) VALUES
(1, 10000.000, 'this is the proposed amount that user will pay', 5, 'Approved'),
(2, 6000.000, 'gimme money', 8, ''),
(3, 6000.000, 'something something', 8, ''),
(4, 6000.000, 'asdfasdf', 8, ''),
(5, 10000.000, 'fasdfasdfasdf', 12, '');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `service_details` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_details`, `service_type`) VALUES
(1, 'Fast, reliable airconditioner fixes.', 'Repair'),
(2, 'Expert airconditioner setup.', 'Installation'),
(3, 'Top-brand units for sale.', 'Retail');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_id`, `company_name`, `contact_number`) VALUES
(1, 'Panasonic', '092315194824');

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE `updates` (
  `update_id` int(11) NOT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `assignment_id` int(11) NOT NULL,
  `date_last_update` varchar(255) DEFAULT NULL,
  `update_message` varchar(255) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `updates`
--

INSERT INTO `updates` (`update_id`, `worker_id`, `assignment_id`, `date_last_update`, `update_message`, `is_read`) VALUES
(1, 6, 1, '2025-07-08', 'Assignment has been created for order no 4', 0),
(2, 6, 1, '2025-07-08', 'Assignment has been created for order no 5', 0),
(3, 1, 4, '2025-07-14', 'The status for assignment no 4 has been changed to Completed', 0),
(4, 1, 4, '2025-07-14', 'The status for assignment no 4 has been changed to Completed', 0),
(7, 6, 1, '2025-07-08', 'Assignment has been created for order no 4', 0),
(8, 1, 3, '2025-07-20', 'Status Update for Order# 4: Pending', 0),
(9, 1, 3, '2025-07-20', 'Status Update for Order# 4: In Progress', 0),
(10, 1, 1, '2025-07-20', 'Assignment has been created for order no 12', 0),
(11, 21, 11, '2025-07-20', 'Dominic John Yap has accepted the assignment', 0),
(12, 21, 11, '2025-07-20', 'Status Update for Order# 12: onsite inspection', 0),
(13, 21, 11, '2025-07-20', 'Status Update for Order# 12: Repaired airconidtions', 0),
(14, 21, 11, '2025-07-20', 'Status Update for Order# 12: Blabalblablablal', 0),
(15, 21, 11, '2025-07-20', 'Status Update for Order# 12: Completed', 0),
(16, 21, 11, '2025-07-20', 'Status Update for Order# 12:Completed', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_full_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_removed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_full_name`, `user_email`, `user_password`, `user_type`, `image_path`, `is_removed`) VALUES
(1, 'Admin Owner', 'cebubestvalue4@gmail.com', '$2y$10$/KFFuAMyVlULrWVqcmnTjOuKax/5BaW8ABwMMLxryqxaCroVNhI0q', 'manager', NULL, 0),
(6, 'Jhanell Mingo', 'jhanell@example.com', '$2y$10$RdCHv2AF8T1FlRhYjvu3cuJE9e1rR7dKHTGfYqKUQ5073q3WvpjMu', 'client', NULL, 0),
(7, 'Heizel Lequin', 'heizel@example.com', '$2y$10$Jhsa8h5PTlVzPgeWGQXynulJyR4sOkX6/KeRASDs21NLNTHk/lut.', 'client', NULL, 0),
(9, 'Jose Carumba', 'jose@example.com', '$2y$10$SYer93gd6aK0wEnhs5xe8eVzlRBK4jcAsnsPqT34pdnTd7d0H74QK', 'client', NULL, 0),
(10, 'Nino Calunod', 'nino@example.com', '$2y$10$d2OO4wpjxWInOmhIgfawRuWULYC/.7iV.1E/cdg7igG1oNv0x2xNC', 'client', NULL, 0),
(11, 'Jhanell R. Mingo', 'jhanell.mingo@gmail.com', '$2y$10$cuyS9xVyafWiTYG.Y1vDguHw0lCBDgsYsoIR9w2fiSgVi1gFKKvE6', 'worker', NULL, 0),
(12, 'Jose Carumba', 'miggycarumba912@gmail.com', '$2y$10$7Y4GdKaI6HSXtTgW2ho.wuy.oKmlE0L9NSNjwEjnx1.YaZ8PBZ7li', 'worker', NULL, 0),
(13, 'Atheena Arcena', 'atheenaarcena2810@gmail.com', '$2y$10$t9xQwYFu/J5ih.H73SNrWeBihDautJm/Ro1dFxuplnY6B.dwuQQ0e', 'worker', NULL, 0),
(14, 'haq buddu', 'haquidubuddu-7208@yopmail.com', '$2y$10$cmpvwRPpi/tb5TqK4BSm6etMXzVa5naaODNr9M4whD5DSOrwBTcDu', 'worker', NULL, 0),
(16, 'Random Client', 'client@gmail.com', '$2y$10$/KFFuAMyVlULrWVqcmnTjOuKax/5BaW8ABwMMLxryqxaCroVNhI0q', 'client', NULL, 1),
(17, 'Random Worker', 'worker@gmail.com', '$2y$10$/KFFuAMyVlULrWVqcmnTjOuKax/5BaW8ABwMMLxryqxaCroVNhI0q', 'worker', NULL, 1),
(18, 'Worker2 Worker McWorker', 'newworker@gmail.com', '$2y$10$Yf2KQDSavf7u1Q2aBgCdFucwqO3flZrRkcbb.XlV/qLErgifzW83S', 'worker', NULL, 0),
(20, 'John Andre Yap', 'johnandresyap510@gmail.com', '$2y$10$yCrcP6vE.lcGersHmCK5/OmxIBd59s7wEJVGXL9wUDsk3ff9zMx6K', 'client', NULL, 0),
(21, 'Dominic John Yap', 'apotato369@gmail.com', '$2y$10$C4HB72O.yNs/taepdM64peHYFkcgid6FmzUGl.vdHBMHfYRoSvPQu', 'worker', NULL, 0),
(22, 'Neil John Yap', 'neiljohnyap@gmail.com', '$2y$10$yCrcP6vE.lcGersHmCK5/OmxIBd59s7wEJVGXL9wUDsk3ff9zMx6K', 'client', NULL, 0),
(23, 'Mary Claire Saberon', 'maryclairesaberon@gmail.com', '$2y$10$yCrcP6vE.lcGersHmCK5/OmxIBd59s7wEJVGXL9wUDsk3ff9zMx6K', 'client', NULL, 0),
(24, 'Yohann Cedrik Yap', 'yohanncedrikyap@gmail.com', '$2y$10$yCrcP6vE.lcGersHmCK5/OmxIBd59s7wEJVGXL9wUDsk3ff9zMx6K', 'client', NULL, 0),
(25, 'Satur Hernani', 'saturhernani@gmail.com', '$2y$10$vCI3OlsX5Ziw0naw9bZ.OuJZP0/EQeTKhfUz5oHQdJdRKILkcxFm6', 'worker', NULL, 0),
(26, 'Crisostomo Ibarra', 'crisostomoibarra@gmail.com', '$2y$10$r2dI2Z/vMSPiEzn23yOzvOHqSz46.3kDOM2uQVgwB9IgF671flGBm', 'worker', NULL, 0),
(27, 'Spongebob Squarepants', 'spongebobsquarepants@gmail.com', '$2y$10$o5pDRRw/b9O6gzf1E1MYme1VjBcSenFXRGwhNO/OSV8m/tMD.YZDK', 'worker', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `model` (`model`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `manager_id` (`manager_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `manager_id` (`manager_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`reset_id`);

--
-- Indexes for table `quotation`
--
ALTER TABLE `quotation`
  ADD PRIMARY KEY (`quotation_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `updates`
--
ALTER TABLE `updates`
  ADD PRIMARY KEY (`update_id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `assignment_id` (`assignment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `reset_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quotation`
--
ALTER TABLE `quotation`
  MODIFY `quotation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `update_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);

--
-- Constraints for table `quotation`
--
ALTER TABLE `quotation`
  ADD CONSTRAINT `quotation_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
