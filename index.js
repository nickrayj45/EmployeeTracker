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
  password: "",
  database: "work_db"
});

connection.connect(function(err) {
  if (err) throw err;
  userQuestions();
});

// Function to ask the user what they would like to do
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
        "View a department?",
        "View a role?",
        "View an employee?",
        "Update an employee's role?",
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
        case "Complete?":
          connection.end();
          process.exit();
      }
    });
}

// Functions that allow the user to enter in the data
// Function that creates the deaprtment
function createDepartment() {
  inquirer
    .prompt({
      name: "newDept",
      type: "input",
      message: "What is the name of the department would you like to add?"
    })
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.newDept
        },
        function(err, res) {
          if (err) throw err;
          // console.log(res);
          console.table(res);
          console.log("You created a new department");
          userQuestions();
        }
      );
    });
}

// Function that allows the user to create a role
function createRole() {
  inquirer
    .prompt([
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
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.newRole,
          salary: answer.addSalary,
          department_id: answer.deptId
        },

        function(err, res) {
          if (err) throw err;
          console.log("You created a new role");
          userQuestions();
        }
      );
    });
}

// Function that allows the user to add an employee

function addEmployee() {
  connection.query("SELECT * FROM role", function(err, res) {
    var roleChoices = res.map(({ id, title }) => ({ value: id, name: title }));
    // console.log(roleChoices);

    connection.query(
      "SELECT first_name, last_name, employee.id FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE role.title = 'Manager'",
      function(err, res) {
        var managerList = res.map(({ first_name, last_name, id }) => ({
          value: id,
          name: `${first_name} ${last_name}`
        }));
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the employee's first name?"
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name?"
            },
            {
              name: "role",
              type: "input",
              message: "What is the employee's role number?",
              choices: roleChoices
            }
          ])
          .then(function(answer) {
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role
              },
              function(err) {
                if (err) throw err;
                console.log("You created a new employee");
                userQuestions();
              }
            );
          });
      }
    );
  });
}

// View functions should be select queries console.log(response from queries)
// Function that allows the user to view the departments created
function viewDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
    userQuestions();
  });
}
// Function that allows the user to view the roles created
function viewRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.table(res);
    userQuestions();
  });
}

// Function that allows the user to view the employees created
function viewEmployee() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    userQuestions();
  });
}

// Function that allows the user to update information for an employee
function updateEmployee() {
  inquirer
    .prompt([
      {
        name: "FirstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "LastName",
        type: "input",
        message: "What is the employee's new role ID?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE employee SET fist_name, last_name, role_id WHERE role",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id
        },
        function(err, res) {
          if (err) throw err;
          console.log("You have updated a role");
          userQuestions();
        }
      );
    });
}
