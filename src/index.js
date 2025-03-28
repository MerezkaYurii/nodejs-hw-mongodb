import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstraps = async () => {
  await initMongoConnection();
  setupServer();
};
bootstraps();
