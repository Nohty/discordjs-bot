module.exports = {
	run: async (client, message, args) => {
		if (!message.member.hasPermission("BAN_MEMBERS?")) {
			message.channel.send("You don't have permission to use that command.");
		} else {
			try {
				let reson = "";
				let argList = message.content.split(" ").slice(1);
				if (argList.length === 0) {
					message.channel.send("You need to specify a member to ban.");
					return;
				} else if (argList.length === 1) {
					reson = "None given";
				} else {
					for (var i = 1; i < argList.length; i++) {
						reson += argList[i] + " ";
					}
				}
				// let bannedMember = await message.guild.members.ban(argList[0]);
				// if(bannedMember){
				//     message.channel.send(bannedMember.tag + " was banned.")
				// }
			} catch (err) {
				console.log(err);
			}
		}
	},
	aliases: [],
	description: "Bans a guild member by their ID",
};
