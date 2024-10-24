# Desafio BackEnd Fusion: **Criar** e **Gerenciar** a Galáxia Inspirada em Star Wars

## Objetivo

Desenvolver uma **API backend** para criar, gerenciar e visualizar uma galáxia inspirada em Star Wars. A API incluirá entidades como **galáxias**, **planetas**, **sistemas estelares**, **personagens** e **naves espaciais**. A aplicação será desenvolvida utilizando **NestJS** ou **Express** com **PostgreSQL** e **TypeORM**. A documentação da API será gerada com **Swagger** e estará disponível em `http://localhost:3000/api`.

## Requisitos do Projeto

### Estrutura da API

- **Framework:** Node.js utilizando **NestJS**.
- **Linguagem:** TypeScript para garantir segurança e tipagem estática no código.
- **Padrão:** A API deve seguir os princípios **RESTful**.
- **Banco de Dados:** **PostgreSQL** com **TypeORM**.
- **Documentação:** **Swagger**, acessível via `http://localhost:3000/api`.

### Entidades

1. **Galáxia (Galaxy):**

   - `nome`: Nome da galáxia (string).
   - `descrição`: Descrição da galáxia (string).
   - `sistemas_estelares`: Lista de sistemas estelares pertencentes à galáxia.

2. **Planetas (Planet):**

   - `nome`: Nome do planeta (string).
   - `sistema`: Entidade de sistema o qual faz parte, como o universo real onde um planeta geralmente pertence a um sistema solar que pertence a uma galaxia.
   - `aliança`: Ele faz parte da aliança rebelde, império ou independente.

3. **Sistemas Estelares (StarSystem):**

   - `nome`: Nome do sistema estelar (string).
   - `planetas`: Lista de planetas pertencentes ao sistema estelar com array de planetas.

4. **Personagens (Character):**

   - `nome`: Nome do personagem (string).
   - `afiliação`: Afiliação (Jedi, Sith, Rebelde, etc.) (Enum), conforme listado para poder criar o usuário:

   ```typescript
   export enum TypeUser {
     YOUNGLING = 'youngling',
     PADAWAN = 'padawan',
     JEDI = 'jedi',
     GRAND_MASTER = 'grand_master',
     DARTH = 'darth',
     LORD_SITH = 'lord_sith',
   }
   ```

5. **Naves Espaciais (Spaceship):**
   - `nome`: Nome da nave espacial (string).
   - `dono`: Dono da nave (ID do personagem).

### Endpoints

#### **Galáxias**

- **POST** `/galaxy`: Criar uma nova galáxia.
- **GET** `/galaxy/all`: Listar todas as galáxias.
- **GET** `/galaxy/:id`: Obter detalhes de uma galáxia específica.
- **PUT** `/galaxy/:id`: Atualizar informações de uma galáxia.
- **DELETE** `/galaxy/:id`: Deletar uma galáxia.

#### **Planetas**

- **POST** `/planet`: Criar um novo planeta.
- **GET** `/planet/all`: Listar todos os planetas.
- **GET** `/planet/:id`: Obter detalhes de um planeta específico.
- **PUT** `/planet/:id`: Atualizar informações de um planeta.
- **DELETE** `/planet/:id`: Deletar um planeta.

#### **Sistemas Estelares**

- **POST** `/system`: Criar um novo sistema estelar.
- **GET** `/system/all`: Listar todos os sistemas estelares.
- **GET** `/system/:id`: Obter detalhes de um sistema estelar específico.
- **PUT** `/system/:id`: Atualizar informações de um sistema estelar.
- **DELETE** `/system/:id`: Deletar um sistema estelar.

#### **Personagens**

- **POST** `/user`: Criar um novo personagem.
- **GET** `/user/all`: Listar todos os personagens.
- **GET** `/user/:id`: Obter detalhes de um personagem específico.
- **PUT** `/user/:id`: Atualizar informações de um personagem.
- **DELETE** `/user/:id`: Deletar um personagem.

#### **Naves Espaciais**

- **POST** `/ship`: Criar uma nova nave espacial.
- **GET** `/ship/all`: Listar todas as naves espaciais.
- **GET** `/ship/:id`: Obter detalhes de uma nave espacial específica.
- **PUT** `/ship/:id`: Atualizar informações de uma nave espacial.
- **DELETE** `/ship/:id`: Deletar uma nave espacial.

### Autenticação e Autorização

- Implementar autenticação com **JWT** (JSON Web Token).
- Proteger endpoints para que **apenas usuários autenticados** possam criar, atualizar ou deletar dados, sendo em alguns casos restritos para usuários de nível mais baixo e permissão para grão mestres.

### Banco de Dados

- **PostgreSQL** será utilizado como banco de dados, com **TypeORM** como ORM para mapear as entidades.

### Configuração do Banco de Dados com **TypeORM**

```typescript
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
      PlanetEntity,
      GalaxyEntity,
      SystemEntity,
      ShipEntity,
    ],
  };
};

const datasource = new DataSource(dataSourceConfig());

export default datasource;
```

### Exemplo de Modelos de Entidades com **TypeORM**

**Galáxia (Galaxy.entity.ts)**

```typescript
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'type_user', nullable: false })
  typeUser: TypeUser;

  @Column('simple-array')
  roles: string[];

  @OneToMany(() => GalaxyEntity, (galaxy) => galaxy.user)
  galaxies: GalaxyEntity[];

  @OneToMany(() => SystemEntity, (system) => system.user)
  systems: SystemEntity[];

  @OneToMany(() => PlanetEntity, (planet) => planet.user)
  planets: PlanetEntity[];

  @OneToMany(() => ShipEntity, (ship) => ship.user)
  ships: ShipEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

### Documentação da API com Swagger

- O **Swagger** estará disponível no endpoint `http://localhost:3000/api`.
- Para habilitar o Swagger no NestJS, adicione o seguinte código no arquivo principal (`main.ts`):

### Validação de Dados e Tratamento de Erros

- Utilizar **class-validator** para validar entradas no NestJS, com retornos de erro apropriados como por exemplo:
  - `400 Bad Request` para dados inválidos.
  - `404 Not Found` quando uma entidade não for encontrada.

### Migrações e start

Deve primeiro fazer um `npm run start`, depois cancelar e fazer o comando para o migrate: `npx typeorm migration:run -d dist/database/data-source.js`.

## tecnologias gerais:

`typescript`;
`nest`;
`jwt`;
`bcrypt`;
`Postgres`;
`TypeOrm`;
`Node`;
`Swagger`;
