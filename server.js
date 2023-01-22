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
        //   "View Deparment Budget",
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
  }
  //   if (response === "View Deparment Budget") {
  //     viewDepartmentBudget();
  //   }
  else {
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
  // db.query(
  //   "SELECT * FROM departments",
  //   await function (err, departmentList) {}
  // );
  const newDepartment = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "Which department would you like to add?",
    },
  ]);
  const [results] = await connection.query(
    "INSERT INTO departments (department_name) VALUES(?)", newDepartment.department_name
  );
  console.log("You have successfully added Department");
  init();
}

async function addRole(connection) {
  console.log("==========Add a Role==========");
  // db.query(
  //   "SELECT * FROM roles",
  //   await function (err, rolesList) {}
  // );
  const [departments] = await connection.query("SELECT * FROM departments");
  // console.log(departments);
  departmentList = [];
  for ( let i = 0; i < departments.length; i++ ){
    departmentList.push({name: departments[i].department_name, value: departments[i].department_id})
  }
console.log(departmentList);

  const newRole = await inquirer
    .prompt([
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
    ])
    // .then((addedRole) => {
    //   console.log(addedRole);
    const [results] = await connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)", [newRole.title, newRole.salary, newRole.department_id]
      );
      console.log("You have successfully added a new role!")
  init();
}

async function addEmployee(connection) {
  console.log("==========Add an Employee==========");
  // db.query(
  //   "SELECT * FROM employees",
  //   await function (err, rolesList) {}
  // );
  const newEmployee = await inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the new employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the new employee's last name?",
      },
      {
        type: "list",
        name: "title",
        message: "What is the new employee's title?",
        choices: roleList,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the new employee's manager?",
        choices: employeeList,
      },
    ])
    .then((response) => {
      let addedEmployee = response;
      console.log(addedEmployee);

      db.query(
        `INSERT INTO roles (first_name, last_name, title, manager) VALUES, ${addedEmplyee.first_name}, ${addedEmplyee.last_name}, ${addedEmplyee.title}, ${addedEmplyee.manager}`,
        addedEmployee,
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

async function updateEmployeeRole() {
  console.log("==========Update an Employee Role==========");
  const updateEmployeeInfo = await inquirer
    .prompt([
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
    ])
    .then((response) => {
      let employeeUpdate = response;
      console.log(
        `You are about to update ${employeeUpdate.employee} to a new role (${employeeUpdate.title})`
      );
      db.query(
        `UPDATE employees (role_id) SET ${employeeUpdate.employee} WHERE ${employeeUpdate.title}`,
        employeeUpdate,
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

async function updateEmployeeManager() {
  console.log("==========Update Employee Manager==========");
  const updateManagerInfo = await inquirer
    .prompt([
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
    ])
    .then((response) => {
      let updateManager = response;
      console.log(
        `You are about to update ${updateManager.employee}'s manager to ${updateManager.manager}`
      );
      db.query(
        `UPDATE employees (manager_id) SET ${employeeUpdate.employee}`,
        employeeUpdate,
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

async function employeeByManager() {
  console.log("==========View Employee by Manager==========");
  const searchManager = await inquirer
    .prompt([
      {
        type: "list",
        name: "manager",
        message: "Which manager employee list are you reviewing?",
        choices: managerInfo,
      },
    ])
    .then((response) => {
      db.query(
        `SELECT * FROM employees WHERE manager_id = ?`,
        response.manager,
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.table(results);
        }
      );
    });
  init();
}

async function deleteDepartment() {
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

async function deleteRole() {
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

async function deleteEmployeeRecord() {
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
