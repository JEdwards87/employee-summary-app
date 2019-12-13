const fs = require("fs"); //include node.js file system module
const path = require("path"); //include node.js path module to work with directory and file paths
const util = require("util"); //include node.js utilities (promisify)
const Manager = require("./constructors/Manager"); //include custom modules
const Engineer = require("./constructors/Engineer"); //include custom modules
const Intern = require("./constructors/Intern"); //include custom modules
const tempD = path.resolve(__dirname, "../templates"); //resolve specified path to absolute path
const buildD = path.resolve(__dirname, "../build/"); //resolve specified path to absolute path
const writeFile = util.promisify(fs.writeFile); //convert async to promise based
const readFile = util.promisify(fs.readFile); //convert async to promise based


async function render(employees) {
  const html = [];
  const [
    managerTemp,
    engineerTemp,
    internTemp,
    mainTemp
  ] = await Promise.all([
    readFile(path.resolve(tempD, "manager.html"), "utf8"), 
    readFile(path.resolve(tempD, "engineer.html"), "utf8"),
    readFile(path.resolve(tempD, "intern.html"), "utf8"),
    readFile(path.resolve(tempD, "main.html"), "utf8")
  ]);
  html.push(
    employees
      .filter(employee => employee instanceof Manager)
      .map(employee => {
        let template = managerTemp;
        for (const key in employee) {
          template = pHolder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );
  html.push(
    employees
      .filter(employee => employee instanceof Engineer)
      .map(employee => {
        let template = engineerTemp;
        for (const key in employee) {
          template = pHolder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );
  html.push(
    employees
      .filter(employee => employee instanceof Intern)
      .map(employee => {
        let template = internTemp;
        for (const key in employee) {
          template = pHolder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );
  if (!fs.existsSync(buildD)) { //check if a build directory exist, if not one is created.
    fs.mkdirSync(buildD);
  }
  await writeFile( //writes the promisified build file to the build directory
    path.resolve(buildD, "index.html"), //path.resolve resolves path segments to absolute path 
    pHolder(mainTemp, "body", html.join("")) //join body target in main.html template
  );
}
function pHolder(template, target, value) {
  const regex = new RegExp("{{ " + target + " }}", "gm"); //- g : global (doesn't stop after first match) - m : multi-line
  const newTemp = template.replace(regex, value); //
  return newTemp;
}
module.exports = render; //allow this to be used as module in index.js