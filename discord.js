import { Client } from 'discord.js-selfbot-v13'
const selfbot = new Client();

function main() {
  
  selfbot.on('ready', async () => {
    console.log(`${selfbot.user.username} is ready!`);
  })
  console.log(process.env)
  selfbot.login(process.env.DIS_TOKEN);
  
}

export default selfbot;