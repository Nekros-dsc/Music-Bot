const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Affiche les commandes',
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
      .setTitle('Liste des commandes du bot !')
      .setDescription(`\`help\` : permet de voir la liste de commandes du bot \n\n\`clearqueue\` : Permet de vider la queue\n\`disconnect\` : Permet de déconnecter le bot\n\`join\` : Permet de connecter le bot\n\`loop\` : Définir le mode de boucle sur la piste actuelle \n\`move\` : Déplace la position de deux pistes\n\`pause\` : Permet de mettre la musique en pause\n\`play\` : Permet de jouer une musique\n\`queue\` : Permet d'afficher la file d'attente\n\`remove\` : Supprimer le joueur\n\`resume\` : Permet de reprendre la lecture\n\`seek\` : Rechercher le lecteur\n\`shuffle\` : Mélangez la file d attente\n\`skip\`: Permet de skip une musique\n\`volume\`: Permet de changer le volume du son`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};