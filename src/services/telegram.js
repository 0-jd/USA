import { TelegramClient } from 'telegram';
import { Api } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import { phone, credentials, clientOptions } from '../config/config.js';
import { getCode } from './bot.js';

let retryAttempts = 0;
let client;


export async function initializeClient(db, bot) {


  const collection = db.collection('SessionID');
  let sessionId = '';
  let number = phone[process.env.Mode];

  const document = await collection.findOne({ sessionId: { $exists: true } });
  sessionId =  document ? document.sessionId : "";


  try {

    console.log("Intiliazing the Connection...");
    client = new TelegramClient(new StringSession(sessionId), Number(credentials.apiId), credentials.apiHash, clientOptions, {
      connectionRetries: 5,
    });

    await client.start({
      phoneNumber: number,
      password: credentials.password || "",
      phoneCode: async () => new Promise( (resolve) => resolve(getCode(number)) ),
      onError: (err) => console.log(err),
    });

    if(!sessionId) sessionId = client.session.save();

    await collection.updateOne(
      { sessionId: sessionId },
      { $set: { sessionId: sessionId } },
      { upsert: true }
    );

    client.bot = bot;
    console.log("Client is now connected");
    return client; 


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
