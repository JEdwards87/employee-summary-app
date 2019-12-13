const Employee = require("./Employee"); //brings in employee.js module
class Engineer extends Employee { //create class with constructor method with parent class employee
  constructor(name, id, email, github) {
    super(name, id, email);//avoids duplicating the constructor parts
    this.github = github;
  }
}
module.exports = Engineer; //allows this to be used with "require()"