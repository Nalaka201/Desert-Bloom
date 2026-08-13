-- ==========================================================
-- Farmer & Admin System - Complete MySQL Database Schema
-- ==========================================================

CREATE DATABASE IF NOT EXISTS farmer_system;
USE farmer_system;

-- 1. Admins Table (For Admin Panel Access)
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Recommended to store as HASH
    full_name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Farmers Table (User Accounts)
CREATE TABLE IF NOT EXISTS farmers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nic VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    location VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Suppliers Table
CREATE TABLE IF NOT EXISTS suppliers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products Table (Seeds)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT,
    supplier_name VARCHAR(255),
    total_amount DECIMAL(10,2) NOT NULL,
    remaining_balance DECIMAL(10,2) DEFAULT 0.0,
    status ENUM('Pending', 'Partial', 'Completed', 'Cancelled') DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE SET NULL
);

-- 6. Order Items Table (Detailed Order Breakdown)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    item_type VARCHAR(255) NOT NULL, -- e.g., '999 Corn'
    quantity VARCHAR(50) NOT NULL,    -- e.g., '20kg'
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- 7. Site Content Table (Admin manages this)
CREATE TABLE IF NOT EXISTS site_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'heroTitle1'
    content_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================================
-- Initial Data (Sample)
-- ==========================================================

-- Default Admin (Already in mysql_database.sql)
INSERT INTO admins (username, password, full_name) VALUES 
('admin', 'admin123', 'System Administrator');

-- Sample Site Content
INSERT INTO site_content (content_key, content_value) VALUES 
('heroTitle1', 'Plant with Confidence,'),
('heroTitle2', 'Harvest with Pride'),
('heroSubtitle', 'Premium seeds and expert suppliers for your farm\'s success.');

-- Sample Supplier
INSERT INTO suppliers (id, name, location, rating, description) VALUES 
('ceylon-seeds', 'Ceylon Seeds Ltd.', 'Colombo', 4.8, 'Best local seeds provider');

-- Sample Products
INSERT INTO products (supplier_id, name, code, price) VALUES 
('ceylon-seeds', '999 Corn', 'CRN-999', 2000.00),
('ceylon-seeds', '894 Corn', 'CRN-894', 1800.00);
