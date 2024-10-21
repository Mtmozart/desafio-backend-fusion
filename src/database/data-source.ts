import { UserEntity } from 'src/modules/users/entity/user';
import { DataSource, DataSourceOptions } from 'typeorm';


export const dataSourceConfig = (): DataSourceOptions => {
      return {
        type: 'postgres',
        database: 'start_wars',
        host: 'localhost',
        password: String(123),
        port: Number(process.env.DB_PORT),
        username: 'postgres',
        migrations: [`${__dirname}/../migrations/{.ts,*.js}`],
        synchronize: false,  
        entities: [
         UserEntity 
        ]
    }
}

const datasource = new DataSource(dataSourceConfig());

export default datasource;
