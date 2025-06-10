-- DATABASE
-- CREATE DATABASE IF NOT EXISTS `mombasa_app`;
-- USE `mombasa_app`;

-- Host: sql8.freesqldatabase.com
-- Database name: sql8778768
-- Database user: sql8778768
-- Database password: 9thwJWzyMc
-- Port number: 3306

-- mysql -h sql8.freesqldatabase.com -P 3306 -u sql8778768 -p 9thwJWzyMc
drop database IF  EXISTS mombasa_app;
use defaultdb;


-- USERS
CREATE TABLE IF NOT EXISTS mombasa_app_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(15),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DEPARTMENTS
CREATE TABLE IF NOT EXISTS mombasa_app_departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    contact_info TEXT
);

-- REPORTS
CREATE TABLE IF NOT EXISTS mombasa_app_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    department_id INT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES mombasa_app_users(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES mombasa_app_departments(id) ON DELETE SET NULL
);

-- REPORT IMAGES
CREATE TABLE IF NOT EXISTS mombasa_app_report_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    image_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES mombasa_app_reports(id) ON DELETE CASCADE
);

-- VOTES
CREATE TABLE IF NOT EXISTS mombasa_app_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    user_id INT NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_vote (report_id, user_id),
    FOREIGN KEY (report_id) REFERENCES mombasa_app_reports(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES mombasa_app_users(id) ON DELETE CASCADE
);

-- COMMENTS
CREATE TABLE IF NOT EXISTS mombasa_app_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    user_id INT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES mombasa_app_reports(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES mombasa_app_users(id) ON DELETE SET NULL
);

-- ALERTS
CREATE TABLE IF NOT EXISTS mombasa_app_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    severity ENUM('low', 'medium', 'high'),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES mombasa_app_users(id) ON DELETE SET NULL
);

-- REPORT-DEPARTMENT ASSIGNMENTS (Many-to-Many, Optional)
CREATE TABLE IF NOT EXISTS mombasa_app_report_departments (
    report_id INT NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (report_id, department_id),
    FOREIGN KEY (report_id) REFERENCES mombasa_app_reports(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES mombasa_app_departments(id) ON DELETE CASCADE
);
