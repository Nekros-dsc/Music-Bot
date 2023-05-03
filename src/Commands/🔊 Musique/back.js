const { EmbedBuilder } = require("discord.js");

exports.help = {
    name: 'back'
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

        return message.delete().then(async () => {
            const lastSong = queue.history.previousTrack
            await queue.history.previous()
    
            message.channel.send({
                embeds: [
                    Embed
                    .setDescription(`✅ | Je rejoue l'ancienne musique [**${lastSong.title}**](${lastSong.url}) 🔊`)
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