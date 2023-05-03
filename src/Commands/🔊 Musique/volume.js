const { EmbedBuilder } = require("discord.js")

exports.help = {
    name: 'volume'
}

exports.run = async (bot, message, args) => {
    const queue = bot.player.nodes.get(message.guild)
    const volume = parseInt(args[0])
    const MaxVolume = bot.config.opt.maxVol

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

        if(!volume) return message.delete() + message.channel.send({
            embeds: [
                Embed
                .setDescription(`🎧 | Le volume actuel est de **${queue.node.volume}**/**${MaxVolume}**% 🔊`)
            ]
        })

        if(queue.node.volume === volume) return message.delete() + message.channel.send({
            embeds: [
                Embed
                .setDescription(`❌ | Le volume que vous souhaitez modifier est déjà celui actuellement utilisé 🔊`)
            ]
        })

        if(volume < 0 || volume > MaxVolume) return message.delete() + message.channel.send({
            embeds: [
                Embed
                .setDescription(`❌ | Le nombre spécifié n'est pas valide, entrez un nombre entre **1**/**${MaxVolume}**% 🔊`)
            ]
        })
        
        return message.delete().then(() => {
            queue.node.setVolume(volume)
 
            return message.channel.send({
                embeds: [
                    Embed
                    .setDescription(`✅ | Le volume à été modifier par **${volume}**/**${MaxVolume}**% 🔊`)
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