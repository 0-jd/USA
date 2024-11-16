// src/index.js
import { initializeClient } from './User/telegram.js'
import { StartDB } from './extras/mongoDB.js'
import { setupMessageHandler } from './User/services/messageHandler.js'
import { keepAlive } from './User/services/keepAlive.js'
import { startWebServer } from './User/services/webServer.js'

(async () => {
  startWebServer();
  const DB = await StartDB();
  const client = await initializeClient(DB)
  await setupMessageHandler(client);
  await keepAlive(client);
})();
