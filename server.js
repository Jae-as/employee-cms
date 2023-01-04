// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");
const sequelize = require("sequelize");
const express = require("express");
const app = express();
// const { Department, Role, Employee, Orgchart } = require("./models");
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

function manageEmployees() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "manage-employees",
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
          "View Deparment Budget",
          "End Session",
        ],
      },
    ])

    .then((response) => {
    console.log(response)

      if (response === "View All Departments") {
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
      if (response === "View Deparment Budget") {
        viewDepartmentBudget();
      } else {
        endSession();
      }
    });
};

function viewDepartmens() {
  console.log("==========View All Departments==========");
  const allDepartments = Department.findAll({raw:true})
  console.table(allDepartments);
  init();
};

function viewRoles() {
  console.log("==========View All Roles==========");
  const allRoles = Role.findAll({raw:true})
  console.table(allRoles);
  init();
};

function viewEmployees() {
  console.log("==========View All Employees==========");
  const allEmployees = Employee.findAll({raw:true})
  console.table(allEmployees);
  init();
};

function addDepartment() {
  console.log("==========Add a Department==========");

  const newDepartment = inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Which department would you like to add?",
      },
    ])
    .then((updateDepartmentList) => {
      const { department_name } = updateDepartmentList;
      const department = new Department(department_name);

      //add deparment to department table and model
      app.post("/api/new-department", ({ body }, res) => {
        const sql = `INSERT INTO department (department_name) 
             VALUES (?)`;
        const params = [body.department];
        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "success",
            data: body,
          });
        });
      });
    });
};

function addRole() {
  console.log("==========Add a Role==========");

  const departmentlist = Department.findAll({ raw: true });
  const newRole = inquirer
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
        choices: departmentlist,
      },
    ])
    .then((updateRoleList) => {
      const { title, department_name } = updateRoleList;
      const role = new Role(title, department_name);

      //add role to role table and model
      app.post("/api/new-role", ({ body }, res) => {
        const sql = `INSERT INTO role (title, department_name) 
                 VALUES (?)`;
        const params = [body.role];
        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "success",
            data: body,
          });
        });
      });
    });
};

function addEmployee() {
  console.log("==========Add an Employee==========");

  const roleList = Role.findAll({ raw: true });
  const managerList = Orgchart.findAll({ raw: true });

  const newEmployee = inquirer
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
        choices: managerList,
      },
    ])
    .then((updateEmployeeList) => {
      const { first_name, last_name, title, manager } = updateEmployeeList;
      const employee = new Employee(first_name, last_name, title, manager);

      //add employee to employee table and model
      app.post("/api/new-employee", ({ body }, res) => {
        const sql = `INSERT INTO employee (first_name, last_name, title, manager) 
                 VALUES (?)`;
        const params = [body.role];
        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "success",
            data: body,
          });
        });
      });
    });
};

function updateEmployeeRole() {
  console.log("==========Update an Employee Role==========");
  const employeeList = Employee.findAll({raw:true})
  const employeeName = [];
  employeeList.forEach((employee) => {
    employeeName.push(`${employee.first_name} ${employee.last_name}, ${employee.employee_id}`)
  });

  const roleList = Role.findAll({raw:true})
  const roleInfo = [];
  roleList.forEach((role) => {
    roleInfo.push(`${role.role_id}, ${role.title}`)
  });


  const updateEmployeeInfo = inquirer.prompt([
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update?',
        choices: employeeName
    },{
        type: 'list',
        name: 'title',
        message: 'What is their new role?',
        choices: roleInfo
    }
  ])

  app.put('/api/employee/:employee_id', (req, res) => {
    const sql = `UPDATE employee SET role_id, title = ? WHERE employee_id = ?`;
    const params = [req.body.role_id, req.body.title, req.params.employee_firstname, req.params.employee_lastname];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });
};

function updateEmployeeManager() {
  console.log("==========Update Employee Manager==========");

  const employeeList = Employee.findAll({raw:true})
  const employeeName = [];
  employeeList.forEach((employee) => {
    employeeName.push(`${employee.first_name} ${employee.last_name}, ${employee.employee_id}`)
  });

  const managerList = Orgchart.findAll({raw:true})
  const managerInfo = [];
  managerList.forEach((orgchart) => {
    managerInfo.push(`${orgchart.employee_id}, ${orgchart.manager_firstname} ${orgchart.manager_lastname}`)
  })

  const updateManagerInfo = inquirer.prompt([
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update?',
        choices: employeeName
    },{
        type: 'list',
        name: 'manager',
        message: 'Who is their new manager?',
        choices: managerInfo
    }
  ])

  app.put('/api/employee/:manager_id', (req, res) => {
    const sql = `UPDATE employee SET manager_id = ? WHERE employee_id = ?`;
    const params = [req.body.role_id, req.params.manager_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

};

function employeeByManager() {
  console.log("==========View Employee by Manager==========");
  db.query(function (err, rows) {
    if (err) throw err;
    console.table(rows);
    manageEmployees();
  });
};

function deleteDepartment() {
  console.log("==========Delete Deparment==========");
  app.delete("/api/department/:department_id", (req, res) => {
    const sql = `DELETE FROM movies WHERE department_id = ?`;
    const params = [req.params.department_id];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: "Department not found",
        });
      } else {
        res.json({
          message: "deleted",
          changes: result.affectedRows,
          id: req.params.department_id,
        });
      }
    });
  });
};

function deleteRole() {
  console.log("==========Delete Role==========");
  app.delete("/api/department/:role_id", (req, res) => {
    const sql = `DELETE FROM movies WHERE role_id = ?`;
    const params = [req.params.role_id];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: "Role not found",
        });
      } else {
        res.json({
          message: "deleted",
          changes: result.affectedRows,
          id: req.params.role_id,
        });
      }
    });
  });
};

function deleteEmployeeRecord() {
  console.log("==========Delete Employee Record==========");
  app.delete("/api/department/:employee_id", (req, res) => {
    const sql = `DELETE FROM movies WHERE employee_id = ?`;
    const params = [req.params.employee_id];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: "Employee not found",
        });
      } else {
        res.json({
          message: "deleted",
          changes: result.affectedRows,
          id: req.params.employee_id,
        });
      }
    });
  });
};

function viewDepartmentBudget() {
  console.log("==========View Deparment Budget==========");
  const departmentList = Department.findAll({ raw: true });
  const department = [];
  departmentList.forEach((department) => {
    department.push(`${department.department_id} ${department.department_name}`)
  });

  const selectDepartment = inquirer.prompt([
    {
        type: 'list',
        name:'departments',
        message: 'Which department would you like to review the budget for?',
        choices: department
    }
  ])

  const employeeList = Employee.findAll({raw:true})
  const employeeName = [];
  employeeList.forEach((employee) => {
    employeeName.push(`${employee.first_name} ${employee.last_name}, ${employee.employee_id}, ${title}, ${role_id}`)
  });

  const roleSalaries = Role.findAll({raw:true})
  const roleInfo = [];
  roleSalaries.forEach((role) => {
    roleInfo.push(`${role.title}, ${role.salary}`)
  });
  
  function sum(arr) {
    return arr.reduce(function (a,b) {
        return a + b;
    }, 0);
  }

  const departmentBudget = [];
  console.log(sum(departmentBudget));

};

function endSession() {
  console.log("==========Session Ended==========");
};
