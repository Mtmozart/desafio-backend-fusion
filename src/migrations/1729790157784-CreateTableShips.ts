import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableShips1729790157784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.ship (
              id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
              name VARCHAR NOT NULL,
              user_id UUID,          
              created_at TIMESTAMP DEFAULT now() NOT NULL,
              updated_at TIMESTAMP DEFAULT now() NOT NULL,
              CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
            );

            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
              NEW.updated_at = now();
              RETURN NEW;
            END;
            $$ language 'plpgsql';

            CREATE TRIGGER update_ship_updated_at
            BEFORE UPDATE ON public.ship
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS update_ship_updated_at ON public.ship;
            DROP TABLE IF EXISTS public.ship;
        `);
    }
}
