// Import and require mysql2
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection({
  host: "127.0.0.1",
  // MySQL username,
  user: "root",
  // TODO: Add MySQL password here
  password: "password",
  database: "company_db",
});

function init() {
  console.log("==============================");
  manageEmployees();
}

async function manageEmployees() {
  const connection = await db;
  const response = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Manage Employee Database",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Update Employee Manager",
        "View Employee by Manager",
        "Delete Deparment",
        "Delete Role",
        "Delete Employee Record",
        "End Session",
      ],
    },
  ]);
  console.log(response);

  if (response.action === "View All Departments") {
    viewDepartmens(connection);
  } else if (response.action === "View All Roles") {
    viewRoles(connection);
  } else if (response.action === "View All Employees") {
    viewEmployees(connection);
  } else if (response.action === "Add a Department") {
    addDepartment(connection);
  } else if (response.action === "Add a Role") {
    addRole(connection);
  } else if (response.action === "Add an Employee") {
    addEmployee(connection);
  } else if (response.action === "Update an Employee Role") {
    updateEmployeeRole(connection);
  } else if (response.action === "Update Employee Manager") {
    updateEmployeeManager(connection);
  } else if (response.action === "View Employee by Manager") {
    employeeByManager(connection);
  } else if (response.action === "Delete Deparment") {
    deleteDepartment(connection);
  } else if (response.action === "Delete Role") {
    deleteRole(connection);
  } else if (response.action === "Delete Employee Record") {
    deleteEmployeeRecord(connection);
  } else {
    endSession();
  }
}

async function viewDepartmens(connection) {
  console.log("==========View All Departments==========");
  const [results] = await connection.query("SELECT * FROM departments");
  console.table(results);
  init();
}

async function viewRoles(connection) {
  console.log("==========View All Roles==========");
  const [results] = await connection.query("SELECT * FROM roles");
  console.table(results);
  init();
}

async function viewEmployees(connection) {
  console.log("==========View All Employees==========");
  const [results] = await connection.query("SELECT * FROM employees");
  console.table(results);
  init();
}

async function addDepartment(connection) {
  console.log("==========Add a Department==========");
  const newDepartment = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "Which department would you like to add?",
    },
  ]);
  const [results] = await connection.query(
    "INSERT INTO departments (department_name) VALUES(?)",
    newDepartment.department_name
  );
  console.log("You have successfully added Department");
  init();
}

async function addRole(connection) {
  console.log("==========Add a Role==========");

  const [departments] = await connection.query("SELECT * FROM departments");
  departmentList = [];
  for (let i = 0; i < departments.length; i++) {
    departmentList.push({
      name: departments[i].department_name,
      value: departments[i].department_id,
    });
  }
  // console.log(departmentList);

  const newRole = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Which role would you like to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department is this role associated with?",
      choices: departmentList,
    },
  ]);
  const [results] = await connection.query(
    "INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)",
    [newRole.title, newRole.salary, newRole.department_id]
  );
  console.log("You have successfully added a new role!");
  init();
}

async function addEmployee(connection) {
  console.log("==========Add an Employee==========");

  const [roles] = await connection.query("SELECT * FROM roles");
  roleList = [];
  for (let i = 0; i < roles.length; i++) {
    roleList.push({
      name: roles[i].title,
      value: roles[i].role_id,
    });
  }

  const [employees] = await connection.query("SELECT * FROM employees");
  employeeList = [];
  for (let i = 0; i < employees.length; i++) {
    employeeList.push({
      name:
        employees[i].employee_firstname + " " + employees[i].employee_lastname,
      value: employees[i].employee_id,
    });
  }

  const newEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "employee_firstname",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "employee_lastname",
      message: "What is the new employee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the new employee's title?",
      choices: roleList,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the new employee's manager?",
      choices: employeeList,
    },
  ]);
  const [results] = await connection.query(
    "INSERT INTO employees (employee_firstname, employee_lastname, role_id, manager_id) VALUES(?, ?, ?, ?)",
    [
      newEmployee.employee_firstname,
      newEmployee.employee_lastname,
      newEmployee.role_id,
      newEmployee.manager_id,
    ]
  );
  console.log("You have successfully added a new employee!");
  init();
}

