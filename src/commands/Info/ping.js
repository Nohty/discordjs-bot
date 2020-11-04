module.exports = {
	run: async (client, message, args) => {
		const m = await message.channel.send("Ping?");
		m.edit(
			`Pong! Latency is ${
				m.createdTimestamp - message.createdTimestamp
			}ms. API Latency is ${Math.round(client.ws.ping)}ms`
		);
	},
	aliases: [],
	description: "Unbans a guild member by their ID or mention",
};