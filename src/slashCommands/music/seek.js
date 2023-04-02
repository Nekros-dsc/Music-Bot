const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'seek',
  description: 'Rechercher le lecteur',
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  options: [
    {
      name: 'position',
      description: 'Nouvelle position du lecteur',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `Vous n'êtes pas autorisé à utiliser cette commande maintenant car la chanson est jouée par un autre utilisateur`, ephemeral: true });

    const position = interaction.options.getNumber('position', true);

    if (!player.currentTrack.info.isSeekable) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('La piste n est pas recherchable');

      interaction.reply({
        embeds: [embed],
      });
    } else {
      player.seekTo(position * 1000);

      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`A cherché à ${position}`);

      return interaction.reply({
        embeds: [embed],
      })
    }
  },
};