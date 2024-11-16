import { Api } from 'telegram';
import { generateRandomBigInt, readBufferFromBigInt, readBigIntFromBuffer, sha256 } from 'telegram/Helpers.js';
import bigInt from 'big-integer';

export async function makeCall(userId, client) {
  const dhConfig = await client.invoke(new Api.messages.GetDhConfig({
    version: 0,
    randomLength: 256
  }));

  if (dhConfig instanceof Api.messages.DhConfigNotModified) {
    throw new Error("Invalid DHConfig");
  }

  let a = bigInt.zero;
  let p = readBigIntFromBuffer(dhConfig.p, false, false);
  let g = bigInt(dhConfig.g);

  while (!(bigInt.one.lesser(a) && a.lesser(p.minus(1)))) {
    a = generateRandomBigInt();
  }

  const ga = g.modPow(a, p);
  const gaHash = await sha256(readBufferFromBigInt(ga, 256, false, false));

  const call = await client.invoke(new Api.phone.RequestCall({
    userId,
    gAHash: gaHash,
    randomId: Math.floor(Math.random() * 0x7ffffffa),
    protocol: new Api.PhoneCallProtocol({
      minLayer: 93,
      maxLayer: 93,
      udpP2p: true,
      udpReflector: true,
      libraryVersions: ["4.0.0", "3.0.0", "2.7.7", "2.4.4"]
    })
  }))

  console.log("CALL HAS STARTED!");


  // Create a Promise to wait for the call status
  const status = await new Promise((resolve) => {
    const handler = (async (update) => {

      if (update.className === 'UpdatePhoneCall' && update?.phoneCall) {
        resolve(update.phoneCall.reason.className.includes('Disconnect') ? true : false); // True means picked up, false means declined
        client.removeEventHandler(handler);
      }
    });
    client.addEventHandler(handler)
  });

  return status;

}


