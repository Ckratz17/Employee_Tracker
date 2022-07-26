// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

//import msql2, inquirer
const mysql = require("mysql2")
const inquirer = require("inquirer")

//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'rootroot',
      database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

//inquirer for prompts
function menu() {
    inquirer.prompt({
        type: "list",
        name: "menu",
        message: "Select an option.",
        choices: [
            "View all departments",
            "View all employees",
            "View all roles",
            "Add employee",
            "Add Role",
            "Update an employee's role",
        ]
    }).then(function (answer) {

    })
}
//function to show all departments, roles and employees
function showDepts() {
    db.query(`SELECT * FROM department`, (err, res) => {
        console.table(res);
        menu()
    })
}

function showEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department,`)
}

function showRoles() {
    db.query(`SELECT * FROM roles`, (err, res) =>{
        console.table(res);
        menu()
    })
}

//function to add a department, role, and employee
function addDepts() {
    inquirer.prompt(
    {
       type: "input",
       name: "newDepts",
       message: "What is the name of your new department?"
    }).then (function(res) {
        const newDept = res.newDepts
        db.query(``)
    })

}

function addEmployees() {
    inquirer.prompt([
        {
           type: "input",
           name: "firstName",
           message: "What is the first name of your new employee?"
        },
        {
           type:  "input",
           name: "lastName",
           message: "What is the last name of your new employee?"
        },
        {
           type: "input",
           name: "roleId",
           message: "What is the employee's role ID?"
        },
        {
           type: "input",
           name: "managerId",
           message: "What is the employee's manager's ID?"
        }
    ]).then(function (res) {
        const firstName = res.fistName
        const lastName = res.lastName
        const roleId = res.roleId
        const managerId = res.managerId
        db.query(``)
        
    })
}

function addRole() {
    inquirer.prompt([
        {
           type: "input",
           name: "empTitle",
           message: "What is your employee's title?"
        },
        {
           type: "input",
           name: "empSalary",
           message: "What is your employee's salary?" 
        },
        {
           type: "input",
           name: "empId",
           message: "What is your employee's ID?"
        }
    ]).then(function(res) {
        const title = res.empTitle
        const salary = res.empSalary
        const deptId = res.empId
        db.query()
    })
}