const { EmbedBuilder } = require("discord.js");

exports.help = {
    name: 'nowplaying'
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
            const progress = queue.node.createProgressBar()

            const methods = ['Désactivé', 'Musique', 'Fil d\'attente', 'Lecture automatique'];
    
            message.channel.send({
                embeds: [
                    Embed
                    .setDescription(`Nom : [${queue.currentTrack.title}](${queue.currentTrack.url})\nVolume : **${queue.node.volume}%**\nDurée : **${progress.replace(/ 0:00/g, 'LIVE')}**\nMode répétition : **${methods[queue.repeatMode]}**`)
                    .setThumbnail(`${queue.currentTrack.thumbnail}`)
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