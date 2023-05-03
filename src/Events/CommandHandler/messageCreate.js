const { Events, ChannelType } = require("discord.js")

module.exports = {
    name: Events.MessageCreate,
    execute(message, bot) {
        const prefix = bot.config.clients.prefix;

        if(message.author.bot) return;
        if(message.channel.type === ChannelType.DM) return;

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        if(!cmd.startsWith(prefix)) return;

        let commandFile = bot.commands.get(cmd.slice(prefix.length));
        if(commandFile) commandFile.run(bot, message, args);
    }
}