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
				return client.users.fetch(mention);
			} else return client.users.fetch(mention);
		}
		let user = await getUser(args[0]);
		if (!user)
			return message.channel.send(
				`Member not found. Please specify a valid User ID or mention the person you would like to unban.`
			);
		try {
			const { MessageEmbed } = require("discord.js");
			const channel = message.guild.channels.cache.get("767378847636127744");
			const banList = await message.guild.fetchBans();
			const bannedUser = banList.find(
				(bannedMember) => bannedMember.user.id === user.id
			);
			if (!bannedUser) return message.channel.send("This user is not banned");
			message.guild.members.unban(user.id).then(() => {
				const unbanEmbed = new MessageEmbed()
					.setDescription(`✅ ***${user.tag} was unbanned***`)
					.setColor("GREEN");
				message.channel.send(unbanEmbed);
				const unbanLogEmbed = new MessageEmbed()
					.setAuthor("Member Unbanned", user.avatarURL())
					.setThumbnail(user.avatarURL())
					.setColor("GREEN")
					.setTimestamp()
					.addField("User", `<@${user.id}> ${user.tag}`)
					.addField("Unbanned By", `<@${message.author.id}>`);
				channel.send(unbanLogEmbed);
			});
		} catch (err) {
			console.log(err);
		}
	},
	aliases: [],
	description: "Unbans a guild member by their ID or mention",
};
