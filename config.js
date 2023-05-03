module.exports = {
    clients: {
        token: 'Put-Token-Here',
        prefix: 'Prefix',
        activity: 'discord.gg/novaworld',
        name: 'Nova World',
        logo: 'https://cdn.discordapp.com/attachments/1065584990533996584/1086659928099409961/pixiz-18-03-2023-14-41-24.jpg',
        embedColor: 'Random'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'Role-Name',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};