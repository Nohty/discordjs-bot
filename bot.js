require("dotenv").config();
const discord = require("discord.js");
const client = new discord.Client();
const PREFIX = process.env.PREFIX;
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
	console.log(`${client.user.tag} has logged in.`);
});

const isValidCommand = (message, cmdName) =>
	message.content.toLowerCase().startsWith(PREFIX + cmdName);
const rollDice = () => Math.floor(Math.random() * 6) + 1;

client.on("message", (message) => {
	if (message.author.bot) return;
	if (isValidCommand(message, "hello")) {
		message.reply("Hello!");
	} else if (isValidCommand(message, "rolldice")) {
		message.reply("Rolled a " + rollDice());
	} else if (isValidCommand(message, "add")) {
		let args = message.content.toLowerCase().substring(5);
		let { cache } = message.guild.roles;
		let role = cache.find((role) => role.name.toLowerCase() === args);
		if (role) {
			if (message.member.roles.cache.has(role.id)) {
				message.channel.send("You already have this role!");
				return;
			}
			if (
				role.permissions.has("ADMINISTRATOR") ||
				role.permissions.has("KICK_MEMBERS") ||
				role.permissions.has("BAN_MEMBERS") ||
				role.permissions.has("MANAGE_GUILD") ||
				role.permissions.has("MANAGE_CHANNELS")
			) {
				message.channel.send("You cannot add yourself to this role.");
				return;
			} else {
				message.member.roles
					.add(role)
					.then((member) =>
						message.channel.send("You were added to this role!")
					)
					.catch((err) => {
						console.log(err);
						message.channel.send("Something went wrong...");
					});
			}
		} else {
			message.channel.send("Role not found!");
		}
	}
});
