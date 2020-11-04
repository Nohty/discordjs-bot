module.exports = {
	run: async (client, message, args) => {
		if (!message.member.hasPermission(`KICK_MEMBERS`))
			return message.reply(`I am sorry, but you can not use this command.`);
		if (!message.guild.me.hasPermission(`KICK_MEMBERS`))
			return message.reply(`I am sorry, but I can not unmute members.`);

		function getUser(mention) {
			if (!mention) return;
			if (mention.startsWith(`<@`) && mention.endsWith(`>`)) {
				mention = mention.slice(2, -1);
				if (mention.startsWith(`!`)) {
					mention = mention.slice(1);
				}
				return client.users.cache.get(mention);
			} else return client.users.cache.get(mention);
		}
		let user = getUser(args[0]);
		if (!user)
			return message.channel.send(
				`User not found. Please specify a valid User ID or mention the person you would like to unmute.`
			);
		let member = message.guild.member(user);
		if (!member)
			return message.channel.send(
				`Member not found. Please specify a valid User ID or mention the person you would like to unmute.`
			);
		if (member.hasPermission(`KICK_MEMBERS`))
			return message.channel.send(
				"❌ That user is a mod/admin, I can't do that."
			);
		const { MessageEmbed } = require("discord.js");
		const channel = message.guild.channels.cache.get("767378847636127744");
		let mutedRole = message.guild.roles.cache.get("767751500600049735");
		if (!mutedRole) return message.channel.send("Mute role not found.");
		if (!member.roles.cache.find((r) => r.id === mutedRole.id))
			return message.channel.send("This user is not muted");
	},
	aliases: [],
	description: "Unmutes a user",
};
