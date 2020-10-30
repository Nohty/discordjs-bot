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
	}
	if (isValidCommand(message, "rolldice")) {
		message.reply("Rolled a " + rollDice());
	}
});
