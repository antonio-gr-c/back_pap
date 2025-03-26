import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

// ⚠️ Desactiva la verificación TLS global.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Crea el Pool sin ssl config (o con sslmode=require en la URL)
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // No pongas ssl: {...} aquí, déjalo vacío.
});

(async () => {
  try {
    const result = await db.query('SELECT 1 as test');
    console.log('Conexión exitosa a la base de datos de Supabase:', result.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  }
})();
