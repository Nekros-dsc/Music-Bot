const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Ignore la piste en cours',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `Vous n'êtes pas autorisé à utiliser cette commande maintenant car la chanson est jouée par un autre utilisateur`, ephemeral: true });
    player.stop();

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('Ignoré la piste en cours');

    interaction.reply({ embeds: [embed] });
  },
};
