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
    db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
        if(err) throw err
        console.table(res);
        menu()
    })
}

function showEmployees() {
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function (err, res)  {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function showRoles() {
    db.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function (err, res) {
        if(err) throw err
        console.table(res);
        menu()
    })
}

//create a query for the role title to add employee
var roleArr = []
function selectRole() {
    db.query("SELECT * FROM role", function (err, res) {
        if(err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title)
        }
    })
    return roleArr
}

var managerArr = []
function selectManager() {
    db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name)
        }
    })
    return managerArr
}

//function to add a department, role, and employee
function addDepts() {
    inquirer.prompt(
    {
       type: "input",
       name: "newDepts",
       message: "What is the name of your new department?"
    }).then (function(res) {
        db.query("INSERT INTO department SET ?", (err, res) => {
            if (err) throw err
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
           type: "list",
           name: "roles",
           message: "What is the employee's role?",
           choices: selectRole()
        },
        {
           type: "rawlist",
           name: "manager",
           message: "What is the employee's manager's name?",
           choices: selectManager()
        }
    ]).then(function (res) {
        var roleId = selectRole().indexOf(res.role) +1
        var managerId = selectManager().indexOf(res.choice) +1
        db.query("INSERT INTO employee SET ?",
        {
            first_name: res.firstName,
            last_name: res.lastName,
            manager_id: managerId,
            role_id: roleId
        }, function (err, res)  {
            if (err) throw err
            console.table(res)
            menu()
        })
        
    })
}


function addRole() {
    db.query("SELECT role.title AS Title, role.salary AS salary FROM role", (err, res) => {

    inquirer.prompt([
        {
           type: "input",
           name: "Title",
           message: "What is your employee's title?"
        },
        {
           type: "input",
           name: "Salary",
           message: "What is your employee's salary?" 
        }
    ]).then(function(res) {
        db.query("INSERT INTO role SET ?",
          {
            title: res.Title,
            salary: res.Salary
          }, (err, res) => {
            if (err) throw err
            console.table(res)
            menu()
        })
    })
    })
}

function updateEmployee() {
  db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function (err, res) {
    if (err) throw err
    console.log(res)
    inquirer.prompt([
        {
         type: "rawlist",
         name: "lastName",
         choices: function() {
            var lastName = []
            for (var i = 0; i < res.length; i++) {
                return lastName
            }
         },
         message: "What is the employees last name?"
        },
        {
         type: "rawlist",
         name: "newRole",
         message: "What is your employee's new role?",
         choices: selectRole()
        }
    ]).then(function (res) {
        var roleId = selectrole().index(val.role) + 1
        db.query("UPDATE employee SET WHERE ?", {
            last_name: val.lastName
        },
        {
            role_id: roleId
        }, 
        (err, res) => {
            if (err) throw err
            console.table(res)
            menu()
        })
    })
  })
}