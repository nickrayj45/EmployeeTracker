// Universal variables
const inquirer = require("inquirer");
const holdInfo = [];

function userQuestions() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: []
  });
}
