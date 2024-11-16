import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function loadEvents(client) {

    // Convert import.meta.url to __filename
const __filename = fileURLToPath(import.meta.url);

// Get __dirname equivalent by using path.dirname
const __dirname = path.dirname(__filename);
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        import(filePath).then(event => {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        });
    }
}
