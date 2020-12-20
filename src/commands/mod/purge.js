module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(`MANAGE_MESSAGES`))
      return message.reply(`I am sorry, but you can not use this command.`);
    if (!message.guild.me.hasPermission(`MANAGE_MESSAGES`))
      return message.reply(`I am sorry, but I can not remove messages.`);
    let amount = 5;
    try {
      if (args[0]) amount = args[0];
    } catch (err) {
      console.log(err);
      return message.reply("An error occurred. make sure to use a number.");
    }
    if (amount > 500)
      return message.reply("You cannot remove more than 500 messages");
    if (amount < 1)
      return message.reply("You cannot remove less than 1 message.");
    try {
      amount++;
      message.channel.bulkDelete(amount);
    } catch (err) {
      return message.reply("An error occurred when removing the messages");
    }
  },
  aliases: [],
  description: "removes multiple messages from a channel (deafult 5)",
};
