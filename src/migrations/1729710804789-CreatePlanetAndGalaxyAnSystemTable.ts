import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanetAndGalaxyAnSystemTable1729710804789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE planet_type_enum AS ENUM ('rebel_alliance', 'galactic_empire', 'factions_independent');
        `);

        await queryRunner.query(`
            CREATE TABLE public.galaxy (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT now() NOT NULL,
                updated_at TIMESTAMP DEFAULT now() NOT NULL,
                user_id UUID,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE public.system (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR NOT NULL UNIQUE,
                galaxy_id UUID,
                user_id UUID,
                created_at TIMESTAMP DEFAULT now() NOT NULL,
                updated_at TIMESTAMP DEFAULT now() NOT NULL,
                CONSTRAINT fk_galaxy FOREIGN KEY (galaxy_id) REFERENCES public.galaxy (id),
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
           );
        `);

        await queryRunner.query(`
            CREATE TABLE public.planet (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR NOT NULL UNIQUE,
                faction planet_type_enum,
                user_id UUID,
                system_id UUID,
                created_at TIMESTAMP DEFAULT now() NOT NULL,
                updated_at TIMESTAMP DEFAULT now() NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
                CONSTRAINT fk_system FOREIGN KEY (system_id) REFERENCES public.system (id)
            );
        `);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE 'plpgsql';
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_planet_updated_at
            BEFORE UPDATE ON public.planet
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
        `);
        
        await queryRunner.query(`
            CREATE TRIGGER update_system_updated_at
            BEFORE UPDATE ON public.system
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_galaxy_updated_at
            BEFORE UPDATE ON public.galaxy
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_planet_updated_at ON public.planet;`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_system_updated_at ON public.system;`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_galaxy_updated_at ON public.galaxy;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column;`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.planet;`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.system;`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.galaxy;`);
        await queryRunner.query(`DROP TYPE IF EXISTS planet_type_enum;`);
    }
}
