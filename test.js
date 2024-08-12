// import { TelegramClient } from "telegram";
// import { StringSession } from "telegram/sessions/index.js";
// import readline from "readline";

// const apiId = 23920672;
// const apiHash = "ac3253b3af0d2faec77a65adb9217569";
// const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjE3OAG7AqoM+qPZp1AKYqcdMyeSQIqYKkp77aiijgOYGoEqvoyoAnK4h2qvvXTgNKvC8Y4JOeiXqmDYZU7y4tAbhb4OeKitCr57CfddokwT+NmhZSg/jh3DEm9UXPjnW/eT0WaY5fXGdB4wkSPT8deeEeTYPyDq4o0mEvXvZMLnjHOZcOYGv49zXcGYE58j7crI3uc8wAV/deOdaX+PDGOqHb8rchD3PR9KCM6tprD3+Rn0/kg2EAZGCuSowOpPqBFJo2JV6Ep8hPin9OPALb6Iq9Al+8TA0jEVxSlQfCXDp6yTAG/EdIx7Sx+tNZgLaeb01P5xwPjGlDT8LGb69MYnseJ/dw=="); // fill this later with the value from session.save()

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// (async () => {
//   console.log("Loading interactive example...");
//   const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });
//   await client.start({
//     phoneNumber: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter your number: ", resolve)
//       ),
//     password: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter your password: ", resolve)
//       ),
//     phoneCode: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter the code you received: ", resolve)
//       ),
//     onError: (err) => console.log(err),
//   });
//   console.log("You should now be connected.");
//   console.log(client.session.save()); // Save this string to avoid logging in again
//   await client.sendMessage("me", { message: "Hello!" });
// })();


import 'dotenv/config'

// console.log(process.env)

console.log(process.env.test)


console.log(Date.now())




// old code

(async () => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, Number(process.env.apiId), process.env.apiHash, {
      connectionRetries: 5,
    });
  
    await client.start({
      phoneNumber: async () =>
        new Promise((resolve) =>
          rl.question("Please enter your number: ", resolve)
        ),
      password: async () =>
        new Promise((resolve) =>
          rl.question("Please enter your password: ", resolve)
        ),
      phoneCode: async () =>
        new Promise((resolve) =>
          rl.question("Please enter the code you received: ", resolve)
        ),
      onError: (err) => console.log(err),
    });
  
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    
    //test
  
    const NewMsg = new NewMessage({chats: [1002231374270]});
  
    console.log(JSON.stringify(NewMsg, null, 2));
  
    client.addEventHandler((event) => {
      console.log(Number(event.message.peerId.channelId))
   }, new NewMessage({chats: [1002231374270]}))
  
   const monthRegex = new RegExp(
    '\\b(' +
    'Sep(?:tember)?|' +  // Match 'Sep' or 'September'
    'Oct(?:ober)?|' +    // Match 'Oct' or 'October'
    'Nov(?:ember)?|' +   // Match 'Nov' or 'November'
    'Dec(?:ember)?' +    // Match 'Dec' or 'December'
    ')\\b',               // End of capturing group
    'i'                   // 'i' for case-insensitive matching
  );
  
  const result = await client.invoke(
    new Api.phone.CreateGroupCall({
      peer: "hemloz",
      randomId: 43,
      rtmpStream: false,
      title: "My very normal title",
      broadcast: false,
      // scheduleDate: Date.now(),
    })
  );
  console.log(result); // prints the result
  
  
  })();