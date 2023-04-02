const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'remove',
  description: 'supprimez le joueur !',
  userPermission: ["Administrator"],
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'track',
      description: 'Supprimer une piste de la file d attente.',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    const track = interaction.options.getNumber('track');

    if (track > player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('Piste introuvable');

      return interaction.reply({ embeds: [embed] });
    }

    player.queue.remove(track - 1);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('Piste supprimée de la file d attente');

    return interaction.reply({ embeds: [embed] });
  },
};
