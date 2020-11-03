module.exports = {
	run: async (client, message, args) => {
		if (!message.member.hasPermission(`KICK_MEMBERS`))
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
		let user = getUser(args[0]);
		if (!user)
			return message.channel.send(
				`Member not found. Please specify a valid User ID or mention the person you would like to Kick.`
            );
        let member = message.guild.member(user);
	},
	aliases: [],
	description: "Kicks a guild member by their ID or mention",
};
