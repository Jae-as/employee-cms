// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const table = require("console.table");
// const sequelize = require("sequelize");
const express = require("express");
const app = express();
const { Department, Role, Employee, Orgchart } = require("./models");
const { init } = require("./models/employee");
const { response } = require("express");
// const { init } = require("./models/employee");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

manageEmployees();

let departmentList = db.query(
  "SELECT * FROM departments",
  function (err, results) {
    console.table(results);
  }
);

let roleList = db.query("SELECT * FROM roles", function (err, results) {
  console.table(results);
});

let employeeList = db.query("SELECT * FROM employees", function (err, results) {
  console.table(results);
});

function manageEmployees() {
  inquirer
    .prompt([
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
    ])

    .then((response) => {
      console.log(response);

      if (response.action === "View All Departments") {
        viewDepartmens();
      }
      if (response === "View All Roles") {
        viewRoles();
      }
      if (response === "View All Employees") {
        viewEmployees();
      }
      if (response === "Add a Department") {
        addDepartment();
      }
      if (response === "Add a Role") {
        addRole();
      }
      if (response === "Add an Employee") {
        addEmployee();
      }
      if (response === "Update an Employee Role") {
        updateEmployeeRole();
      }
      if (response === "Update Employee Manager") {
        updateEmployeeManager();
      }
      if (response === "View Employee by Manager") {
        employeeByManager();
      }
      if (response === "Delete Deparment") {
        deleteDepartment();
      }
      if (response === "Delete Role") {
        deleteRole();
      }
      if (response === "Delete Employee Record") {
        deleteEmployeeRecord();
      }
      //   if (response === "View Deparment Budget") {
      //     viewDepartmentBudget();
      //   }
      else {
        endSession();
      }
    });
}

async function viewDepartmens() {
  console.log("==========View All Departments==========");
  db.query(
    "SELECT * FROM departments",
    await function (err, results) {
      console.table(results);
    }
  );
  init();
}

async function viewRoles() {
  console.log("==========View All Roles==========");
  db.query(
    "SELECT * FROM roles",
    await function (err, results) {
      console.table(results);
    }
  );
  init();
}

async function viewEmployees() {
  console.log("==========View All Employees==========");
  db.query(
    "SELECT * FROM employees",
    await function (err, results) {
      console.table(results);
    }
  );
  init();
}

async function addDepartment() {
  console.log("==========Add a Department==========");
  // db.query(
  //   "SELECT * FROM departments",
  //   await function (err, departmentList) {}
  // );
  const newDepartment = await inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Which department would you like to add?",
      },
    ])
    .then((response) => {
      let addedDepartment = response;
      console.log(addedDepartment);

      db.query(
        `INSERT INTO departments (department_name) VALUES ${addedDepartment.department_name}`,
        addedDepartment,
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

async function addRole() {
  console.log("==========Add a Role==========");
  // db.query(
  //   "SELECT * FROM roles",
  //   await function (err, rolesList) {}
  // );
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
        name: "department_name",
        message: "Which department is this role associated with?",
        choices: departmentList,
      },
    ])
    .then((response) => {
      let addedRole = response;
      console.log(addedRole);

      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ${addedRole.title}, ${addedRole.salary}, ${addedRole.department_name}`,
        addedRole,
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

async function addEmployee() {
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
