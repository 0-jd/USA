import dotenv from 'dotenv';
import { Api, password } from 'telegram';
dotenv.config();

const phones = process.env.Phones.split(',');
export const phone = {
  test : phones[0],
  deploy: phones[1],
  backup: phones[2]
}

export const credentials = {
  Num : process.env.Phones.split(','),
  apiId: process.env.apiId,
  apiHash:process.env.apiHash,
  password: process.env.password || "",
  DIS_Token: process.env.DIS_Token,
  app_Id : process.env.App_ID,
  webhook: process.env.webhook 
}

export const clientOptions = {
  systemLanguage: "en",
  systemVersion: "Windows 10",
  deviceType: "Desktop",
  appVersion: "5.3.2",
};

export const chatsID = {
  slotGrps : { // Key value pair of slot Groups and their invite link
    '1001567966058': 'https://t.me/+UEwZUVSbSXUwZmI1',
    '1001923634336': 'https://t.me/+Hc4OIt8WPPAwZjk9',
    '1002148769898': 'https://t.me/usacounsellingslotupdate'
  },
  discussionGrps: ['-1001812734149', '-1002231374270', ],
  testGrps: ['1002177622865'],
  AlertGrp: '-4579648417',
  experienceGrp: ['-1001956605912', '-1002173958057']
}

export const misc = {
  mode : process.env.Mode,
  port: process.env.PORT || 4000,
  monthRegex: new RegExp(
    '\\b(' +
      'Dec(?:ember)?|' +
      'Jan(?:uary)?|' +
      'Feb(?:ruary)?|' +
      'Mar(?:ch)?|' +
      'Apr(?:il)?|' +
      'May|' +
      'Jun(?:e)?|' +
      'Jul(?:y)?' +
      ')\\b',
    'i'
  ),
}

export const alerts = { 
  slotOpen: `

🗓️ **Slot Date:** __{available date}__
🛠️ \`Slot Info Provider:\`

{Info Provider}

🔑 **Credentials:**
Tap to copy the credentials. || You can also save the password in your browser for quicker access. ||

📧 **Email:** \`{Email}\`

🔒 **Password:** \`{Password}\`

** [Link to the Appointment Portal](https://portal.ustraveldocs.com/) **

🎉 After successfully booking, share the scheduled date in this group.
`,
johnOn: {
  content: 'Ping Certain Roles', // Optional
  embeds: [
    {
      title: 'ABORT BOOKING A DATE',
      description: `
⚠️ **IMPORTANT**

🟢 **John is online**  
🚫 **Do not log in.** Close the tab—**John will likely book the slots.**  
🔒 **Multiple logins may flag your account** and result in a **72 hour freeze**.
`,
      color: Math.floor(Math.random() * 16777215),
      timestamp: new Date()
    }
  ]
}
}

export const buttons = new Api.ReplyInlineMarkup({
  rows: [
      new Api.KeyboardButtonRow({
          buttons: [
              new Api.KeyboardButtonCallback({
                  text: 'Acknowledge',
                  data: Buffer.from('acknowledge')
              }),
              new Api.KeyboardButtonUrl({
                  text: 'Go to the website',
                  url: 'https://portal.ustraveldocs.com/'
              })
          ]
      })
  ]
});


export function sanitizeMsg(message) {
  const result = message
      .replace(/_/g, '\\_')   // Underscore
      .replace(/\*/g, '\\*')  // Asterisk
      .replace(/\[/g, '\\[')  // Left square bracket
      .replace(/\]/g, '\\]')  // Right square bracket
      .replace(/\(/g, '\(')  // Left parenthesis
      .replace(/\)/g, '\)')  // Right parenthesis
      .replace(/~/g, '\\~')   // Tilde
      .replace(/`/g, '\\`')   // Backtick
      .replace(/>/g, '\\>')   // Greater-than
      .replace(/#/g, '\\#')   // Hash
      .replace(/\+/g, '\\+')  // Plus
      .replace(/-/g, '\\-')   // Hyphen
      .replace(/=/g, '\\=')   // Equals
      .replace(/\|/g, '\\|')  // Vertical bar
      .replace(/{/g, '\\{')   // Left curly brace
      .replace(/}/g, '\\}')   // Right curly brace
      .replace(/\./g, '\\.')  // Period
      .replace(/!/g, '\\!');  // Exclamation mark
    
      return result;

}
