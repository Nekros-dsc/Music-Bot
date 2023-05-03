const { EmbedBuilder } = require("discord.js")

exports.help = {
    name: 'help'
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
                .setTitle('**Mes commandes**')
                .setDescription("ping: Pour voir le ping du bot\nback: Pour retourner en arrière\nclear: Pour clear la queue\njump: Pour passer une musique\nnowplaying: Pour voir la musique en cours de lecture\npause: Pour faire une pause dans la musique\nplay: Pour jouer une musique\nresume: Pour relancer la musique\nshuffle: Pour mélanger les musique\nskip: Pour passer la musique\nstop: Pour arrêter la musique\nvolume: Pour changer le volume de la musique")
            ]
        })
    })}