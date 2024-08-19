import { Bot } from "grammy";
import { chatsID, credentials } from '../config/config.js';
import { start } from "telegram/client/auth.js";

export async function startBot(client, ...args) {

  console.log(args)
  const bot = new Bot(credentials.Bot_Token);

  bot.start().catch( err => console.error(err) );

  if (args.includes('Get Code')) {
    // Send message to the specified channel
    await bot.api.sendMessage( chatsID.testGrps, `Please enter the code sent to ${args[1]}`);

    const codePromise = new Promise((resolve) => {

      // Define the message listener
      const messageListener = async (ctx) => {
        if (ctx.chat.id === chatsID.testGrps) {

          const code = ctx.message.text;  // Capture the code
          bot.off('message', messageListener);  // Stop listening after getting the code
          resolve(code);  // Resolve the Promise with the captured code
        }
      };

      // Listen for messages from the specified channel
      bot.on('message', messageListener);
    });

    const code = await codePromise;
    return code;

  } else {
    client.bot = bot;
  }
  
}
