module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(`MANAGE_MESSAGES`))
      return message.reply(`I am sorry, but you can not use this command.`);
    if (!message.guild.me.hasPermission(`MANAGE_MESSAGES`))
      return message.reply(`I am sorry, but I can not remove messages.`);
    let amount = 5;
    try {
      if (args[0]) {
        if (isNaN(args[0]))
          return message.reply(`\`${args[0]}\` is not a number!`);
        if (checkAmount(message, args)) {
          amount = args[0];
          amount = parseInt(amount);
        } else {
          return;
        }
      }
    } catch (err) {
      console.log(err);
      return message.reply("An error occurred.");
    }
    try {
      amount++;
      while (amount > 0) {
        if (amount - 100 >= 0) {
          message.channel.bulkDelete(100);
          amount -= 100;
        } else {
          message.channel.bulkDelete(amount);
          amount = 0;
        }
      }
    } catch (err) {
      return message.reply("An error occurred when removing the messages");
    }
  },
  aliases: ["clear"],
  description: "removes multiple messages from a channel (deafult 5)",
};

function checkAmount(message, args) {
  if (args[0] > 500) {
    sendAmountError(message);
  } else if (args[0] < 1) {
    message.reply("You cannot remove less than 1 message.");
  } else if (args[0] <= 50) return true;
  else if (args[0] <= 100) {
    if (message.member.roles.cache.has("769934380483215360")) {
      return true;
    } else {
      sendAmountError(message);
    }
  } else if (args[0] <= 250) {
    if (message.member.roles.cache.has("767364849856413737")) {
      return true;
    } else {
      sendAmountError(message);
    }
  } else if (args[0] <= 500) {
    if (message.member.roles.cache.has("767436547028549640")) {
      return true;
    } else {
      sendAmountError(message);
    }
  }
  return false;
}

function sendAmountError(message) {
  if (message.member.roles.cache.has("767436547028549640")) {
    message.reply(
      "The maximum amount of messages that you can delete is `500`"
    );
  } else if (message.member.roles.cache.has("767364849856413737")) {
    message.reply(
      "The maximum amount of messages that you can delete is `250`"
    );
  } else if (message.member.roles.cache.has("769934380483215360")) {
    message.reply(
      "The maximum amount of messages that you can delete is `100`"
    );
  } else {
    message.reply("The maximum amount of messages that you can delete is `50`");
  }
}
