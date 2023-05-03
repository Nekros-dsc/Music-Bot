const { EmbedBuilder } = require("discord.js");

exports.help = {
    name: 'play'
}

exports.run = async (bot, message, args) => {
    const channel = message.member.voice.channel;
    const music = args.join(" ");

    const Embed = new EmbedBuilder()
    .setColor(bot.config.clients.embedColor)
    .setTimestamp()
    .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

    try {
        if(!message.member.voice.channel) return message.delete() + message.channel.send({
            embeds: [
                Embed
                .setDescription(`❌ | Tu ne te trouve pas dans un channel vocale 🔊`)
            ]
        })

        const { track } = await bot.player.play(channel, music, {
            nodeOptions: {
                metadata: message
            }
        });

        message.delete().then(() => {
            message.channel.send({
                embeds: [
                    Embed
                    .setDescription(`✅ | La musique **${track.title}** as bien été trouvé 🔊`)
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