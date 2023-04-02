const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'join',
  description: 'Rejoint votre canal vocal',
  userPermission: ["Administrator"],
  inVc: true,
  run: (client, interaction) => {
    client.poru.createConnection({
      guildId: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
      deaf: true,
    });

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(`A rejoins ${interaction.member.voice.channel.toString()}`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
