import dotenv from 'dotenv';

dotenv.config();

import { createApp } from './app';
import { initDb } from './db';

async function main() {
  await initDb();

  const app = createApp();
  const port = Number(process.env.PORT ?? 3000);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
