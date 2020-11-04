module.exports = {
	run: async (client, message, args) => {
		if (!message.member.hasPermission(`KICK_MEMBERS`))
			return message.reply(`I am sorry, but you can not use this command.`);
		if (!message.guild.me.hasPermission(`KICK_MEMBERS`))
			return message.reply(`I am sorry, but I can not unmute members.`);
	},
	aliases: [],
	description: "Unmutes a user",
};
