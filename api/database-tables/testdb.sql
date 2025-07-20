-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2025 at 03:10 AM
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

INSERT INTO `assignments` (`assignment_id`, `worker_id`, `order_id`, `assignment_details`, `assignment_status`, `assignment_due`, `assignment_date_created`, `is_removed`) VALUES
(3, 6, 4, 'A lot has happened lately', 'Pending', '2026-01-23', '2025-07-08', 0),
(4, 6, 5, 'this client needs cleaning and repairing', 'Completed', '2025-12-01', '2025-07-08', 0),
(10, 16, 8, 'something down the road something', 'Completed', '2025-08-01', '2025-07-16', 0),
(11, 16, 9, 'something', 'Completed', '2025-08-01', '2025-07-05', 0);

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
(3, 1, 1, 'P3120', 20000.00, 'SPLIT', '', '500', 'Panasonic', 'uploads/686c7eb78ea88_1801000705.webp', 0),
(5, 1, 1, 'P3100', 3000.00, 'Portable', 'YES', '300', 'Panasonic', 'uploads/686c7ef94fbf8_images.jfif', 0),
(6, 1, 1, 'RKF71CVA', 80910.00, 'SPLIT', '', '3', 'DAIKIN', 'uploads/687078f99fdd0_D-Smart-Queen-FTKC-AVA-with-CSPF-Label.png', 0),
(7, 1, 1, 'PANNA', 0.00, 'Split AC', '', '0.75', 'PANASONIC', 'uploads/68771ccf065b4_monkeh.jpg', 0),
(8, 1, 1, 'P31245', 0.00, 'Window AC', 'false', '2.5', 'Panasonic', 'uploads/68771df449452_merkat.jpg', 1),
(9, 1, 1, 'ELEPE', 0.00, 'Window AC', 'false', '4', 'PANASONIC', 'uploads/68771e93787f7_elephant.jpg', 1),
(10, 1, 1, 'Stephen', 0.00, 'Split AC', 'true', '4', 'HP', 'uploads/687722c6d9f84_Dog.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL DEFAULT 1,
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
(5, 6, 1, 'Nag ice among aircon', 'Pending', '09235194824', 'G. Ouano St. Villamanga Opao M.C', 1, '2025-07-08', NULL, 0),
(6, 13, 1, 'I wanna buy stscvsvsfd s', 'Pending', '09235194824', 'G. Ouano St. Villamanga Opao M.C', 3, '2025-07-14', 3, 0),
(7, 11, 1, 'I wanna buy this aircon plsplspls', 'Pending', '09235194824', 'G. Ouano St. Villamanga Opao M.C', 3, '2025-07-15', 5, 0),
(8, 7, 1, 'da', 'Completed', '0923193940', 'Liloan', 1, '2025-07-16', NULL, 0),
(9, 8, 1, 'da', 'Completed', '0923193689', 'Talamban', 2, '2025-07-16', NULL, 0);

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
(3, 11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNzUyMjMyMDI5fQ.Gh3jR5GiNfm6kaT5ezRIsW4EEIwpvhmApLSaxhhqYGE', '2025-07-11 13:07:09', 1),
(4, 11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNzUyNTczMzAwfQ.cIuyZ1enS9KBENOPj90oDWjK4A5tzPjg50sJXjHCGaY', '2025-07-15 11:55:00', 0),
(5, 11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNzUyNTczNjA1fQ.Sj6WhM_hsmeGXUmhYF6w1qIwDpU7lKh0unsuVp7sNu4', '2025-07-15 12:00:05', 1),
(6, 11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNzUyNjMwMDI4fQ.I3kDJujNMm0QhNMca2VjUxcTN-g2xlhAlRaEIq0rzFQ', '2025-07-16 03:40:28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quotation`
--

CREATE TABLE `quotation` (
  `quotation_id` int(11) NOT NULL,
  `total_payment` decimal(11,3) DEFAULT 0.000,
  `description` varchar(255) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotation`
--

INSERT INTO `quotation` (`quotation_id`, `total_payment`, `description`, `order_id`) VALUES
(2, 200100.000, 'the ac costs that much, ikr', 7);

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
  `date_last_update` date DEFAULT NULL,
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
(5, 6, 1, '2025-07-15', 'TEST', 0),
(6, 16, 10, '2025-07-17', 'Status Update for Order#8:asdasd', 0),
(7, 16, 11, '2025-07-17', 'Status Update for Order#9:The Unit has arrived we will proceed to installation tomorrow', 0),
(8, 16, 10, '2025-07-17', 'Status Update for Order# 8:Completed', 0),
(9, 16, 10, '2025-07-17', 'Status Update for Order# 8:Completed', 0),
(10, 16, 10, '2025-07-17', 'Status Update for Order# 8:Completed', 0),
(11, 16, 10, '2025-07-17', 'Status Update for Order# 8:Completed', 0),
(12, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(13, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(14, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(15, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(16, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(17, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(18, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(19, 16, 11, '2025-07-17', 'Status Update for Order# 9:Completed', 0),
(20, 16, 10, '2025-07-17', 'Brad Pitt has accepted the assignment', 0),
(21, 16, 10, '2025-07-17', 'Status Update for Order# 8:nay nahitabo boss', 0),
(22, 16, 10, '2025-07-17', 'Status Update for Order# 8: Completed', 0),
(23, 16, 10, '2025-07-17', 'Status Update for Order# 8:Completed', 0);

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
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_full_name`, `user_email`, `user_password`, `user_type`, `image_path`) VALUES
(1, 'Admin Owner', 'cebubestvalue4@gmail.com', '$2y$10$/KFFuAMyVlULrWVqcmnTjOuKax/5BaW8ABwMMLxryqxaCroVNhI0q', 'manager', NULL),
(6, 'Jhanell Mingo', 'jhanell@example.com', '$2y$10$RdCHv2AF8T1FlRhYjvu3cuJE9e1rR7dKHTGfYqKUQ5073q3WvpjMu', 'client', NULL),
(7, 'Heizel Lequin', 'heizel@example.com', '$2y$10$Jhsa8h5PTlVzPgeWGQXynulJyR4sOkX6/KeRASDs21NLNTHk/lut.', 'client', NULL),
(9, 'Jose Carumba', 'jose@example.com', '$2y$10$SYer93gd6aK0wEnhs5xe8eVzlRBK4jcAsnsPqT34pdnTd7d0H74QK', 'client', NULL),
(10, 'Nino Calunod', 'nino@example.com', '$2y$10$d2OO4wpjxWInOmhIgfawRuWULYC/.7iV.1E/cdg7igG1oNv0x2xNC', 'client', 'uploads/686f4e87ee4f2_monkeh.jpg'),
(11, 'Jhanell Mingo', 'jhanell.mingo@gmail.com', '$2y$10$LVRjEn3MSRh/jWl9MNCjiul1esRxHFNZAYkA40IRQnBfURLEZkuG.', 'client', 'uploads/6879a7532d165_Dog.jpg'),
(12, 'Jose Carumba', 'miggycarumba912@gmail.com', '$2y$10$7Y4GdKaI6HSXtTgW2ho.wuy.oKmlE0L9NSNjwEjnx1.YaZ8PBZ7li', 'client', NULL),
(13, 'Atheena Arcena', 'atheenaarcena2810@gmail.com', '$2y$10$t9xQwYFu/J5ih.H73SNrWeBihDautJm/Ro1dFxuplnY6B.dwuQQ0e', 'client', NULL),
(14, 'haq buddu', 'haquidubuddu-7208@yopmail.com', '$2y$10$cmpvwRPpi/tb5TqK4BSm6etMXzVa5naaODNr9M4whD5DSOrwBTcDu', 'client', NULL),
(16, 'Brad Pitt', 'braddpit@example.com', '$2y$10$4xP0KqkuI1yd5vlwyEXumukgQOvIK9nTk6t5CBQJ.ycg0MYi0Bvfe', 'worker', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
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
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `reset_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `quotation`
--
ALTER TABLE `quotation`
  MODIFY `quotation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `update_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
