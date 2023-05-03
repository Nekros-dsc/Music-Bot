const { EmbedBuilder } = require("discord.js")

exports.help = {
    name: 'ping'
}

exports.run = async (bot, message) => {
    const Embed = new EmbedBuilder()
        .setColor(bot.config.clients.embedColor)
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo })

    message.delete().then(() => {
        message.channel.send({
            embeds: [
                Embed
                .setTitle('**Ping**')
                .setDescription("🏓 Pong")
                .addFields(
                    { name: 'Latence:', value: `${bot.ws.ping}ms.` }
                )
            ]
        })
    })
}