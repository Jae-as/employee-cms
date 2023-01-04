DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    department_id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    role_id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT(4),
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employees (
    employee_id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_firstname VARCHAR(50) NOT NULL,
    employee_lastname VARCHAR(50) NOT NULL,
    role_id INT(3),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    manager_id INT(5),
    FOREIGN KEY (manager_id) REFERENCES orgchart(employee_id)

);

CREATE TABLE orgchart (
    managerflag BOOLEAN,
    manager_firstname VARCHAR(50) NOT NULL,
    manager_lastname VARCHAR(50) NOT NULL,
    employee_id INT(5),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
