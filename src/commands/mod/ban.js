module.exports = {
	run: async (client, message, args) => {
		if (!message.member.hasPermission("BAN_MEMBERS")) {
			message.channel.send("You don't have permission to use that command.");
		} else {
			let reson = "";
			if (args.length === 0) {
				message.channel.send("You need to specify a member to ban.");
				return;
			} else if (args.length === 1) {
				reson = "None given";
			} else {
				reson = args.slice(1).join(" ");
			}
			let user = message.mentions.users.first();
			if (!user) {
				try {
					if (!message.guild.members.fetch(args[0]))
						throw new Error("Couldn' get a Discord user with this userID!");
					user = await message.guild.members.fetch(args[0]);
				} catch (err) {
					console.log(err);
					return message.reply("Couldn' get a Discord user with this userID!");
				}
			}
			if (user === message.author)
				return message.channel.send("You can't ban yourself");
			if (!message.guild.member(user).bannable)
				return message.reply(
					"You can't ban this user because you the bot has not sufficient permissions!"
				);
			const member = message.guild.member(user);
			const { MessageEmbed } = require("discord.js");
			if (member) {
				console.log(user);
				const banDmMessage = new MessageEmbed()
					.setDescription("❌ You Were banned From Olympus!")
					.setColor("RED")
					.setThumbnail(user.displayAvatarURL())
					.addField("Reason:", `${reson}`)
					.addField(
						"If you believe that your ban was unjust or you did not deserve it, please appeal here.",
						"https://forms.gle/iLDhryeeSaq4Gawr9"
					);
				await member.send(banDmMessage);
				await member
					.ban({
						reason: reson,
					})
					.then(() => {
						const banConfirmationEmbed = new MessageEmbed()
							.setColor("RED")
							.setDescription(
								`✅ ${user.tag} has been successfully banned for ${reson}!`
							);
						message.channel.send(banConfirmationEmbed);
						const banConfirmationEmbedModlog = new MessageEmbed()
							.setAuthor(
								`Banned by ${message.author.tag}`,
								message.author.displayAvatarURL()
							)
							.setThumbnail(user.displayAvatarURL())
							.setColor("RED")
							.setTimestamp().setDescription(`**Action**: Ban
						**User**: ${user.tag} (${user.id})
						**Reason**: ${reson}`);
						client.channels.cache
							.get("767378847636127744")
							.send(banConfirmationEmbedModlog);
					})
					.catch((err) => {
						message.channel.cache.send("I was unable to ban the member");
						console.error(err);
					});
			} else {
				message.channel.send("That user isn't in this guild!");
			}
		}
	},
	aliases: [],
	description: "Bans a guild member by their ID",
};