async function updateEmployeeRole(connection) {
  console.log("==========Update an Employee Role==========");

  const [roles] = await connection.query("SELECT * FROM roles");
  roleList = [];
  for (let i = 0; i < roles.length; i++) {
    roleList.push({
      name: roles[i].title,
      value: roles[i].role_id,
    });
  }

  const [employees] = await connection.query("SELECT * FROM employees");
  employeeList = [];
  for (let i = 0; i < employees.length; i++) {
    employeeList.push({
      name:
        employees[i].employee_firstname + " " + employees[i].employee_lastname,
      value: employees[i].employee_id,
    });
  }

  const updateEmployeeInfo = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee do you want to update?",
      choices: employeeList,
    },
    {
      type: "list",
      name: "title",
      message: "What is their new role?",
      choices: roleList,
    },
  ]);

  const [results] = await connection.query(
    "UPDATE employees SET role_id = ? WHERE employee_id = ? ",[updateEmployeeInfo.role_id, updateEmployeeInfo.employee_id]
  );
  console.log(results);
  console.log("You have successfully updated an Employee's Role!");
  init();
}

async function updateEmployeeManager(connection) {
  console.log("==========Update Employee Manager==========");

  const [employees] = await connection.query("SELECT * FROM employees");
  employeeList = [];
  for (let i = 0; i < employees.length; i++) {
    employeeList.push({
      name:
        employees[i].employee_firstname + " " + employees[i].employee_lastname,
      value: employees[i].employee_id,
    });
  }

  const updateManagerInfo = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee do you want to update?",
      choices: employeeList,
    },
    {
      type: "list",
      name: "manager",
      message: "Who is their new manager?",
      choices: employeeList,
    },
  ]);

  const [results] = await connection.query(
    "UPDATE employees SET manager_id = ? WHERE employee_id = ? ",[updateManagerInfo.manager_id, updateManagerInfo.employee_id]
  );
  console.log(results);
  console.log("You have successfully updated an Employee's Manager!");
  init();
}

async function employeeByManager(connection) {
  console.log("==========View Employee by Manager==========");

  const [employees] = await connection.query("SELECT * FROM employees");
  employeeList = [];
  for (let i = 0; i < employees.length; i++) {
    employeeList.push({
      name:
        employees[i].employee_firstname + " " + employees[i].employee_lastname,
      value: employees[i].employee_id,
    });
  }

  const searchManager = await inquirer
    .prompt([
      {
        type: "list",
        name: "manager",
        message: "Which manager's employee list are you reviewing?",
        choices: employeeList,
      },
    ])
    const [results] = await connection.query(
        "SELECT * FROM employees WHERE manager_id = ?", searchManager.employeeList
    );
    console.table(results);
    init();
}

async function deleteDepartment(connection) {
  console.log("==========Delete Deparment==========");
  const searchDepartment = await inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department would you like to delete?",
        choices: departmentList,
      },
    ])
    .then((response) => {
      db.query(
        `DELETE FROM departments WHERE department_id = ?`,
        response,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
        }
      );
    });
  init();
}

async function deleteRole(connection) {
  console.log("==========Delete Role==========");
  const searchRoles = await inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which role would you like to delete?",
        choices: roleList,
      },
    ])
    .then((response) => {
      db.query(
        `DELETE FROM roles WHERE role_id = ?`,
        response,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
        }
      );
    });
  init();
}

async function deleteEmployeeRecord(connection) {
  console.log("==========Delete Employee Record==========");
  const searchEmployees = await inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee record would you like to delete?",
        choices: employeeList,
      },
    ])
    .then((response) => {
      db.query(
        `DELETE FROM employees WHERE employee_id = ?`,
        response,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
        }
      );
    });
  init();
}

function endSession() {
  console.log("==========Session Ended==========");
}

init();
