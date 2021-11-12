const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Status");

module.exports = client => {
  console.log("------------------------------------------------------------------------")
  readdirSync("./src/commands").forEach(dir => {
    const commands = readdirSync(`./src/commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
 
for (let file of commands) {
      let pull = require(`../../commands/${dir}/${file}`);

      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, ":check:");
      } else {
        table.addRow(
          file,
          `:x:`
        );
        continue;
      }

    }
  });
  console.log(table.toString())
console.log("------------------------------------------------------------------------")
};
