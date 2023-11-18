const express = require('express');
const next = require('next');

const port = parseInt(process.env.BLOCKLET_PORT || process.env.PORT, 10) || 3000;
const dev = process.env.BLOCKLET_MODE !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const router = express.Router();
  server.use(router);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
