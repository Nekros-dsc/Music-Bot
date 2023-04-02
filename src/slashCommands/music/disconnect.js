const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'disconnect',
  description: 'Déconnectez le bot de votre canal vocal',
  userPermission: ["Administrator"],
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guildId);

    player.destroy();
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('📡 Déconnecté le lecteur');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
