SELECT roles.department_id AS department_id, department_name.department
FROM department
LEFT JOIN roles
ON roles.department_id = department_id.departments


SELECT employees.employee_id AS employee_id, employee_id.orgchart
FROM orgchart
LEFT JOIN orgchart
ON employees.manager_id = employee_id.orgchart