import express from 'express';
import { misc } from '../config/config.js';

export function startWebServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(misc.port, () => {
    console.log(`App listening on port ${misc.port}`);
  });
}
