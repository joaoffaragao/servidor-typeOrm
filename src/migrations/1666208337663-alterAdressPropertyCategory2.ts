import { MigrationInterface, QueryRunner } from "typeorm";

export class alterAdressPropertyCategory21666208337663 implements MigrationInterface {
    name = 'alterAdressPropertyCategory21666208337663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_5bf7c72a91cecdfa6f0c30c4b64"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryIDId" TO "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME CONSTRAINT "UQ_5bf7c72a91cecdfa6f0c30c4b64" TO "UQ_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_f051b757f8e45139549dceb39af" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME CONSTRAINT "UQ_f051b757f8e45139549dceb39af" TO "UQ_5bf7c72a91cecdfa6f0c30c4b64"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryIdId" TO "categoryIDId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_5bf7c72a91cecdfa6f0c30c4b64" FOREIGN KEY ("categoryIDId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
