const { ActivityType, Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    execute(bot) {
        console.log('\x1b[33m' + `Connectés à ${bot.user.username} !\n` + '\x1b[33m' + `-> Le bot est utilisé sur ${bot.guilds.cache.size} serveurs !`);

        bot.user.setPresence({
            activities: [{ name: bot.config.clients.activity, type: ActivityType.Watching }],
            status: 'dnd',
        });
    }
}