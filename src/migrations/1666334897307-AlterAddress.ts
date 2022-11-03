import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAddress1666334897307 implements MigrationInterface {
    name = 'AlterAddress1666334897307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" RENAME COLUMN "distric" TO "district"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" RENAME COLUMN "district" TO "distric"`);
    }

}
