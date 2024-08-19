// src/index.js
import { initializeClient } from './services/telegram.js';
import { setupMessageHandler } from './services/messageHandler.js';
import { keepAlive } from './utils/keepAlive.js';
import { StartDB } from './services/mongoDB.js'

(async () => {
  const DB = await StartDB();
  const client = await initializeClient(DB);
  await setupMessageHandler();
  await keepAlive(client);
})();
