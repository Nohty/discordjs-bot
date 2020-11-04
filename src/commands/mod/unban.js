module.exports = {
	run: async (client, message, args) => {
		if (!message.member.hasPermission(`BAN_MEMBERS`))
			return message.reply(`I am sorry, but you can not use this command.`);
		if (!message.guild.me.hasPermission(`BAN_MEMBERS`))
			return message.reply(`I am sorry, but I can not ban members.`);
	},
	aliases: [],
	description: "Unbans a guild member by their ID",
};
