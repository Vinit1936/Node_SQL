-- Database: node

CREATE DATABASE IF NOT EXISTS `node`;
USE `node`;

-- Table: user
CREATE TABLE IF NOT EXISTS `user` (
  `id` VARCHAR(64) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;