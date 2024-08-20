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
  Bot_Token: process.env.Bot_Token,
}

export const clientOptions = {
  systemLanguage: "en",
  systemVersion: "Windows 10",
  deviceType: "Desktop",
  appVersion: "5.3.2",
};

export const chatsID = {
  slotGrps : ['1001567966058', '1001923634336', '1002148769898'],
  discussionGrps: ['-1001812734149', '-1002231374270', ],
  testGrps: '-4230082874',
  AlertGrp: '-4579648417',
  experienceGrp: ['-1001956605912', '-1002173958057']
}

export const misc = {
  port: process.env.PORT || 4000,
  channels: [1001923634336, 1002149233822, 4230082874],
  monthRegex: new RegExp(
    '\\b(' +
    'Sept(?:ember)?|' +
    'Sep(?:tember)?|' +
    'Oct(?:ober)?|' +
    'Nov(?:ember)?|' +
    'Dec(?:ember)?' +
    ')\\b',
    'i'
  ),
}

export const alerts = { 
  slotOpen: `🚨 \*\*SLOTS OPEN\*\*

🗓️ \*\*Slot Date:\*\* \_\_some date\_\_
📅 \*\*Current Date:\*\* \_\_some date\_\_
🛠️ \`Slot Info Provider:\`

• From Group
• Posted 1s ago
• User: someone

⚠️ \*\*IMPORTANT\*\*
\|\| If you see this alert, ⚡ log in and book the appointment immediately\\\. Time is critical\\\. 
However, if a follow\\-up message states, 🟢 "John is online," 🚫 do not log in\\\. Close the tab, as John will likely book the slots\\\. 
But if you're already logged in, ✅ ignore the previous warnings and proceed to the appointment scheduling page to secure the earliest available date\\\. \|\|

🔑 \*\*Credentials:\*\*
Tap to copy the credentials\\\. \|\| \\(You can also save the password in your browser for quicker access\\\.\\) \|\|

📧 \*\*Email:\*\* \`gameszone1016@gmail\\\.com\`

🔒 \*\*Password:\*\* \`@hehe\\\.69\`

\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-

🎉 After successfully booking, share the scheduled date in this group\\.`,

johnOn : `

⚠️ \*IMPORTANT\*

🟢 \*John is online\*  
🚫 \*\*Do not log in\*\*\\. Close the tab—\*John will likely book the slots\*\\.  
🔒 \*\*Multiple logins may flag your account\*\* and result in a \*72\\-hour freeze\*\\.
`,
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
