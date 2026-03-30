-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:8111
-- Generation Time: Mar 30, 2026 at 12:14 PM
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
-- Database: `travel`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `blog_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `date`, `description`, `blog_img`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 'seven wonders of world', '2026-03-26', '7 seven up gogogog', 'public\\blog_img\\1774335218735-404573352-swaperimg.jpg', 1, '2026-03-24 12:23:38', '2026-03-24 12:23:38'),
(7, 'iii', '2026-03-28', 'fy', 'public\\blog_img\\1774336763797-171702914-full-stack.png', 1, '2026-03-24 12:49:23', '2026-03-24 12:49:23'),
(8, 'ooo', '2026-03-29', 'oo', 'public\\blog_img\\1774336779378-729502078-young-bearded-man-with-striped-shirt.jpg', 1, '2026-03-24 12:49:39', '2026-03-24 12:49:39');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `location_id` int(255) NOT NULL,
  `package_id` int(255) NOT NULL,
  `travel_date` date NOT NULL,
  `passenger` int(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `user_id`, `location_id`, `package_id`, `travel_date`, `passenger`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(14, 8, 52, 34, '2026-04-02', 6, 'payment_complete', 1, '2026-03-30 14:52:25', '2026-03-30 14:52:25');

-- --------------------------------------------------------

--
-- Table structure for table `contect`
--

CREATE TABLE `contect` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `id` int(255) NOT NULL,
  `vendor_id` int(255) NOT NULL,
  `service_id` int(255) NOT NULL,
  `checkin` varchar(255) NOT NULL,
  `checkout` varchar(255) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `passenger` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `hotel_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`id`, `vendor_id`, `service_id`, `checkin`, `checkout`, `datetime`, `passenger`, `amount`, `hotel_img`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 3, 3, '6', '7', '2026-03-21 13:24:00.000000', 7, 7000, 'public\\hotel_img\\1774684458853-507565911-shoes.png', 1, '2026-03-28 13:24:18', '2026-03-28 13:24:18');

-- --------------------------------------------------------

--
-- Table structure for table `itineary`
--

