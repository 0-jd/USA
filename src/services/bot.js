import { Bot, Composer } from "grammy";
import { chatsID, credentials } from '../config/config.js';
import { start } from "telegram/client/auth.js";

let client;
const composer = new Composer();

export async function startBot() {

  client = new Bot(credentials.Bot_Token);
  client.use(composer);
  client.start();

  return client;

  

}

export async function getCode(num) {

  await client.api.sendMessage(chatsID.AlertGrp, `Send the message that you received in ${num}`)

  return new Promise((resolve) => {

    composer.command('code', (ctx) => {
      if (ctx.chat.id == chatsID.AlertGrp) {
        resolve(ctx.match);  // Resolve the Promise with the message text
      }
    })
  });

}
