module.exports = {
	run: async (client, message, args) => {
		if (!message.member.hasPermission(`BAN_MEMBERS`))
			return message.reply(`I am sorry, but you can not use this command.`);
		if (!message.guild.me.hasPermission(`BAN_MEMBERS`))
			return message.reply(`I am sorry, but I can not ban members.`);
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
	},
	aliases: [],
	description: "Unbans a guild member by their ID",
};
