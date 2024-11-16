import { Client, GatewayIntentBits } from 'discord.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';
import { credentials } from '../../src/extras/config.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Load commands and events
loadCommands(client);
loadEvents(client);

client.login(credentials.DIS_Token);
