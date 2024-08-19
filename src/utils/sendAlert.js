import { makeCall } from './makeCall.js';
import { chatsID, alerts } from '../config/config.js';

export async function sendAlert(client) {

  try {
    const status = await makeCall('@ahru284', client);

    if (status) {
      await client.bot.api.sendMessage(chatsID.AlertGrp, alerts.johnOn, {
        parse_mode: 'MarkdownV2'
      });
    } else {
      // Handle the case when status is false
    }

    await client.bot.api.sendMessage(chatsID.AlertGrp, alerts.slotOpen, {
      parse_mode: 'MarkdownV2'
    });

  } catch (err) {
    console.error(err);
  }
}

export function somethingElse() {
  // Planning to catch the unmatched message in database and analyze it
  // to find shadow periods and the amount of messages that were caught for further processing.
}
