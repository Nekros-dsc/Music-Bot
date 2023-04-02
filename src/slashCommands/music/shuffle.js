const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Mélangez la file d attente',
  userPermission: ["Administrator"],
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (player.queue.length <= 2) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription("Impossible de mélanger la file d'attente.");
      return interaction.reply({ embeds: [embed] });
    }

    player.queue.shuffle();

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('A mélangé la file d attente');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
