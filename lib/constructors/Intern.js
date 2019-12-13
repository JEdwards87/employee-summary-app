const Employee = require("./Employee"); //brings in employee.js module
class Intern extends Employee { //create class with constructor method with parent class employee
  constructor(name, id, email, school) {
    super(name, id, email);//avoids duplicating the constructor parts
    this.school = school;
  }
}
module.exports = Intern; //allows this to be used with "require()"