import * as mongoose from 'mongoose';

import { ProvideSingleton, inject } from '../ioc';

@ProvideSingleton(DbConnection)
export class DbConnection {
  public db: mongoose.Connection
  private connectionString: string = 'mongodb://username:password@ds023398.mlab.com:23398/hotels';

  constructor() {
    this.db = mongoose.createConnection(this.connectionString);
  }
}
