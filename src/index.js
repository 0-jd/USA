import { startTelegramClient } from './services/telegram.js';
import { startWebServer } from './services/webServer.js';

startWebServer();
startTelegramClient().catch(console.error);
