import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAddress1666334386714 implements MigrationInterface {
    name = 'AlterAddress1666334386714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_e9058266ab1b092d636b1868956"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "adressId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME CONSTRAINT "UQ_e9058266ab1b092d636b1868956" TO "UQ_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_2b2211958ef1f0e3c680339100e" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME CONSTRAINT "UQ_2b2211958ef1f0e3c680339100e" TO "UQ_e9058266ab1b092d636b1868956"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addressId" TO "adressId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_e9058266ab1b092d636b1868956" FOREIGN KEY ("adressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
