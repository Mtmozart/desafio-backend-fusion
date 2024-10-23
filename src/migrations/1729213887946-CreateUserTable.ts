import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1729213887946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE user_type_enum AS ENUM ('youngling', 'padawan', 'jedi', 'grand_master', 'darth', 'lord_sith');
      
      CREATE TABLE public.user (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        roles VARCHAR NOT NULL,
        type_user user_type_enum NOT NULL,
    
        created_at TIMESTAMP DEFAULT now() NOT NULL,
        updated_at TIMESTAMP DEFAULT now() NOT NULL
      );
    
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    
      CREATE TRIGGER update_user_updated_at
      BEFORE UPDATE ON public.user
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
    `);
    }    

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        DROP TRIGGER update_user_updated_at ON public.user;
        DROP FUNCTION update_updated_at_column();
        DROP TABLE public.user;
        DROP TYPE user_type_enum;
      `);
    }
  }
