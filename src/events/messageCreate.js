const config = require('../config/config.json')
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");

module.exports = async function (client, message) {

	const prefix = config.prefix
	if (!message.content.startsWith(prefix)
		|| message.author.bot
		|| !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")
		|| !message.guild.available
		|| !message.channel.permissionsFor(message.channel.guild.me).has("VIEW_CHANNEL")) return;
	if (!message.channel.permissionsFor(message.channel.guild.me).has("EMBED_LINKS")) {
		return message.reply({ content: `I dont have permission for this command \`EMBED_LINKS\``, });
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (command.guildOnly && message.channel.type === 'DM') return;

	    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "USE_APPLICATION_COMMANDS",
        "MANAGE_EMOJIS_ADN_STICKERS",
        "USE_PUBLIC_THREADS",
        "USE_PRIVATE_TREADS",
        "MANAGE_THREADS"
      ];
	if (command.userpermissions.length) {
		let invalidPerms = []
		for (const perm of command.userpermissions) {
			if (!validPermissions.includes(perm)) {
				return
			}
			if (!message.member.hasPermission(perm)) {
				invalidPerms.push(perm);
			}
		}
		if (invalidPerms.length) {
			message.reply({
				content: `__You dont have permissions for this command__ \`${invalidPerms}\``
			})
			return
		}
	}

	if (command.args && !args.length) { }
	const { cooldowns } = client;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(message.author.id)) {
		if (config.owner == message.author.id) {
		} else {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				message.reply({
					content: `__Please Wait__ \`${timeLeft.toFixed(1)}\` __Seconds to using **${command.name}**__`
				})
				return
			}
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	if (command.devOnly == true && message.author.id !== config.owner) return

	command.execute(client, message, args, prefix).catch((e) => {
		message.reply({
			content: `**Error Ocurred!**\n\`\`\`js\n${e.stack}\n\`\`\``
		})
	})

};
