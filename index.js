import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "readline";
import { resolve } from "path";
import dotenv from 'dotenv';
import { NewMessage } from "telegram/events/index.js";
import { generateRandomBigInt, readBigIntFromBuffer, readBufferFromBigInt, sha256 } from "telegram/Helpers.js";
import bigInt from "big-integer";
import express from 'express';
import selfbot from './discord.js'

dotenv.config();

const Channels = [1001923634336, 1002149233822];

console.log(selfbot)


const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Periodically make a request to keep the app alive
setInterval(async () => {
  fetch(`http://localhost:${port}`);
  await client.getMe();
}, 600000); // every 10 minutes

const stringSession = new StringSession(process.env.StringSession || ""); // fill this later with the value from session.save()

const client_options = {
  systemLanguage: "en",
  systemVersion: "Windows 10",
  deviceType: "Desktop",
  appVersion: "5.3.2",
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const monthRegex = new RegExp(
  '\\b(' +
  'Sept(?:ember)?|' +  // Match 'Sept' or 'September'
  'Sep(?:tember)?|' +  // Match 'Sep' or 'September'
  'Oct(?:ober)?|' +    // Match 'Oct' or 'October'
  'Nov(?:ember)?|' +   // Match 'Nov' or 'November'
  'Dec(?:ember)?' +    // Match 'Dec' or 'December'
  ')\\b',               // End of capturing group
  'i'                   // 'i' for case-insensitive matching
);

async function makeCall(userId, client) {
    const dhConfig = await client.invoke(new Api.messages.GetDhConfig({
      version: 0,
      randomLength: 256
  }));

  if (dhConfig instanceof Api.messages.DhConfigNotModified) {
      throw Error("Invalid DHConfig");
  }

  let a = bigInt.zero;
  let p = readBigIntFromBuffer(dhConfig.p, false, false);
  let g = bigInt(dhConfig.g);

  while (!(bigInt.one.lesser(a) && a.lesser(p.minus(1)))) {
      a = generateRandomBigInt();
  }

  const ga = g.modPow(a, p);
  const gaHash = await sha256(readBufferFromBigInt(ga, 256, false, false));
  const userToCall = userId;

  const res = await client.invoke(new Api.phone.RequestCall({
      userId: userToCall,
      gAHash: gaHash,
      randomId: Math.floor(Math.random() * 0x7ffffffa),
      protocol: new Api.PhoneCallProtocol({
          minLayer: 93,
          maxLayer: 93,
          udpP2p: true,
          udpReflector: true,
          libraryVersions: [
              // taken from TDESKTOP
              "4.0.0",
              "3.0.0",
              "2.7.7",
              "2.4.4"
          ]
      })
  }));

  console.log("CALL HAS STARTED!");
}


async function main() {


  // console.log(discord.toString());

  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, Number(process.env.apiId), process.env.apiHash, client_options , {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your number: ", resolve)
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your password: ", resolve)
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question("Please enter the code you received: ", resolve)
      ),
    onError: (err) => console.log(err),
  });

  console.log("You should now be connected.");
  // console.log(client.session.save());

  client.addEventHandler((event) => {
      const message = event.message.message;
      
      // Check if the message matches the regex
      if (monthRegex.test(message)) {
        console.log('Matched message:', message);
        // makeCall('@ahru284', client)
      } else {
        console.log("Didn't match")
      }
  }, new NewMessage({chats: Channels}));

  console.log('Listening for messages...');
}


main().catch(console.error);