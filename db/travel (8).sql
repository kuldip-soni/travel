-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:8111
-- Generation Time: Apr 10, 2026 at 12:21 PM
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
(9, 'Exploring Jim Corbett National Park', '2026-03-01', 'Jim Corbett National Park, established in 1936 as India\'s first national park, is a premier wildlife destination in Uttarakhand known for its high Bengal tiger density and diverse landscapes, including hills, grasslands, and the Ramganga River. November to June is ideal for exploring, with jeep and canter safaris offering glimpses of tigers, elephants, and over 580 bird species. ', 'public\\blog_img\\1774941554278-472512117-tiger.jpg', 1, '2026-03-31 12:49:14', '2026-03-31 12:49:14');

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
(38, 10, 57, 39, '2026-04-16', 7, 'payment_complete', 1, '2026-04-09 14:39:05', '2026-04-09 14:39:05');

-- --------------------------------------------------------

--
-- Table structure for table `contect`
--

CREATE TABLE `contect` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `remark` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contect`
--

INSERT INTO `contect` (`id`, `name`, `email`, `mobile_no`, `subject`, `message`, `remark`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 'mantra lakhani', 'lakhanimantra4402@gmail.com', '99087877564', 'test', 'marg', 'ok', 1, '2026-04-02 15:17:03', '2026-04-02 15:17:03');

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `id` int(255) NOT NULL,
  `location_id` int(255) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `vendor_id` int(255) NOT NULL,
  `service_id` int(255) NOT NULL,
  `checkin` varchar(255) NOT NULL,
  `checkout` varchar(255) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `passenger` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `hotel_img` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`id`, `location_id`, `booking_id`, `vendor_id`, `service_id`, `checkin`, `checkout`, `datetime`, `passenger`, `amount`, `hotel_img`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(16, 57, 38, 13, 10, '6/4', '17/4', '2026-04-16 14:41:00.000000', 5, 4500, 'public\\hotel_img\\1775725923368-616804148-Lectuer-10.jpg', 'Complete', 1, '2026-04-09 14:39:49', '2026-04-09 14:39:49');

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
(12, 38, 'Corbett 2 NIghts Tour with 2 Jeep Safari', 'Day 01: Arrive Corbett National Park, night stay in Corbett\r\nOn your arrival in Corbett National Park, you will be greeted by our representative and escorted to resort. Complete Check- in formalities at the resort and freshen up. Post lunch, you can head out to visit Dhangarhi museum, Hanuman Temple or Garjia Devi Temple on your own. By evening, come back to the resort. Spend time at leisure by enjoying recreational facilities in resort premises. Later you can have your evening tea with snacks. Overnight stay in the resort.\"\\n\"\r\n\r\nDay 02: Morning & evening jeep safari in Corbett Tiger Reserve, night stay:\r\nOn day 2, you will head towards the oldest and most prestigious national park in India Corbett Park. Here you can explore the beauty and wilderness of these amazing and offbeat natural destinations. On your way in a jeep safari, you can seek the magical landscape of Corbett riverine belts, grasslands and beautiful lakes. You can witness a sheer abundance of remarkable fauna species such as Asiatic elephant, Black Bear, Sloth Bear, Sambar and the famous endangered Royal Bengal Tiger roaming around in the park. The park is home to more than 500 species of residents and migratory birds. Return to the resort and have breakfast. Post lunch get ready for the evening jeep safari which will give another opportunity to spend pleasant time amidst Corbett Jungle. Return to the resort and have sumptuous dinner. Have a sound sleep. \"\\n\"\r\n\r\nDay 03: Departure from Jim Corbett:\r\nRelish nutritious breakfast and pack your bags as Jim Corbett National Park 2 nights 3 days tour package, ends here.', 'public\\itineary_img\\1774936812961-202268082-corbett-night-stay.jpg', 1, '2026-03-31 11:30:12', '2026-03-31 11:30:12'),
(13, 39, 'short mumbai holiday', 'Day 1: Arrival & South Mumbai\'s Iconic Landmarks\r\nArrive in Mumbai, check into your hotel, and begin your exploration of South Mumbai\'s rich history and coastal beauty. <br />\r\n\r\nDay 2: Culture, Heritage & Spiritual Sites\r\nFocus on Mumbai\'s diverse cultural and architectural marvels, which blend Indian, Mughal, and British styles.\r\n\r\nDay 3: Local Life & Departure\r\nExperience more of local life before departing, or opt for specific interests like Bollywood or nature. ', 'public\\itineary_img\\1774937170426-474782800-gatewayofindia .jpg', 1, '2026-03-31 11:36:10', '2026-03-31 11:36:10'),
(14, 40, 'Ekta Dinner Cruise with Laser Show', 'A 1-night Ekta Dinner Cruise itinerary offers a 2-hour, 12 km, 7 km-long navigation channel journey on the Narmada River, featuring a buffet dinner, dancing, and laser show views of the Statue of Unity', 'public\\itineary_img\\1774937393563-395728619-ekta cruise.jpg', 1, '2026-03-31 11:39:53', '2026-03-31 11:39:53'),
(15, 41, 'devbhomi dwarka ', 'A 1-night/1-day (1N/1D) Dwarka tour focuses on the main Dwarkadhish Temple and surrounding sacred spots. Key highlights include visiting the Dwarkadhish Temple, Nageshwar Jyotirlinga, Bet Dwarka, and the scenic Gomti River', 'public\\itineary_img\\1774937679371-658290889-A lighthouse in Dwarka.avif', 1, '2026-03-31 11:44:39', '2026-03-31 11:44:39');

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
(56, 'Jim Corbett National Park', 'India\'s oldest national park, opened in 1936, with a Bengal tiger reserve, visitor centre & safaris.', 'public\\image\\1774935328748-604201038-tiger.jpg', 1, '2026-03-31 11:05:28', '2026-03-31 11:05:28'),
(57, ' Mumbai', 'Grand, Indo-Saracenic-style, 26m-tall triumphal stone arch, built on the waterfront in 1924.', 'public\\image\\1774935448963-109899696-gatewayofindia .jpg', 1, '2026-03-31 11:07:28', '2026-03-31 11:07:28'),
(58, 'Statue Of Unity', '182-m. statue of legendary activist & politician Sardar Vallabhbhai Patel created by Ram V. Sutar.', 'public\\image\\1774935548611-661966823-Statue Of Unity.jpg', 1, '2026-03-31 11:09:08', '2026-03-31 11:09:08'),
(60, 'Dwarka', 'Dwarka has the Dwarkadhish Temple dedicated to Krishna, which is one of four sacred Hindu pilgrimage sites called the Chardham founded by Adi Shankaracharya at the four corners of the country.', 'public\\image\\1774936065726-40171226-Dwarakadheesh_Temple,_2014.jpg', 1, '2026-03-31 11:17:45', '2026-03-31 11:17:45');

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
(38, 56, 'Jim Corbett Jeep Safari Booking & Tariff', '02 Night/ 03 Days', 7500, '12', 'public\\image\\1774936671941-611218288-Jim Corbett Jeep Safari Booking & Tariff.jpg', 1, '2026-03-31 11:27:51', '2026-03-31 11:27:51'),
(39, 57, 'Short Mumbai Holiday', '2night 3days', 5500, '13', 'public\\image\\1774937049564-524088998-gatewayofindia .jpg', 1, '2026-03-31 11:34:09', '2026-03-31 11:34:09'),
(40, 58, 'Ekta Dinner Cruise with Laser Show', 'Ekta Dinner Cruise with Laser Show ', 1500, '14', 'public\\image\\1774937408333-910947778-ekta cruise.jpg', 1, '2026-03-31 11:38:21', '2026-03-31 11:38:21'),
(41, 60, 'Devbhoomi Dwarka', '1day 1night', 5000, '15', 'public\\image\\1774937532735-461225507-Dwarakadheesh_Temple,_2014.jpg', 1, '2026-03-31 11:42:12', '2026-03-31 11:42:12');

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `id` int(255) NOT NULL,
  `bookin_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `passenger`
