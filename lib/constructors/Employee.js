class Employee { //create class with constructor method
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
  }
  module.exports = Employee; //allows this to be used with "require()"