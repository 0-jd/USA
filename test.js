// const text = `
// ⚠️ *IMPORTANT*

// 🟢 *John is online*  
// 🚫 **Do not log in**. Close the tab—*John will likely book the slots*.  
// 🔒 **Multiple logins may flag your account** and result in a *72-hour freeze*.
// `;

// import fs from 'fs'

// const data = text
//     .replace(/\_/g, '\\_')
//     .replace(/\*/g, '\\*')
//     .replace(/\[/g, '\\[')
//     .replace(/\]/g, '\\]')
//     .replace(/\(/g, '\\\\(')
//     .replace(/\)/g, '\\\\)')
//     .replace(/\~/g, '\\~')
//     .replace(/\`/g, '\\`')
//     .replace(/\>/g, '\\>')
//     .replace(/\#/g, '\\#')
//     .replace(/\+/g, '\\+')
//     .replace(/\-/g, '\\\\-')
//     .replace(/\=/g, '\\=')
//     .replace(/\|/g, '\\|')
//     .replace(/\{/g, '\\{')
//     .replace(/\}/g, '\\}')
//     .replace(/\./g, '\\\\.')
//     .replace(/\!/g, '\\!')

//     // Specify the file path
// const filePath = 'example.txt';

// // Write the data to the file
// fs.writeFile(filePath, data, (err) => {
//   if (err) {
//     console.error('An error occurred while writing the file:', err);
//     return;
//   }
//   console.log('File written successfully');
// });

// // console.log(data)



// import fs from 'fs';
// import { join } from 'path';

// let data = [];

// async function registerCmd() {

//   const cmdDir = './src/commands/'
  
//   let cmdFiles = [];
//   cmdFiles = fs.readdirSync(cmdDir);

//   cmdFiles.forEach( async (cmdFile) => {
//     let cmdName = cmdFile.split('.')[0];
//     let cmd = await import(cmdDir + cmdFile);
//     console.log(cmd)
//   });
  
// }

// registerCmd();


// import { format, formatInTimeZone } from 'date-fns-tz';

// // Define a UTC date
// const utcDate = new Date(1723389061 * 1000);

// // Define the time zone
// const timeZone = 'Asia/Kathmandu';

// // Format the date in the specified time zone
// const formattedDate = formatInTimeZone(utcDate, timeZone, 'MMM/dd hh:mm:ss a');
// console.log("Time:", formattedDate);



// function sanitizeMsg(message) {
//     message
//         .replace(/_/g, '\\_')   // Underscore
//         .replace(/\*/g, '\\*')  // Asterisk
//         .replace(/\[/g, '\\[')  // Left square bracket
//         .replace(/\]/g, '\\]')  // Right square bracket
//         .replace(/\(/g, '\\(')  // Left parenthesis
//         .replace(/\)/g, '\\)')  // Right parenthesis
//         .replace(/~/g, '\\~')   // Tilde
//         .replace(/`/g, '\\`')   // Backtick
//         .replace(/>/g, '\\>')   // Greater-than
//         .replace(/#/g, '\\#')   // Hash
//         .replace(/\+/g, '\\+')  // Plus
//         .replace(/-/g, '\\-')   // Hyphen
//         .replace(/=/g, '\\=')   // Equals
//         .replace(/\|/g, '\\|')  // Vertical bar
//         .replace(/{/g, '\\{')   // Left curly brace
//         .replace(/}/g, '\\}')   // Right curly brace
//         .replace(/\./g, '\\.')  // Period
//         .replace(/!/g, '\\!');  // Exclamation mark

//         console.log(message)

//         return message;
// }

const text = `🚨 **SLOTS OPEN**

🗓️ **Slot Date:** __{available date}__
📅 **Current Date:** __{current date}__
🛠️ \`Slot Info Provider:\`

{Info Provider}

⚠️ **IMPORTANT**
|| If you see this alert, ⚡ log in and book the appointment immediately. Time is critical. 
However, if a follow-up message states, 🟢 "John is online," 🚫 do not log in. Close the tab, as John will likely book the slots. 
But if you're already logged in, ✅ ignore the previous warnings and proceed to the appointment scheduling page to secure the earliest available date. ||

🔑 **Credentials:**
Tap to copy the credentials. || ( You can also save the password in your browser for quicker access. )  ||

📧 **Email:** \`{Email}\`

🔒 **Password:** \`{Password}\`

🎉 After successfully booking, share the scheduled date in this group.
`

// console.log(sanitizeMsg(text))



// import fs from 'fs'

// const data = text
//     .replace(/\_/g, '\\_')
//     .replace(/\*/g, '\\*')
//     .replace(/\[/g, '\\[')
//     .replace(/\]/g, '\\]')
//     .replace(/\(/g, '\\(')
//     .replace(/\)/g, '\\)')
//     .replace(/\~/g, '\\~')
//     .replace(/\`/g, '\\`')
//     .replace(/\>/g, '\\>')
//     .replace(/\#/g, '\\#')
//     .replace(/\+/g, '\\+')
//     .replace(/\-/g, '\\-')
//     .replace(/\=/g, '\\=')
//     .replace(/\|/g, '\\|')
//     .replace(/\{/g, '\\{')
//     .replace(/\}/g, '\\}')
//     .replace(/\./g, '\\.')
//     .replace(/\!/g, '\\!')

//     // Specify the file path
// const filePath = 'example.txt';

// console.log(data)

// // Write the data to the file
// fs.writeFile(filePath, data, (err) => {
//   if (err) {
//     console.error('An error occurred while writing the file:', err);
//     return;
//   }
//   console.log('File written successfully');
// });

// console.log(data)

// import { alerts, sanitizeMsg } from './src/config/config.js'
// import fs from 'fs'


// const test = sanitizeMsg(text);
// console.log(JSON.stringify(test))

// // Write the data to the file
// fs.writeFile('huhu.txt', test, (err) => {
//   if (err) {
//     console.error('An error occurred while writing the file:', err);
//     return;
//   }
//   console.log('File written successfully');
// });

function convertToMarkdownV2(input) {
    // Escape reserved characters
    let output = input
        .replace(/([*_~\[\]()\\])/g, '\\$1') // Escape MarkdownV2 symbols
        .replace(/\\\[\[(.*?)\\\]\]/g, '[$1]') // Preserve inline links
        .replace(/\\\((.*?)\\\)/g, '($1)') // Preserve URLs in links
        .replace(/\\\*\*(.*?)\\\*\*/g, '*$1*') // Bold
        .replace(/\\\*(.*?)\\\*/g, '_$1_') // Italic
        .replace(/\\\_\_(.*?)\\\_\_/g, '__$1__') // Underline
        .replace(/\\\~\~(.*?)\\\~\~/g, '~$1~') // Strikethrough
        .replace(/\\\|\|(.*?)\\\|\|/g, '||$1||'); // Spoilers

    return output;
}

// Example usage:
const userInput = `
**bold text**
*italic text*
__underline text__
~~strikethrough text~~
||spoiler text||
[inline URL](http://www.example.com/)
[inline mention](tg://user?id=123456789)
(Extra information)
`;

const convertedOutput = convertToMarkdownV2(userInput);
console.log(convertedOutput);

