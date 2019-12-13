const inquirer = require("inquirer"); //include inquirer module for makining prompts to get user input
const render = require("./lib/Render"); //include Render.js  module
const Manager = require("./lib/constructors/Manager"); //include Manager module
const Engineer = require("./lib/constructors/Engineer"); //include Engineer module
const Intern = require("./lib/constructors/Intern") //include Intern module
const memberArray = []; // empty array memberArray
function synth () {
    inquirer.prompt([ //use inquirer module to prompt user for managers info
        {
            type: "input",
            name: "name",
            message: "Who is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "office",
            message: "What is the manager's office number?"
        }
    ]).then(function (answers) { //make new manager object and parse apropriate strings to integers
        const manager = new Manager(answers.name, parseInt(answers.id), answers.email, parseInt(answers.office));
        memberArray.push(manager); //push manager object to  memberarray
        addMember();
    });
}
function addMember() {
    inquirer.prompt([ //promt user to add another member
        {
            type: "list",
            name: "type",
            message: "Enter new team member class?",
            choices: [
                "Engineer",
                "Intern",
                "No more team members!"
            ]
        }
    ]).then(function(answer) {
        if(answer.type === "Engineer") { //if the user chooses engineer member type run makeEng function
            makeEng();
        }
        else if (answer.type === "Intern") { //else if the user chooses intern member type run makeIntern function
            makeIntern();
        }
        else {
            render(memberArray);
        }

    })
}
function makeEng () {
    inquirer.prompt([ //promt user to add another member
        {
            type: "input",
            name: "name",
            message: "Who is the engineer?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github url?"
        }
    ]).then(function (answers) { //make new engineer object and parse apropriate strings to integers
        const engineer = new Engineer(answers.name, parseInt(answers.id), answers.email, answers.github);
        memberArray.push(engineer); //push engineer object to  memberarray
        addMember();
    });
}
function makeIntern () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Who is the intern?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What school did the intern attend?"
        }
    ]).then(function (answers) { //make new engineer object and parse apropriate strings to integers
        const intern = new Intern(answers.name, parseInt(answers.id), answers.email, answers.school);
        memberArray.push(intern); //push engineer object to  memberarray
        addMember();
    });
}
synth();