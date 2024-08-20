// src/index.js
import { initializeClient } from './services/telegram.js';
import { StartDB } from './services/mongoDB.js'
import { startBot } from './services/bot.js';
import { setupMessageHandler } from './services/messageHandler.js';
import { keepAlive } from './utils/keepAlive.js';

(async () => {
  const DB = await StartDB();
  const bot = await startBot();
  const client = await initializeClient(DB, bot)
  await setupMessageHandler();
  await keepAlive(client);
})();
