import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1647169575146 implements MigrationInterface {
    name = 'migration1647169575146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "latitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "longitude" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "longitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "latitude" character varying NOT NULL`);
    }

}
