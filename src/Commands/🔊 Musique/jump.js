const { EmbedBuilder } = require("discord.js");

exports.help = {
    name: 'jump'
}

exports.run = async (bot, message, args) => {
    const queue = bot.player.nodes.get(message.guild)
    const nombre = parseInt(args[0])

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
            queue.node.jump(nombre - 1)

            message.channel.send({
                embeds: [
                    Embed
                    .setDescription(`✅ | ${nombre} musique passé avec succès 🔊`)
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