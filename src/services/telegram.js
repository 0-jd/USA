import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import { phone, credentials, clientOptions } from '../config/config.js';
import { startBot } from './bot.js';

let client;  // Client instance
let retryAttempts = 0;

export async function initializeClient(db) {

  const collection = db.collection('SessionID');
  let sessionId = '';

  const document = await collection.findOne({ sessionId: sessionId });
  sessionId =  document ? document.sessionId : "";

  try {

    console.log(sessionId)
    console.log(phone[process.env.Mode])
    console.log("Intiliazing the Connection...");
    client = new TelegramClient(new StringSession(sessionId), Number(credentials.apiId), credentials.apiHash, clientOptions, {
      connectionRetries: 5,
    });

    const code = await startBot(client, "Get Code", phone[process.env.Mode]);
  
    await client.start({
      phoneNumber: phone[process.env.Mode],
      password: credentials.password || "",
      phoneCode: code,
    });

    if(!sessionId) sessionId = client.session.save();

    await collection.updateOne(
      { sessionId: sessionId },
      { $set: { sessionId: sessionId } },
      { upsert: true }
    );

    console.log("Client is now connected");
    if(!client?.bot) await startBot(client);
    return client;  // Return initialized client

  } catch (error) {
    retryAttempts++;
    console.log(error)
    if(retryAttempts > 5) await client.disconnect();

  }
}

// Exported function to get the client instance
export async function getClient() {
  if (!client) {
    await initializeClient();  // Ensure client is initialized if not already
  }
  return client;  // Return the client instance
}
