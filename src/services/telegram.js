import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import { NewMessage } from 'telegram/events/index.js';
import readline from 'readline';
import { apiId, apiHash, stringSession, clientOptions, channels, monthRegex } from '../config/config.js';
import { makeCall } from '../utils/makeCall.js';
import { keepAlive } from '../utils/keepAlive.js';

export async function startTelegramClient() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Loading interactive example...");
  const client = new TelegramClient(new StringSession(stringSession), Number(apiId), apiHash, clientOptions, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) => rl.question("Please enter your number: ", resolve)),
    password: async () =>
      new Promise((resolve) => rl.question("Please enter your password: ", resolve)),
    phoneCode: async () =>
      new Promise((resolve) => rl.question("Please enter the code you received: ", resolve)),
    onError: (err) => console.log(err),
  });

  console.log("You should now be connected.");

  client.addEventHandler((event) => {
    const message = event.message.message;
    if (monthRegex.test(message)) {
      console.log('Matched message:', message);
      makeCall('@ahru284', client);
    } else {
      console.log("Didn't match");
    }
  }, new NewMessage({ chats: channels }));

  console.log('Listening for messages...');

  await keepAlive(client);
}