--

INSERT INTO `passenger` (`id`, `bookin_id`, `name`, `age`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 32, 'john', 20, 1, '2026-04-09 12:32:56', '2026-04-09 12:32:56');

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
(21, 10, 28, 'df', 'online', '2026-04-04', 5, 'payment_complete', 1, '2026-04-02 14:16:29', '2026-04-02 14:16:29'),
(22, 13, 29, 'vds', 'online', '2026-04-03', 555, 'payment_complete', 1, '2026-04-02 14:59:12', '2026-04-02 14:59:12'),
(23, 13, 30, '1647', 'cash', '2026-04-16', 7000, 'payment_complete', 1, '2026-04-03 10:56:11', '2026-04-03 10:56:11'),
(24, 13, 31, 'asx', 'online', '2026-04-17', 50, 'payment_complete', 1, '2026-04-03 11:09:21', '2026-04-03 11:09:21'),
(25, 13, 32, 'sfs', 'online', '2026-04-11', 5000, 'payment_complete', 1, '2026-04-03 11:13:44', '2026-04-03 11:13:44'),
(26, 10, 35, 'fok', 'cash', '2026-04-17', 4000, 'payment_complete', 1, '2026-04-09 13:56:48', '2026-04-09 13:56:48'),
(27, 10, 36, 'f4', 'online', '2026-04-16', 2000, 'payment_complete', 1, '2026-04-09 13:59:05', '2026-04-09 13:59:05'),
(28, 10, 37, 't107', 'online', '2026-04-17', 7000, 'payment_complete', 1, '2026-04-09 14:04:47', '2026-04-09 14:04:47'),
(29, 10, 38, 'f4', 'online', '2026-04-16', 4500, 'payment_complete', 1, '2026-04-09 14:39:49', '2026-04-09 14:39:49');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(255) NOT NULL,
  `location_id` int(255) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `vendor_id` int(255) NOT NULL,
  `service_id` int(255) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `meals` int(255) NOT NULL,
  `passenger` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `restaurant_img` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `location_id`, `booking_id`, `vendor_id`, `service_id`, `datetime`, `meals`, `passenger`, `amount`, `restaurant_img`, `status`, `is_active`, `created_at`, `update_at`) VALUES
