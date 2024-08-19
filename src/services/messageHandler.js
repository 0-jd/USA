import { NewMessage } from 'telegram/events/index.js';
import { sendAlert, somethingElse } from '../utils/sendAlert.js'
import { chatsID } from '../config/config.js';
import { getClient } from '../services/telegram.js'

export async function setupMessageHandler() {
  
  const client = await getClient();

  client.addEventHandler(async (event) => {

    const message = event.message.message;
    client.matchedMsg = event;
    misc.monthRegex.test(message) ? sendAlert(client) : somethingElse();

  }, new NewMessage({ chats: chatsID.slotGrps }));

  console.log('Listening for messages...');
}
