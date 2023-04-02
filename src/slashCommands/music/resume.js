const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'Reprend la lecture',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `Vous n'êtes pas autorisé à utiliser cette commande maintenant car la chanson est jouée par un autre utilisateur`, ephemeral: true });

    if (!player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('▶ Le lecteur n est pas en pause');

      interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('▶ La lecture a été repris');

      player.pause(false);
      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