(17, 57, 38, 13, 10, '2026-04-16 14:43:00.000000', 7, 7, 4500, 'public\\restaurant_img\\1775726038285-680221284-Lecture-1.jpg', 'Complete', 1, '2026-04-09 14:39:50', '2026-04-09 14:39:50');

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
(4, 'standard', 'A standard room is a hotel\'s most basic, affordable accommodation, typically featuring a king, queen, or twin bed(s)', 2000, 'public\\room_img\\1774941468290-936986041-itc room.jpg', 1, '2026-03-31 12:47:48', '2026-03-31 12:47:48');

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
(6, 8, 'itc narmada', 'The ITC Narmada, a Luxury Collection Hotel, Ahmedabad, is a 5-star hotel located at Survey No. 104 A, Judges Bunglow Road, Vastrapur, Ahmedabad-380015.', 75000, 'public\\service_img\\1774938574590-154168008-narmada.jpg', 1, '2026-03-31 11:59:34', '2026-03-31 11:59:34'),
(7, 7, 'irctc', 'suart to dwarka ,it is authorized train ticket seler provide tatkal tickets', 1300, 'public\\service_img\\1774938826249-366300625-train.jpg', 1, '2026-03-31 12:03:46', '2026-03-31 12:03:46'),
(8, 9, 'resturent', 'provide food for tour', 9000, 'public\\service_img\\1774938905553-86343339-cafe.jpg', 1, '2026-03-31 12:05:05', '2026-03-31 12:05:05'),
(9, 6, 'manali ', 'surat', 10000, 'public\\service_img\\1775453732927-576991289-shoes.png', 1, '2026-04-06 11:05:32', '2026-04-06 11:05:32'),
(10, 13, 'afasd', 'a', 100, 'public\\service_img\\1775639253344-680766497-762c859391ca4eca8e050bb82653f794_landscape_612.webp', 1, '2026-04-08 14:37:33', '2026-04-08 14:37:33'),
(11, 17, 'sawer', 'j', 10, 'public\\service_img\\1775640977356-451227535-images.jpg', 1, '2026-04-08 15:06:17', '2026-04-08 15:06:17');

-- --------------------------------------------------------

--
-- Table structure for table `transport`
--

