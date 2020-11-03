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
			if (member) {
				member
					.ban({
						reason: reson,
					})
					.then(() => {
						message.channel.send(`Successfully banned ${user.tag} for ${reson}`);
					})
					.catch((err) => {
						message.channel.send("I was unable to ban the member");
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
