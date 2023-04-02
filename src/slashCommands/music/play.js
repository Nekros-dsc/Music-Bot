const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'play',
  description: 'jouer une piste',
  inVc: true,
  sameVc: true,
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'La piste que vous voulez jouer',
      required: true,
      autocomplete: true
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();

    const player = client.poru.createConnection({
      guildId: interaction.guildId,
      voiceChannel: interaction.member.voice.channelId,
      textChannel: interaction.channel.id,
      deaf: true,
    });

    const resolve = await client.poru.resolve(
      interaction.options.getString('query', true),
    );

    const { loadType, tracks, playlistInfo } = resolve;
    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of resolve.tracks) {
        track.info.requester = interaction.member;
        player.queue.add(track);
      }

      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(
          `☑ Ajouté \`${tracks.length}\` pistes de ${playlistInfo.name}`,
        );

      await interaction.editReply({
        embeds: [embed],
      });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
      const track = tracks.shift();
      track.info.requester = interaction.member;

      player.queue.add(track);

      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`☑ Ajouté [${track.info.title}](${track.info.uri})`);

      await interaction.editReply({
        embeds: [embed],
      });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else {
      return interaction.editReply(
        'Aucun résultat n a été trouvé pour votre requête.',
      );
    }
  },
};
