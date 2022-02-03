import 'reflect-metadata';
import 'pg';
import { Connection, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Plan } from '@domain/plan/infra/typeorm/entities/Plan';
import { Profile } from '@domain/auth/infra/typeorm/entities/Profile';
import { User } from '@domain/auth/infra/typeorm/entities/User';
import { Location } from '@domain/plan/infra/typeorm/entities/Location';
import { DB_URL } from './constants';

export class DBManager {
  private static connection: Connection;

  public static async getConnection(): Promise<Connection> {
    if (!DBManager.connection || !DBManager.connection.isConnected) {
      if (DBManager.connection) {
        await DBManager.connection.close();
      }
      DBManager.connection = await createConnection({
        url: DB_URL,
        type: 'postgres',
        entities: [Plan, Profile, User, Location],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
      });
    }

    return DBManager.connection;
  }
}
