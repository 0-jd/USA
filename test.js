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



import fs from 'fs';
import { join } from 'path';

let data = [];

// fs.readdir(`./src/commands/`, (err, files) => {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   data.push(files)
// })

// console.log(data)

async function registerCmd() {

  const cmdDir = './src/commands/'
  
  let cmdFiles = [];
  cmdFiles = fs.readdirSync(cmdDir);

  cmdFiles.forEach( async (cmdFile) => {
    let cmdName = cmdFile.split('.')[0];
    let cmd = await import(cmdDir + cmdFile);
    console.log(cmd)
  });
  
}

registerCmd();

