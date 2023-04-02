const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clearqueue',
  description: 'Vide la file d attente',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `Vous n'êtes pas autorisé à utiliser cette commande maintenant car la chanson est jouée par un autre utilisateur`, ephemeral: true });

    if (!player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('🆑 la file d attente est vide');

      return interaction.reply({
        embeds: [embed],
      });
    }

    const { length } = player.queue;
    player.queue.clear();

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`🆑 Effacé ${length} de la file`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
