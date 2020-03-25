// Universal variables
const inquirer = require("inquirer");
const holdInfo = [];

var mysql = require("mysql");
var consoleTable = require("console.table")
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
  runSearch();
});





function userQuestions() {
  inquirer.prompt({
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
      "Update an employee?"
    ]
  })
  .then( function (answer){
    console.log(holdInfo)
    switch (answer.action){
      case "Add a department?":
        createDepartment();
        break
      case "Add a role?":
        addRole();
        break
      case "Add an employee?":
        addEmployee();
        break
        case "View a department?":
          viewDepartment();
        break  
        case "View a role?":
        viewRole();
        break  
        case "view an employee?":
        viewEmployee();
        break
        case "Update an employee?":
        updateEmployee();
        break
    }
  })
}

