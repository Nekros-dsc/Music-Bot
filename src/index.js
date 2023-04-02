require('./console/watermark')
const { Client, Partials, Collection } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.json')
const { Poru } = require('poru');

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
});

client.poru = new Poru(client, config.NODES, {
    deezer: {
        playlistLimit: 10,
    },
    spotify: {
        clientID: config.SPOTIFY.clientID,
        clientSecret: config.SPOTIFY.clientSecret,
        playlistLimit: 5,
    },
    apple: {
        playlistLimit: 5,
    },
});

if (!config.TOKEN) {
    console.log("[WARN] T'as pas mis le token :/ dans config.json".yellow.bold + "\n")
    return process.exit();
};

client.config = require('./config/config.json');
client.events = new Collection()
client.slash = new Collection()

module.exports = client;

["event", "slash", "poruEvents"].forEach(file => {
    require(`./handlers/${file}`)(client);
});

client.login(config.TOKEN)
    .catch((err) => {
        console.log("[CRUSH] Ya un truc qui ne va pas quand le bot est co" + "\n");
        console.log("[CRUSH] Error de DiscordAPI :" + err);
        process.exit();
    })

process.on("unhandledRejection", async (err) => {
    console.log(`[ANTI - CRUSH] Unhandled Rejection : ${err}`.red.bold)
    console.log(err)
})