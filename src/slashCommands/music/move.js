const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'move',
  description: 'Déplace la position de deux pistes',
  userPermission: ["Administrator"],
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'track',
      description: 'La piste que vous souhaitez déplacer.',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
    {
      name: 'position',
      description: 'Supprimer une piste de la file d attente.',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 2,
    },
  ],
  run: (client, interaction) => {
    function moveArrayElement(arr, fromIndex, toIndex) {
      arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
      return arr;
    }

    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `Vous n'êtes pas autorisé à utiliser cette commande maintenant car la chanson est jouée par un autre utilisateur`, ephemeral: true });

    const from = interaction.options.getNumber('track');
    const to = interaction.options.getNumber('position');

    if (
      from === to ||
      isNaN(from) ||
      from < 1 ||
      from > player.queue.length ||
      isNaN(to) ||
      to < 1 ||
      to > player.queue.length
    )
      return interaction.reply("Cette piste n'existe pas dans la file d'attente.");

    const moved = player.queue[from - 1];
    moveArrayElement(player.queue, from - 1, to - 1);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(`Déplacé ${moved.info.title} to \`${to}\`.`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
