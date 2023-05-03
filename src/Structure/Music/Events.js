const { EmbedBuilder } = require('discord.js');

module.exports = async (bot) => {
    const Embed = new EmbedBuilder()
    .setColor(bot.config.clients.embedColor)
    .setTimestamp()
    .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

    bot.player.events.on('playerStart', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | Je commence à jouer: **${track.title}** !`)] });
    });
     
    bot.player.events.on('audioTrackAdd', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | La musique **${track.title}** as bien été ajouté à la file d'attente !`)] });
    });
     
    bot.player.events.on('audioTracksAdd', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | Plusieurs musique ajouté à la file d'attente !`)] });
    });
     
    bot.player.events.on('playerSkip', (queue, track) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | **${track.title}** ignoré en raison d'un problème !`)] });
    });
     
    bot.player.events.on('disconnect', (queue) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`❌ | J'ai fini mon travaille, je déconnecte du salons !`)] });
    });

    bot.player.events.on('emptyChannel', (queue) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`❌ | Personne n'est dans le canal vocal, je quitte le canal vocal !`)] });
    });

    bot.player.events.on('emptyQueue', (queue) => {
        queue.metadata.channel.send({ embeds: [Embed.setDescription(`✅ | J'ai fini de lire toute la file d'attente !`)] });
    });

    bot.player.events.on('error', (queue, error) => {
        console.log(`Événement d'erreur générale du joueur: ${error.message}`);
        console.log(error);
    });
     
    bot.player.events.on('playerError', (queue, error) => {
        console.log(`Événement d'erreur du joueur: ${error.message}`);
        console.log(error);
    });
}