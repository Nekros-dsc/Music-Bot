const { EmbedBuilder } = require("discord.js");

exports.help = {
    name: 'resume'
}

exports.run = async (bot, message) => {
    const queue = bot.player.nodes.get(message.guild)

    const Embed = new EmbedBuilder()
    .setColor(bot.config.clients.embedColor)
    .setTimestamp()
    .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

    try {
        if(!queue || !queue.isPlaying()) return message.delete() + message.channel.send({
            embeds: [
                Embed
                .setDescription(`❌ | Aucune musique en cours de lecture 🔊`)
            ]
        })

        return message.delete().then(() => {
            queue.node.setPaused(false)
 
            message.channel.send({
                embeds: [
                    Embed
                    .setDescription(`✅ | La musique as bien été retiré de pause 🔊`)
                ]
            })
        })
    } catch (e) {
        return message.delete() + message.channel.send({
            embeds: [
                Embed
                .setDescription(`Une erreur est survenue : ${e}`)
            ]
        })
    }
}