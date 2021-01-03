module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(`KICK_MEMBERS`))
      return message.reply(`I am sorry, but you can not use this command.`);
    if (!message.guild.me.hasPermission(`KICK_MEMBERS`))
      return message.reply(`I am sorry, but I can not mute members.`);

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
        `User not found. Please specify a valid User ID or mention the person you would like to mute.`
      );
    let member = message.guild.member(user);
    if (!member)
      return message.channel.send(
        `Member not found. Please specify a valid User ID or mention the person you would like to mute.`
      );
    if (member.hasPermission(`KICK_MEMBERS`))
      return message.channel.send(
        "❌ That user is a mod/admin, I can't do that."
      );
    let reason = args.slice(1).join(" ");
    if (!reason) reason = `No reason specified.`;
    const { MessageEmbed } = require("discord.js");
    const channel = message.guild.channels.cache.get("767378847636127744");
    let mutedRole = message.guild.roles.cache.get("767751500600049735");
    if (!mutedRole) return message.channel.send("Mute role not found.");
    if (member.roles.cache.find((r) => r.id === mutedRole.id))
      return message.channel.send("This user is already muted");
    const muteDmEmbed = new MessageEmbed()
      .setAuthor("Olympus Moderation Team", client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())
      .addField(
        "You have been Muted on the Olympus server!",
        `**Reason:**
                ${reason}`
      )
      .setTimestamp()
      .setColor("#7FE5F0");
    await member.send(muteDmEmbed).catch((err) => {
      channel.send(`⚠ Unable to contact **${user.tag}**.`);
      console.log(err);
    });
    await member.roles
      .add(mutedRole)
      .then(() => {
        const muteEmbed = new MessageEmbed()
          .setDescription(`✅ ***${member.user.tag} was muted***`)
          .setColor("GREEN");
        message.channel.send(muteEmbed);
        const muteLogEmbed = new MessageEmbed()
          .setAuthor("Member Muted", member.user.avatarURL())
          .setThumbnail(member.user.avatarURL())
          .setColor("ORANGE")
          .setTimestamp()
          .addField("User", `<@${member.user.id}> ${member.user.tag}`)
          .addField("Muted By", `<@${message.author.id}>`)
          .addField("Reason", reason);
        channel.send(muteLogEmbed);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  aliases: [],
  description: "Mutes a user",
};
