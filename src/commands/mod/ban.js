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
		let user = getUser(args[0]);
		if (!user)
			return message.channel.send(
				`Member not found. Please specify a valid User ID or mention the person you would like to ban.`
			);
		let member = message.guild.member(user);
		if (!member)
			return message.channel.send(
				`User not found. Please specify a valid User ID or mention the person you would like to ban.`
			);
		if (member.hasPermission(`BAN_MEMBERS`))
			return message.channel.send(
				"❌ That user is a mod/admin, I can't do that."
			);
		let reason = args.slice(1).join(" ");
		if (!reason) reason = `No reason specified.`;
		const { MessageEmbed } = require("discord.js");
		const channel = message.guild.channels.cache.get("767378847636127744");
		const banDmEmbed = new MessageEmbed()
			.setAuthor("Olympus Moderation Team", client.user.avatarURL())
			.setThumbnail(client.user.avatarURL())
			.addField(
				"You have been banned from the Olympus server!",
				`**Reason:**
        ${reason}`
			)
			.addField(
				"Can I appeal a ban?",
				"We allow all banned users a single appeal. This will be reviewed by our staff who will decide if you can rejoin the server." +
					`
                [Ban Appeal](https://forms.gle/XiLP1DLgJHkWyjat5)`
			)
            .setTimestamp()
            .setColor("#7FE5F0");

		await member
			.send(banDmEmbed)
			.catch((err) =>
				channel.send(`⚠ Unable to contact **${user.tag}**.`)
			);
		await member
			.ban({
				reason: reason,
			})
			.then(() => {
                const banEmbed = new MessageEmbed()
                .setDescription(`✅ ***${member.user.tag} was banned***`)
                .setColor("GREEN");
				message.channel.send(banEmbed);
				const banLogEmbed = new MessageEmbed()
					.setAuthor("Member Banned", member.user.avatarURL())
					.setThumbnail(member.user.avatarURL())
					.setColor("RED")
					.setTimestamp()
                    .addField("User", `<@${member.user.id}> ${member.user.tag}`)
                    .addField("Banned By", `<@${message.author.id}>`)
					.addField("Reason", reason);
				channel.send(banLogEmbed);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	aliases: [],
	description: "Bans a guild member by their ID or mention",
};
