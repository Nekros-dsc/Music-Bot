const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Règle le volume du lecteur',
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'volume',
      description: 'Le volume que vous souhaitez régler',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
      max_value: 100,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `Vous n'êtes pas autorisé à utiliser cette commande maintenant car la chanson est jouée par un autre utilisateur`, ephemeral: true });
    const volume = interaction.options.getNumber('volume', true);
    player.setVolume(volume);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(`Le volume a été réglé sur **${volume}%**.`);

    interaction.reply({
      embeds: [embed],
    });
  },
};
