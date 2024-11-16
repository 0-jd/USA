import { TelegramClient } from 'telegram';
import { Api } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import { misc, phone, credentials, clientOptions } from '../extras/config.js';
import readline from "readline";

let retryAttempts = 0;
let client;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


export async function initializeClient(db) {

  const collection = db.collection('SessionID');
  let number = phone[process.env.Mode];

  const document = await collection.findOne({ sessionId: { $exists: true } });
  const sessionId =  document ? document.sessionId : "";


  try {

    console.log("Intiliazing the Connection...");
    let client = new TelegramClient(new StringSession(sessionId), Number(credentials.apiId), credentials.apiHash, clientOptions, {
      connectionRetries: 5,
    });
    
    console.log(`Using Phone Number: ${number}`);
    await client.start({
      phoneNumber: number,
      password: credentials.password || "",
      phoneCode: async () =>
        new Promise((resolve) =>
          rl.question("Please enter the code you received: ", resolve)
        ),
      onError: (err) => console.log(err),
    });

    if(!sessionId) sessionId = client.session.save();

    await collection.updateOne(
      { sessionId: sessionId },
      { $set: { sessionId: sessionId } },
      { upsert: true }
    );

    client.db = db;
    client.mode = misc.mode;
    console.log("Client is now connected");
    if(client.mode == 'test') console.log("<<<<<<<<<< CLIENT IS DEPLOYED IN TEST MODE >>>>>>>>>>")
    return client; 


  } catch (error) {

    retryAttempts++;
    console.log(error)
    if(retryAttempts > 5) await client.disconnect();

  }
}
