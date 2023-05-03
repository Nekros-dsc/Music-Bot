<h1 align="center">
 🎶Music Bot⚙
</h1>

---
## <a id="menu"></a>🔱 » Menu

- [☄・Deploys](#deploys)
- [🔰・Features](#features)
- [🌌・Discord](https://discord.gg/zM6ZN9UfRs)
- [🎉・Setting up](#setup)
- [⚙・Config](#config)
## <a id="deploys"></a>☄ » Deploys
> [Deploy with REPLIT](https://replit.com/github/Nekros-dsc/Music-Bot)

## <a id="features"></a>🛠 » Features


## <a id="setup"></a> 📁 » Setting up

1. Install [Nodejs](https://nodejs.org/)
2. Open up [config.json](https://discord.gg/zM6ZN9UfRs) with notepad or some other editor

# <a id="config"></a>⚙ » Config

If you want to change the config, open up [config.json](https://discord.gg/zM6ZN9UfRs) and locate it at the top. There you can configure the following:

```js
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
```

---