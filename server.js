// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);


const manageEmployees = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'manage-employees',
            message: 'Manage Employee Database',
            choices: [
                'View All Departments', 
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update Employee Manager',
                'View Employee by Manager',
                'Delete Deparment',
                'Delete Role',
                'Delete Employee Record',
                'View Deparment Budget',
                'End Session'
            ]
        }
    ])

    .then((response) => {
        const {response} = response;

        if (response === 'View All Departments'){viewDepartmens();}
        if (response === 'View All Roles'){viewRoles();}
        if (response === 'View All Employees'){viewEmployees();}
        if (response === 'Add a Department'){addDepartment();}
        if (response === 'Add a Role'){addRole();}        
        if (response === 'Add an Employee'){addEmployee();}
        if (response === 'Update an Employee Role'){updateEmployeeRole();}
        if (response === 'Update Employee Manager'){updateEmployeeManager();}
        if (response === 'View Employee by Manager'){employeeByManager();}
        if (response === 'Delete Deparment'){deleteDepartment();}
        if (response === 'Delete Role'){deleteRole();}
        if (response === 'Delete Employee Record'){deleteEmployeeRecord();}
        if (response === 'View Deparment Budget'){viewDepartmentBudget();}
        else {endSession();}
    })
};

viewDepartmens = () => {
    console.log('==========View All Departments==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });

};

viewRoles = () => {
    console.log('==========View All Roles==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

viewEmployees = () => {
    console.log('==========View All Employees==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

addDepartment = () => {
    console.log('==========Add a Department==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

addRole = () => {
    console.log('==========Add a Role==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

addEmployee = () => {
    console.log('==========Add an Employee==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

updateEmployeeRole = () => {
    console.log('==========Update an Employee Role==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

updateEmployeeManager = () => {
    console.log('==========Update Employee Manager==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

employeeByManager = () => {
    console.log('==========View Employee by Manager==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

deleteDepartment = () => {
    console.log('==========Delete Deparment==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

deleteRole = () => {
    console.log('==========Delete Role==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

deleteEmployeeRecord = () => {
    console.log('==========Delete Employee Record==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

viewDepartmentBudget = () => {
    console.log('==========View Deparment Budget==========')
    db.query(

    function (err,rows){
        if (err) throw err;
        console.table(rows);
        manageEmployees();
    });
};

endSession = () => {
    console.log('==========Session Ended==========')
};