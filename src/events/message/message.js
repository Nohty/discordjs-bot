const PREFIX = process.env.PREFIX;
module.exports = (client, message) => {
  if (message.author.bot) return;
  if (
    (message.content === `<@!${client.user.id}>`) |
    (message.content === `<@${client.user.id}>`)
  ) {
    return message.channel.send(`My prefix is \`${PREFIX}\``);
  }
  if (!message.content.startsWith(PREFIX)) return;
  let cmdName = message.content
    .substring(message.content.indexOf(PREFIX) + 1)
    .split(new RegExp(/\s+/))
    .shift();
  let argsToParse = (argList = message.content.split(" ").slice(1));
  if (client.commands.get(cmdName))
    client.commands.get(cmdName)(client, message, argsToParse);
  else console.log("Command does not exist.");
};
