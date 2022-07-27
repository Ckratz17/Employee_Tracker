//import msql2, inquirer
const inquirer = require("inquirer");
const mysql = require("mysql2");

//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',

      port: 3306,
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'rootroot',
      database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

db.connect(function(err) {
    if(err) throw err;
    menu()
})

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
            "Add department",
            "Add Role",
            "Update an employee's role",
            "Exit"
        ]
    }).then(function (answer) {
        switch (answer.menu) {
            case "View all departments": showDepts();
            break;

            case "View all employees": showEmployees();
            break;

            case "View all roles": showRoles();
            break;

            case "Add employee": addEmployees();
            break;

            case "Add department": addDepts();
            break;

            case "Add Role": addRole();
            break;

            case "Update an employee's role": updateRole();
            break;

            case "Exit": db.end
        }
    })
}
//function to show all departments, roles and employees
function showDepts() {
    db.query("SELECT * FROM department", (err, res) => {
        console.table(res);
        menu()
    })
}

function showEmployees() {
    db.query
        ("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department,role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", (err, res) => {
            console.table(res)
            menu()
        })
}

function showRoles() {
    db.query("SELECT * FROM roles", (err, res) =>{
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
        db.query(`INSERT INTO department (department_name) VALUES ("${newDept}")`, (err, res) => {
            console.table(res)
            menu()
        })
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
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${roleId}", "${managerId}")`, (err, res) => {
            console.table(res)
            menu()
        })
        
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
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${deptId}")`, (err, res) => {
            console.table(res)
            menu()
        })
    })
}

function updateRole() {
    inquirer.prompt([
        {
         type: "input",
         name: "emplUpdate",
         message: "What is the employees new id?"
        },
        {
         type: "input",
         name: "newRole",
         message: "What is the id for the new role?"
        }
    ]).then(function (res) {
        const updateEmpl = res.emplUpdate
        const newRole = res.newRole
        db.query(`UPDATE employee SET role_id = "${newRole}" Where id = "${updateEmpl}"`, (err, res) => {
            console.table(res)
            menu()
        })
    })
}