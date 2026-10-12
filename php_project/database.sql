-- Maulana Shamsuddin Spiritual Services Database Schema
-- Compatible with MySQL 5.7+ / MySQL 8.0+ / MariaDB

CREATE DATABASE IF NOT EXISTS `maulana_shamsuddin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `maulana_shamsuddin`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Hero Sliders Table
CREATE TABLE IF NOT EXISTS `sliders` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `subheading` VARCHAR(255) NOT NULL,
  `heading` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `highlights` TEXT NOT NULL,
  `cta_primary_text` VARCHAR(100) NOT NULL DEFAULT 'Abhi Contact Karein',
  `cta_primary_link` VARCHAR(255) NOT NULL,
  `cta_secondary_text` VARCHAR(100) NOT NULL DEFAULT '+91 99284 09129',
  `cta_secondary_link` VARCHAR(255) NOT NULL DEFAULT 'tel:+919928409129',
  `script_quote` VARCHAR(255) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `short_description` VARCHAR(255) NOT NULL,
  `full_description` TEXT NOT NULL,
  `spiritual_benefits` TEXT,
  `process_steps` TEXT,
  `recommended_wazifa` TEXT,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) DEFAULT NULL,
  `quote` TEXT NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `service_category` VARCHAR(100) DEFAULT NULL,
  `avatar_type` VARCHAR(50) DEFAULT 'man',
  `is_approved` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Enquiries Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `service_id` VARCHAR(50) DEFAULT NULL,
  `service_title` VARCHAR(200) DEFAULT NULL,
  `consultation_type` ENUM('whatsapp', 'phone', 'either') DEFAULT 'whatsapp',
  `message` TEXT,
  `has_consent` TINYINT(1) NOT NULL DEFAULT 1,
  `status` ENUM('new', 'contacted', 'resolved') NOT NULL DEFAULT 'new',
  `admin_notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Website Content Table
CREATE TABLE IF NOT EXISTS `site_content` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Initial Sliders
INSERT INTO `sliders` (`subheading`, `heading`, `description`, `highlights`, `cta_primary_link`, `cta_secondary_link`, `script_quote`, `display_order`, `is_active`) VALUES
('Mohabbat Mein Pareshani?', 'Dua & Wazifa For Love', 'Kisi bhi wajah se toot rahi ho aapki mohabbat... Maulana Shamsuddin ki roohani madad se paayein apne pyaar, rishte aur sukoon ko wapas.', 'Dua For Love, Wazifa For Love, Ruhani Ilm, Taweez', 'https://wa.me/919928409129', 'tel:+919928409129', '“Pyar sirf dil se nahi, Rab ki raza se milta hai...”', 1, 1),
('Rishte Aur Shaadi Se Judi Pareshani?', 'Love Marriage & Relationship Guidance', 'Apni situation share karein aur ruhani rehnumai paayein. Parivaar ko manane aur rishton mein barkat ke liye sharai dua aur amal.', 'Manpasand Shaadi Dua, Waldain Ko Manana, Istikhara Rehnumai', 'https://wa.me/919928409129', 'tel:+919928409129', '“Har mushkil aasan hoti hai jab dua dil se nikalti hai...”', 2, 1),
('Har Pareshani Mein Sabr Aur Dua', 'Personal Ruhani Guidance', 'Dua, Islamic guidance aur ruhani mashware ke liye sampark karein. Zindagi ki uljhanon aur pareshaniyon ka sharai wazifa aur hal.', 'Qurani Dua & Wazifa, Gharelu Klesh Khatam, Nafsani Sukoon', 'https://wa.me/919928409129', 'tel:+919928409129', '“Allah par yaqeen rakhiye, har andhere ke baad subah aati hai...”', 3, 1);

-- Seed Initial Services
INSERT INTO `services` (`slug`, `title`, `short_description`, `full_description`, `image_url`, `display_order`, `is_active`) VALUES
('dua-for-love', 'Dua For Love', 'Mohabbat ko mazboot banane aur dilon ko jodne ke liye khaas dua.', 'Mohabbat mein aapsi ranjish, galatfehmi ya dooriyan paida ho gayi hon to Qurani duaon aur roohani amal se dilon mein mohabbat aur narmi paida ki ja sakti hai.', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', 1, 1),
('wazifa-for-love', 'Wazifa For Love', 'Pyar, rishte aur shaadi ke liye asardar wazifa.', 'Wazifa ek mukaddas zikr hai jise mukarrar waqt aur pakeezah tareeqe se kiya jata hai. Agar aap apne mahboob se shadi ya rishte mein barkat chahte hain to mashwara karein.', 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80', 2, 1),
('ruhani-ilm', 'Ruhani Ilm', 'Ruhani taqat se har mushkil ka hal, chahe wo kaisa bhi ho.', 'Ruhani Ilm Allah Taala ke asma-ul-husna aur Qurani ayaton ka noorani ilm hai jiske zariye roohani uljhanon ka ilaaj kiya jata hai.', 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80', 3, 1),
('taweez', 'Taweez', 'Hifazat, pyar, rizaq aur sukoon ke liye khaas taweez.', 'Qurani ayaton aur masnoon duaaon par mushtamil taweez roohani hifazat aur barkat ka zariya hota hai.', 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80', 4, 1),
('love-marriage', 'Love Marriage', 'Love marriage ke liye khaas amal aur dua.', 'Manpasand shadi mein aane wali rukawatein jaise waldain ki narazgi ya samajik dushwariyon ka sharai hal.', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', 5, 1),
('relationship-problem', 'Relationship Problem', 'Jeevan saathi, pati-patni ke jhagde, extra affair ka solution.', 'Mian-biwi ke aapsi jhagde, bewajah shaq ya doori ko khatam karne ke liye sharai mashwara aur dua.', 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80', 6, 1);

-- Seed Initial Testimonials
INSERT INTO `testimonials` (`name`, `location`, `quote`, `rating`, `service_category`, `is_approved`) VALUES
('Ayesha Khan', 'Mumbai', 'Maulana Shamsuddin sahab ki dua se meri love marriage ho gayi. Main hamesha unki duaon ke liye shukrguzaar hoon.', 5, 'Love Marriage Guidance', 1),
('Rizwan Ali', 'Hyderabad', 'Mere relationship mein bahut problems thi. Wazifa aur taweez ke baad sab kuch sahi ho gaya. Allah unhe khush rakhe.', 5, 'Wazifa & Taweez', 1),
('Sana Begum', 'Lucknow', 'Main bohot pareshan thi. Maulana sahab ne jo dua aur taweez diya, usse meri life mein sukoon wapas aa gaya.', 5, 'Relationship Solution', 1);

-- Seed Site Content
INSERT INTO `site_content` (`setting_key`, `setting_value`) VALUES
('site_name', 'Maulana Shamsuddin'),
('phone_display', '+91 99284 09129'),
('phone_number', '+919928409129'),
('whatsapp_number', '919928409129'),
('announcement_text', 'Allah Par Yaqeen Rakhiye, Har Mushkil Ka Hal Hai...'),
('disclaimer', 'Spiritual guidance and dua consultations are based on personal faith and Islamic counseling.');
