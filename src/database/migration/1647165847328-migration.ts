import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1647165847328 implements MigrationInterface {
    name = 'migration1647165847328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "startAt" TIMESTAMP NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "duration" character varying NOT NULL, "summary" character varying NOT NULL, "description" character varying NOT NULL, "whatsAppUrl" character varying, "contact" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
