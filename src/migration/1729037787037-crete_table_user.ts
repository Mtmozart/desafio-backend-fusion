import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1680000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable("user");
        if (!tableExists) {
            await queryRunner.query(`
                CREATE TABLE public.user (
                    id integer NOT NULL,
                    name character varying NOT NULL,
                    email character varying NOT NULL,
                    cpf character varying NOT NULL,
                    type_user int NOT NULL,
                    phone character varying NOT NULL,
                    password character varying NOT NULL,
                    created_at timestamp without time zone DEFAULT now() NOT NULL,
                    updated_at timestamp without time zone DEFAULT now() NOT NULL,
                    primary key (id)
                );
            `);
            
            await queryRunner.query(`
                CREATE SEQUENCE public.user_id_seq
                    AS integer
                    START WITH 1
                    INCREMENT BY 1
                    NO MINVALUE
                    NO MAXVALUE
                    CACHE 1;
            `);

            await queryRunner.query(`
                ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;
            `);

            await queryRunner.query(`
                ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE public.user;`);
    }
}
