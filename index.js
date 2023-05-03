const { Player } = require('discord-player');
const { Client, IntentsBitField, Collection } = require('discord.js');
const bot = new Client({ intents: new IntentsBitField(3276799) });

bot.commands = new Collection();
bot.config = require('./config');

bot.player = new Player(bot, bot.config.opt.discordPlayer);

require('./src/Structure/Music/Events')(bot);
require('./src/Structure/Handler/Command')(bot);
require('./src/Structure/Handler/Event')(bot);

bot.login(bot.config.clients.token);