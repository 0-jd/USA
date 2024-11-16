import { NewMessage } from 'telegram/events/index.js';
import { sendAlert } from './../Utils/sendAlert.js'
import { chatsID, misc } from './../../extras/config.js';
let freeze = false;

export async function setupMessageHandler(client) {

  const newGrp = Object.keys(chatsID.slotGrps);
  newGrp.push(...chatsID.testGrps)

  client.addEventHandler(async (event) => {

    // Array [ 'Triggered Message', 'Timestamp',  'User ID', 'Channel ID', 'Message ID'];
    const context = [ event.message.message, event.message.date, event.message.fromId.userId, event.message.peerId.channelId, event.message.id]
    const message = event.message.message;
    console.log(message)
    
    if(misc.monthRegex.test(message) && !freeze) {
      sendAlert(client, context, true)
      freeze = true;
      setTimeout(() =>freeze = false, 300 * 1000);
    }

  }, new NewMessage({ chats: newGrp }));

  console.log('Listening for messages...');
}


// Command handler for the telegram Bot.


