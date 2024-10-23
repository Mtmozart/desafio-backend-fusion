import { EnvConfig } from 'src/config/variables';
import { PlanteEntity } from 'src/modules/planet/entity/plante.entity';
import { UserEntity } from 'src/modules/users/entity/user';
import { DataSource, DataSourceOptions } from 'typeorm';


export const dataSourceConfig = (): DataSourceOptions => {
      return {
        type: 'postgres',
        database: EnvConfig.DATABASE.NAME_DB,
        host: EnvConfig.DATABASE.HOST_DB,
        password: EnvConfig.DATABASE.PASSWORD_DB,
        port: EnvConfig.DATABASE.PORT_DB,
        username: EnvConfig.DATABASE.USER_DB,
        migrations: [`${__dirname}/../migrations/{.ts,*.js}`],
        synchronize: false,  
        entities: [
         UserEntity,
         PlanteEntity
        ]
    }
}

const datasource = new DataSource(dataSourceConfig());

export default datasource;
