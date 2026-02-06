import sql from "mssql";

const pools: Record<string, sql.ConnectionPool> = {};

export async function getPool(database: string) {
  if (pools[database]?.connected) {
    return pools[database];
  }

  const pool = new sql.ConnectionPool({
    server: process.env.DB_SERVER!,
    port: 1433,
    database,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    options: {
      encrypt: true,
      enableArithAbort: true
    }
  });

  await pool.connect();
  pools[database] = pool;
  return pool;
}
