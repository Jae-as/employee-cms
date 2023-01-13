INSERT INTO departments (department_name, department_id)
VALUES
('Engineering', 0001),
('Product Management',0002),
('Project Management', 0003),
('Sales & Marketing', 0004),
('Human Resources', 0005),
('Operations', 0006),
('Legal', 0007);

INSERT INTO roles (title, role_id, salary, department_id)
VALUES
('Technical Lead', 108, 300000, 0001),
('Senior Developer',119, 250000, 0001),
('Junior Developer', 118, 100000, 0001),
('Product Manager', 107, 255000, 0002),
('Business Analyst', 117, 90000, 0002),
('Scrum Master', 106, 255000, 0003),
('Sales Manager', 105, 250000, 0004),
('Sales Representative', 115, 75000, 0004),
('Marketing Manager', 104, 220000, 0004),
('Marketing Analyst', 114, 85000, 0004),
('Human Resources Manager', 103, 215000, 0005),
('Human Resources Analyst', 113, 60000, 0005),
('Operations Manager', 102, 275000, 0006),
('Operations Analyst', 112, 100000, 0006),
('Finance Manager', 101, 280000, 0006),
('Finance Analyst', 111, 120000, 0006),
('General Council', 005, 350000, 0007),
('Chief Technology/Digital Officer', 004, 1200000, 0006),
('Chief Financial Office', 003, 1500000, 0006),
('Chief Operations Officer', 002, 2000000, 0006),
('Chief Executive Officer', 001, 2500000, 0006);

-- INSERT INTO orgchart (managerflag, manager_firstname, manager_lastname, employee_id)
-- VALUES
-- ('Ariel', 'Munroe', 00001)
-- ('Sasha', 'Morley', 00002)
-- ('Steve', "Patton", 00003)
-- ('Matthew', 'Forbes', 00004)
-- ('James', 'Brown', 00005)
-- ('Christina', 'Wilberforce', 00006)
-- ('Simone', 'Alexander', 00007)
-- ('Ashley', 'Smith', 00008)
-- ('Bejamin', 'Larson', 00009)
-- ('Meredy', 'Aitken', 00010)
-- ('Tim', 'Song', 00011)
-- ('Peter', 'King', 00012)
-- ('Julia', 'Saunders', 00013)

INSERT INTO employees (employee_firstname, employee_lastname, employee_id, role_id, manager_id)
VALUES
('Ariel', 'Munroe', 00001, 001, NULL),
('Sasha', 'Morley', 00002, 002, 00001),
('Steve', "Patton", 00003, 003, 00001),
('Matthew', 'Forbes', 00004, 004, 00001),
('James', 'Brown', 00005, 005, 00001),
('Christina', 'Wilberforce', 00006, 101, 00003),
('Simone', 'Alexander', 00007, 102, 00002),
('Ashley', 'Smith', 00008, 103, 00002),
('Bejamin', 'Larson', 00009, 104, 00004),
('Meredy', 'Aitken', 00010, 105, 00006),
('Tim', 'Song', 00011, 106, 00006),
('Peter', 'King', 00012, 107, 00006),
('Julia', 'Saunders', 00013, 108, 00006);
