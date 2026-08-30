import '../envConfig';
import { createAdmin } from '../lib/shopdb';

async function runAdmin() {
  await createAdmin();
}

runAdmin();