import dotenv from 'dotenv';
import app from './src/app.js';
import { initAndSeedDatabase } from './src/db/seed.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Ensure database schema and seed data are initialized
try {
  initAndSeedDatabase();
} catch (err) {
  console.error('Failed to initialize SQLite database:', err);
}

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  PlacementHub AI Lab - Server running on port ${PORT}`);
  console.log(`  Database Engine: SQLite (better-sqlite3)`);
  console.log(`  Access Demo App: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
