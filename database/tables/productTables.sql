-- // CREATE TABLE products (
-- //     id INT AUTO_INCREMENT PRIMARY KEY,
-- //     name VARCHAR(255) NOT NULL,
-- //     price DECIMAL(10, 2) NOT NULL,
-- //     description TEXT,
-- //     quantity INT DEFAULT 0,
-- //     category VARCHAR(255),
-- //     farmer_id INT NOT NULL,
-- //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- //     FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
-- // );