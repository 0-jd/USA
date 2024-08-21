import { NewMessage } from 'telegram/events/index.js';
import { sendAlert, somethingElse } from './sendAlert.js'
import { chatsID, misc } from '../config/config.js';
import { getClient } from '../services/telegram.js'
import fs from 'fs';

export async function setupMessageHandler() {
  
  const client = await getClient();

  const newGrp = chatsID.slotGrps;
  newGrp.push(chatsID.testGrps)

  console.log(newGrp)

  client.addEventHandler(async (event) => {

    const message = event.message.message;
    client.matchedMsg = event;
    console.log('not matched ' + message)
    misc.monthRegex.test(message) ? sendAlert(client) : somethingElse();

  }, new NewMessage({ chats: newGrp }));

  console.log('Listening for messages...');
}

// Command handler for the telegram Bot.


