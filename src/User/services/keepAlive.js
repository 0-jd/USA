import fetch from 'node-fetch';
import { misc } from '../../extras/config.js';

export const keepAlive = async (client) => {
  setInterval(async () => {
    if (!client.connected) {
      await client.connect().catch(console.error);
    }

    if (client.checkAuthorization()) {
      await client.getMe();
      console.log('[Keep Alive]');
    }
  }, 30000);

  // Periodically make a request to keep the app alive
  setInterval(async () => {
    fetch(`http://localhost:${misc.port}`);
  }, 600000); // every 10 minutes
};
