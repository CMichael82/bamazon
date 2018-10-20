DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(20),
	department_name VARCHAR(20),
	price DECIMAL(10,2),
	stock_quantity INTEGER(10),
	product_sales DECIMAL(10,2),
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(20),
	over_head_costs INTEGER(10),
  PRIMARY KEY (department_id)
);

-- Creates new rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Earings", "Jewelry", 15.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Throw Pillow","Home Decor", 5.00, 43); 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blouse", "Women's Apparel", 13.00, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knit Beanie", "Women's Apparel", 9.25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skinny Tie", "Men's Apparel", 6.50, 65);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Earbud Headphones", "Electronics", 9.95, 130);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk Lamp", "Home Decor", 29.99, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canon Camera", "Electronics", 321.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sterling Ring", "Jewelry", 79.99, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Men's Apparel", 29.74, 88);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Jewelry", 5000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Decor", 7500);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Women's Apparel", 6000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Men's Apparel", 4000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 8000);

SELECT * FROM products;
SELECT * FROM departments;