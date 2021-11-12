const { readdirSync } = require('fs');

module.exports = (client) => {
	let events = readdirSync("./src/events/").filter(x => x.endsWith(".js")).map(x => x.split(".")[0]);
	events.forEach(file => {
		client.on(file, require(`../../events/${file}`).bind(null, client));
		console.log(`Iniciado el evento ${file}`)
	});
};