import { DynamicModule, Provider } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';

export const DB_PROVIDER = 'DB';

export const databaseConfig: DynamicModule = {
  module: class DatabaseModule {},
  providers: [
    {
      provide: DB_PROVIDER,
      useFactory: async () => {
        const pool = new Pool({
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '5432'),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        return drizzle(pool, { schema });
      },
    } as Provider<NodePgDatabase<typeof schema>>,
  ],
  exports: [DB_PROVIDER],
};
