const { Client, Collection } = require("discord.js");
const config = require('./src/config/config.json')
const client = new Client({
  disableMentions: "everyone",
  allowedMentions: { repliedUser: false, parse: ["users"] },
  intents: [32767],
})

client.commands = new Collection();
client.cooldowns = new Collection();


["command", "event"].forEach(handler => {
  require(`./src/utils/handlers/${handler}`)(client);
});

client.login(config.token)