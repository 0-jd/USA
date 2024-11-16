import { makeCall } from './makeCall.js';
import axios from 'axios'
import { Api } from 'telegram';
import { credentials, chatsID, alerts } from '../../extras/config.js';
import { formatInTimeZone } from 'date-fns-tz';
import dotenv from 'dotenv';
dotenv.config();

export function somethingElse() {
  // Planning to catch the unmatched message in database and analyze it
  // to find shadow periods and the amount of messages that were caught for further processing.
}


export async function sendAlert(client, ctx, isGrpAlert) {

  try {
    
  // ctx = Array [ 'Triggered Message', 'Timestamp',  'User ID', 'Channel ID', 'Message ID'];
  let alert;
  let Info_Provider;

  if(isGrpAlert) {
    const alertGrpId = '100' + ctx[3].toString();
    const AlertGrp = await client.getEntity('-' + alertGrpId);
    const alertGrpInfo = chatsID.slotGrps[alertGrpId] ? `[${AlertGrp.title}](${chatsID.slotGrps[alertGrpId]})` : AlertGrp.title;

    const inputPeer = await client.getInputEntity(ctx[3]);
    const inputUser = await client.invoke(
      new Api.users.GetFullUser({
        id: new Api.InputUserFromMessage({
          peer: inputPeer,
          msgId: ctx[4],
          userId: ctx[2],
        }),
      })
    );

    const user = inputUser.users[0];
    const userFullName = user ? (user.firstName || "Invalid First Name") + " " + (user.lastName || "") : "`Invalid User :)`"


    var userInfo = user.username ? `[ ${userFullName}](https://t.me/${user.username})` : userFullName;
    const utcDate = new Date(ctx[1] * 1000);
    const time = formatInTimeZone(utcDate, 'Asia/Kathmandu' , 'MMM/dd hh:mm:ss a');
    Info_Provider = `
• Group : ${alertGrpInfo}
• User : ${userInfo}
• Time : \`${time}\`
    `
  }

  const dynamicChanges = {
    "{available date}" : ctx[0] ,
    "{Info Provider}" : Info_Provider,
    "{Email}" : process.env.CGI_Email,
    "{Password}" : process.env.CGI_Password
  };
  alert = alerts.slotOpen;
  // console.log(alert)

  Object.keys(dynamicChanges).forEach((key) => {
    alert = alert.replace(new RegExp(key, 'g'), dynamicChanges[key]);
  });



  const embedMessage = {
    content: '@everyone', // Optional
    embeds: [
      {
        title: '🚨 NEW SLOTS OPEN',
        description: alert,
        color: Math.floor(Math.random() * 16777215),
        timestamp: new Date()
      }
    ]
  };

  const webhookUrl = credentials.webhook;

  await axios.post(webhookUrl, embedMessage).catch(error => {console.error('Error sending embed:', error);});

  const status = await makeCall('@ahru284', client);
  if (status) {
    await axios.post(webhookUrl, alerts.johnOn).catch(error => {console.error('Error sending embed:', error);});
  }

  } catch (error) {
    console.log(error)
  }

}




