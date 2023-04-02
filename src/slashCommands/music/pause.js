const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'mettre le lecteur en pause',
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `Vous n'êtes pas autorisé à utiliser cette commande maintenant car la chanson est jouée par un autre utilisateur`, ephemeral: true });

    if (player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('⏸ Le lecteur est déjà en pause');

      return interaction.reply({
        embeds: [embed],
      });
    }

    player.pause(true);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('⏸ Le lecteur a été mis en pause');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
