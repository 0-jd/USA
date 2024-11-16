import express from 'express';
import { misc } from '../../extras/config.js';
const app = express();

export function startWebServer() {

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(misc.port, () => {
    console.log(`App listening on port ${misc.port}`);
  });
}

export function getCode(number) {

  return new Promise((resolve, reject) => {
    console.log(`Enter the code sent to ${number}`);
    
    // Define the route handler outside of the promise.
    app.get('/send-code/:code', (req, res) => {
      console.log("Route handler triggered");

      const code = req.params.code;
  
      // Validate the code to be exactly 6 digits
      if (/^\d{5,6}$/.test(code)) {
        res.status(200).send({ success: true, message: `Code ${code} received!` });
        resolve(code); // Resolve the promise with the code once it's validated
      } else {
        res.status(400).send({ success: false, message: 'Invalid code format. It should be a 6-digit number.' });
      }
    });

  });
}
