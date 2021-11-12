module.exports = async (client) => {
    console.log(`[CLIENT] client Connected`);
    setInterval(function () {
        let stats = ["Code By Syntax"]

        let nm = stats[Math.floor(Math.random() * stats.length)];
        client.user.setPresence({
            activities: [
                {
                    name: nm,
                    type: "WATCHING", // COMPETING, WATCHING, PLAYING, LISTENING, STREAMING
                    status: "dnd" // online, ofline, idle, dnd
                }
            ],
        });
    }, 15000);

}