import express from 'express';
import { port } from '../config/config.js';

export function startWebServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
