// Universal variables
const inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require("console.table");

// We might use this later
// const holdInfo = [];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "4461Gate!",
  database: "work_db"
});

connection.connect(function(err) {
  if (err) throw err;
  userQuestions();
});

function userQuestions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        // Questions
        "Add a department?",
        "Add a role?",
        "Add an employee?",
        "View a depratment",
        "View a role?",
        "View an employee?",
        "Update an employee's role??",
        "Complete?"
      ]
    })
    .then(function(answer) {
      // console.log(holdInfo);
      switch (answer.action) {
        case "Add a department?":
          createDepartment();
          break;
        case "Add a role?":
          createRole();
          break;
        case "Add an employee?":
          addEmployee();
          break;
        case "View a department?":
          viewDepartment();
          break;
        case "View a role?":
          viewRole();
          break;
        case "View an employee?":
          viewEmployee();
          break;
        case "Update an employee?":
          updateEmployee();
          break;
        case "Complete?"  :
        connection.end();
        process.exit();
      }
    });
}

function createDepartment() {
  inquirer.prompt({
      name: "newDept",
      type: "input",
      message: "What is the name of the department would you like to add?"
  })   
  .then(function(answer) {
      //no need for user to view this
      //var query = "SELECT name FROM department";
      connection.query("INSERT INTO department SET ?",
      {
          name: answer.newDept
      },
      function(err, res) {
          if (err) throw err;
          console.log(res)
          console.table(res)
          console.log("You created a new department")

      })

      userQuestions()

  })
}

function createRole() {
  inquirer.prompt([
    {
      name: "newRole",
      type: "input",
      message: "What role would you like to add?"
    },
    {
      name: "addSalary",
      type: "input",
      message: "What is the salary of this role?"
    },
    {
      name: "deptId",
      type: "input",
      message: "What is the department ID?"
    }])   
  .then(function(answer) {
      //no need for user to view this
      //var query = "SELECT name FROM department";
      connection.query("SELECT id FROM department INNER JOIN role ON department_id?",
      {
          title: answer.newRole,
          salary: answer.addSalary,
          department_id: answer.deptId
      },
      function(err, res) {
          if (err) throw err;
          console.log("You created a new role")
      })
  })
}
//   function addEmployee() {
//     inquirer.prompt([
//       {
//         name: "first_name",
//         type: "input",
//         message: "What is the employee's first name?"
//       },
//       {
//         name: "last_name",
//         type: "input",
//         message: "What is the employee's last name?"
//       },
//       {
//         name: "role",
//         type: "input",
//         message: "What is the employee's role?"
//       }])   
//     .then(function(answer) {
//         //no need for user to view this
//         //var query = "SELECT name FROM department";
//         connection.query("INSERT INTO department SET ?",
//         {
//             first_name: answer.first_name,
//             last_name: answer.last_name,
//             role: answer.role
//         },
//         function(err, res) {
//             if (err) throw err;
//             console.log("You created a new employee")
//         })
//     })
  

// }

// View functions should be select queries console.log(response from queries)