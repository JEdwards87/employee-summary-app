const Employee = require("./Employee"); //brings in employee.js module
class Manager extends Employee { //create class with constructor method  with parent class employee
  constructor(name, id, email, officeNumber) {
    super(name, id, email);//avoids duplicating the constructor parts
    this.officeNumber = officeNumber;
  }
}
module.exports = Manager; //allows this to be used with "require()"