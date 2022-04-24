// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown");

// An array of questions for user input
const questions = [
    {
        message: "What is your Application/Repo Title?",
        name: "repoTitle"
      },
      {
        message: "Provide a comprehensive application description:",
        name: "description"
      },
      {
        message: " Provide instructions to install your application: ",
        name: "install"
      },
      {
        message: "Your repo's usage",
        name: "usage"
      },
      {
        message: "Select a license to add to your repo",
        name: "license",
        type: "list",
        choices: ["mit", "gpl", "mozilla", "none"],
        filter(val) {
          return val.toUpperCase();
        }
      },
      {
        message: "Contributing guidelines: ",
        name: "contributing"
      },
      {
        message: "Tests",
        name: "tests"
      },
      {
        message: "Provide contact email",
        name: "email"
      },
      {
        message: "Input author's github username",
        name: "username"
      }
];

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName,data,(err) =>
  err ? console.error(err) : console.log('Success!'));
}

// Function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
       console.log(answers);
       mdFile = generateMarkdown(answers);
       writeToFile('README.md',mdFile);
      });
}

// Function call to initialize app
init();
