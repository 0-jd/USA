import { readdirSync } from 'fs';
import { Collection } from 'discord.js';
import { fileURLToPath } from 'url';
import path from 'path';

export function loadCommands(client) {
    client.commands = new Collection();

    // Convert import.meta.url to __filename
const __filename = fileURLToPath(import.meta.url);

// Get __dirname equivalent by using path.dirname
const __dirname = path.dirname(__filename);
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        import(filePath).then(command => {
            client.commands.set(command.data.name, command);
        });
    }
}