CREATE TABLE `transport` (
  `id` int(255) NOT NULL,
  `location_id` int(255) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `vendor_id` int(255) NOT NULL,
  `service_id` int(255) NOT NULL,
  `from` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL,
  `datetime` varchar(255) NOT NULL,
  `passenger` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `transport_img` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transport`
--

INSERT INTO `transport` (`id`, `location_id`, `booking_id`, `vendor_id`, `service_id`, `from`, `to`, `datetime`, `passenger`, `amount`, `transport_img`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(36, 57, 38, 13, 10, 'suart', 'mumbai', '2026-04-16T14:40', 16, 4500, 'public\\transport_img\\1775725844408-728276537-angry bird.jpg', 'Complete', 1, '2026-04-09 14:39:49', '2026-04-09 14:39:49');

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
(10, 'amit', 'amit@example.com', 1234567890, 'ok', '12-12-2000', 'male', 'surat', 1, '2026-04-01 10:54:40', '2026-04-01 10:54:40'),
(11, 'Amisha Meshram', 'meshramamisha232@gmail.com', 2147483647, 'ok', '2026-04-02', 'fem', 'Vakilpeth Nagpur', 1, '2026-04-01 15:06:47', '2026-04-01 15:06:47'),
(12, 'Amisha Meshram', 'meshramamisha232@gmail.com', 2147483647, 'ok', '2026-04-02', 'fem', 'Vakilpeth Nagpur', 1, '2026-04-01 15:06:50', '2026-04-01 15:06:50'),
(13, 'okok', 'okok@example.com', 2147483647, 'qq', '2026-04-04', 'mal', 'qq', 1, '2026-04-02 14:34:48', '2026-04-02 14:34:48'),
(14, 'mantra lakhani', 'amit@example.com', 544, 'qq', '2026-04-25', 'fem', 'qq', 1, '2026-04-02 14:35:56', '2026-04-02 14:35:56');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(255) NOT NULL,
  `location_id` int(255) NOT NULL,
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

INSERT INTO `vendor` (`id`, `location_id`, `name`, `phoneno`, `gstno`, `email`, `type`, `company_name`, `status`, `vendor_img`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 0, 'swift bus services', 767676890, 909, 'lakhanimantra4402@gmail.com', 'transport', 'swift bus services', 'sucess', 'public\\vendor_img\\1774937876078-337253992-bus.jpg', 1, '2026-03-31 11:47:56', '2026-03-31 11:47:56'),
(7, 0, 'zero transportation', 2147483647, 7087, 'lakhanimantra4402@gmail.com', 'train transport', 'irctc', 'sucess', 'public\\vendor_img\\1774938076016-958836084-train.jpg', 1, '2026-03-31 11:51:16', '2026-03-31 11:51:16'),
(8, 0, 'itc narmada', 67890123, 676, 'lakhanimantra4402@gmail.com', 'hotel', 'itc', 'sucess', 'public\\vendor_img\\1774938202712-999068899-narmada.jpg', 1, '2026-03-31 11:53:22', '2026-03-31 11:53:22'),
(9, 0, 'mysoore cafe', 2147483647, 345, 'lakhanimantra4402@gmail.com', 'resturent', 'madars cafe pvt ltd', 'sucess', 'public\\vendor_img\\1774938321267-140129943-cafe.jpg', 1, '2026-03-31 11:55:21', '2026-03-31 11:55:21'),
(13, 57, 'kuldip7', 777777, 7777, 'lakhanimantra4402@gmail.com', 'transport', 'madars cafe pvt ltd', 'sucess', 'public\\vendor_img\\1775465163013-623455336-762c859391ca4eca8e050bb82653f794_landscape_612.webp', 1, '2026-04-06 14:16:03', '2026-04-06 14:16:03'),
(14, 60, 'kuldip', 2147483647, 777, 'lakhanimantra4402@gmail.com', 'transport', 'abc.org', 'sucess', 'public\\vendor_img\\1775465419967-683031595-architecture-ancient-monument-world-heritage-day-celebration.jpg', 1, '2026-04-06 14:20:20', '2026-04-06 14:20:20'),
(15, 58, 'mantra lakhani', 2147483647, 5566655, 'lakhanimantra4402@gmail.com', 'transport', 'itc.org', 'sucess', 'public\\vendor_img\\1775465782469-570817547-train.jpg', 1, '2026-04-06 14:26:22', '2026-04-06 14:26:22'),
(17, 57, 'jay ', 2147483647, 98, 'lakhanimantra4402@gmail.com', 'transport', 'mumbai.org', 'sucess', 'public\\vendor_img\\1775465956745-925973989-architecture-ancient-monument-world-heritage-day-celebration (1).jpg', 1, '2026-04-06 14:29:16', '2026-04-06 14:29:16'),
(18, 57, 'mantra lakhani', 2147483647, 8987, 'lakhanimantra4402@gmail.com', 'hotel', 'itc pvt ltd', 'sucess', 'public\\vendor_img\\1775553395685-725605373-itc room.jpg', 1, '2026-04-07 14:46:35', '2026-04-07 14:46:35');

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
-- Indexes for table `passenger`
--
ALTER TABLE `passenger`
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
-- Indexes for table `transport`
--
ALTER TABLE `transport`
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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `contect`
--
ALTER TABLE `contect`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `itineary`
--
ALTER TABLE `itineary`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `passenger`
--
ALTER TABLE `passenger`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `transport`
--
ALTER TABLE `transport`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