CREATE TABLE `itineary` (
  `id` int(255) NOT NULL,
  `package_id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `itineary_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itineary`
--

INSERT INTO `itineary` (`id`, `package_id`, `title`, `description`, `itineary_img`, `is_active`, `created_at`, `updated_at`) VALUES
(9, 34, 'go', 'hello', 'public\\itineary_img\\1774684180941-244518822-cheif.jpg', 1, '2026-03-28 13:19:40', '2026-03-28 13:19:40');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`, `description`, `image`, `is_active`, `created_at`, `updated_at`) VALUES
(52, 'manali ', 'Manali is a picturesque hill station located in the Kullu Valley of Himachal Pradesh, India, at an altitude of approximately 2,050 meters above sea level. Nestled amidst the snow-capped peaks of the Himalayas and along the banks of the Beas River.', 'public\\image\\1774333393568-54357579-swaperimg.jpg', 1, '2026-03-24 11:53:13', '2026-03-24 11:53:13'),
(53, 'shimla', 'dfv', 'public\\image\\1774333506388-93459971-soft-skill-development.png', 1, '2026-03-24 11:55:06', '2026-03-24 11:55:06'),
(54, 'kashmir', 'scd', 'public\\image\\1774333528140-98718764-T-shirt1.jpg', 1, '2026-03-24 11:55:28', '2026-03-24 11:55:28'),
(55, 'dff', 'ee', 'public\\image\\1774333724793-236742162-hoodie-removebg-preview.png', 1, '2026-03-24 11:58:44', '2026-03-24 11:58:44');

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `id` int(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `itineary_id` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`id`, `location_id`, `name`, `duration`, `price`, `itineary_id`, `image`, `is_active`, `created_at`, `update_at`) VALUES
(34, 52, 'manali ', '3days 2night', 25000, '5', 'public\\image\\1774340394593-2794453-nature.jpg', 1, '2026-03-24 13:49:54', '2026-03-24 13:49:54'),
(35, 53, 'shimla', '3days 2night', 27000, '5', 'public\\image\\1774340481726-338078609-swaperimg.jpg', 1, '2026-03-24 13:51:21', '2026-03-24 13:51:21'),
(36, 54, 'kashmir', '4day 3night', 32000, '5', 'public\\image\\1774340548583-713666186-location.png', 1, '2026-03-24 13:52:28', '2026-03-24 13:52:28'),
(37, 55, 'aone', '1days', 7000, '5', 'public\\image\\1774340599375-503103421-greenapple-removebg-preview.png', 1, '2026-03-24 13:53:19', '2026-03-24 13:53:19');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `booking_id` int(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `user_id`, `booking_id`, `transaction_id`, `mode`, `date`, `amount`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(17, 8, 14, 'hokkk', 'online', '2026-04-04', 66, 'complete', 1, '2026-03-30 15:42:49', '2026-03-30 15:42:49');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(255) NOT NULL,
  `vendor_id` int(255) NOT NULL,
  `service_id` int(255) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `meals` int(255) NOT NULL,
  `passenger` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `restaurant_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `vendor_id`, `service_id`, `datetime`, `meals`, `passenger`, `amount`, `restaurant_img`, `is_active`, `created_at`, `update_at`) VALUES
(4, 3, 4, '2026-03-29 13:25:00.000000', 4, 4, 8000, 'public\\restaurant_img\\1774684565717-314799559-young-bearded-man-with-striped-shirt.jpg', 1, '2026-03-28 13:26:06', '2026-03-28 13:26:06');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(255) NOT NULL,
  `room_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`, `description`, `price`, `room_img`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Surat', '2bhk', 4000, '', 1, '2026-03-17 22:11:53', '2026-03-17 22:11:53'),
(2, 'go', 'girnar', 5000, '', 1, '2026-03-17 22:19:13', '2026-03-17 22:19:13'),
(3, 'manali ', 'h', 57, 'public\\room_img\\1774327992020-717257028-profile.jpg', 1, '2026-03-24 10:23:12', '2026-03-24 10:23:12');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(255) NOT NULL,
  `vendor_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `amount` int(255) NOT NULL,
  `service_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `vendor_id`, `name`, `description`, `amount`, `service_img`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 1, 'heroin', 'bus', 450, 'public\\service_img\\1774246318636-459597849-shoes.png', 1, '2026-03-23 11:41:58', '2026-03-23 11:41:58'),
(4, 1, 'hero', 'bus', 500, 'public\\service_img\\1774246916588-569488668-doctor.jpg', 1, '2026-03-23 11:51:56', '2026-03-23 11:51:56'),
(5, 3, 'BUS - Surat to Goa', 'efe', 1000, 'public\\service_img\\1774859947728-467017914-swaperimg.jpg', 1, '2026-03-30 14:09:07', '2026-03-30 14:09:07');

-- --------------------------------------------------------

--
-- Table structure for table `transportbooking`
--

CREATE TABLE `transportbooking` (
  `id` int(255) NOT NULL,
  `vendor_id` int(255) NOT NULL,
  `service_id` int(255) NOT NULL,
  `from` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL,
  `datetime` varchar(255) NOT NULL,
  `passenger` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `transport_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transportbooking`
--

INSERT INTO `transportbooking` (`id`, `vendor_id`, `service_id`, `from`, `to`, `datetime`, `passenger`, `amount`, `transport_img`, `is_active`, `created_at`, `updated_at`) VALUES
(15, 3, 3, 'suart', 'udhana', '2026-03-29T15:07', 2, 200, 'public\\transport_img\\1774258706980-165445390-doctor.jpg', 1, '2026-03-23 15:08:13', '2026-03-23 15:08:13');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone_number`, `password`, `dob`, `gender`, `address`, `is_active`, `created_at`, `updated_at`) VALUES
(8, 'Amisha Meshram', 'meshramamisha232@gmail.com', 2147483647, 'ok', '2026-03-19', 'fem', 'Vakilpeth Nagpur', 1, '2026-03-26 13:56:39', '2026-03-26 13:56:39'),
(9, 'amit', 'amit@example.com', 1234567890, 'ok', '12-12-2000', 'male', 'surat', 1, '2026-03-30 11:58:45', '2026-03-30 11:58:45');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneno` int(255) NOT NULL,
  `gstno` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `vendor_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `name`, `phoneno`, `gstno`, `email`, `type`, `company_name`, `status`, `vendor_img`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 'Amisha Pvt Ltd', 2147483647, 5752, 'meshramamisha232@gmail.com', 'transport', 'abc', 'sucess', 'public\\vendor_img\\1774247922007-664270227-cheif.jpg', 1, '2026-03-23 12:08:42', '2026-03-23 12:08:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contect`
--
ALTER TABLE `contect`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itineary`
--
ALTER TABLE `itineary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transportbooking`
--
ALTER TABLE `transportbooking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `contect`
--
ALTER TABLE `contect`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `itineary`
--
ALTER TABLE `itineary`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transportbooking`
--
ALTER TABLE `transportbooking`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
