import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { credentials } from '../../src/extras/config.js';

const commands = [];
    // Convert import.meta.url to __filename
    const __filename = fileURLToPath(import.meta.url);

    // Get __dirname equivalent by using path.dirname
    const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, './commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(credentials.DIS_Token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(credentials.app_Id),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
