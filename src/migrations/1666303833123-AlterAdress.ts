import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAdress1666303833123 implements MigrationInterface {
    name = 'AlterAdress1666303833123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "distric"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "distric" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "zipCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "state" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "state" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "city" character varying(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "number" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "zipCode" character varying(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "distric"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "distric" character varying(45) NOT NULL`);
    }

}
