import { Client, GroupDMChannel } from 'discord.js-selfbot-v13'
import dotenv from 'dotenv';

dotenv.config();
const selfbot = new Client();

async function main() {
  
  selfbot.on('ready', async () => {
    console.log(`${selfbot.user.username} is ready!`);
    test();
  })


   selfbot.login(process.env.DIS_TOKEN);
  
}

async function test() {
  // const grpDM = await selfbot.channels.fetch('1273269866484338698');

  // console.log(recipents);
  // const test =  awaitgrpDM.ring(recipents)

  const groupDMChannel = await selfbot.channels.fetch('1273269866484338698');
  const recipents = groupDMChannel. _recipients

  console.log(GroupDMChannel)
    

      groupDMChannel.ring(recipents)
          .then(() => console.log('Ringing the group DM...'))
          .catch(console.error);



  // console.log(test)

  //  console.log(test)
}

main();

export default selfbot;