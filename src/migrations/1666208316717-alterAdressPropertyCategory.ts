import { MigrationInterface, QueryRunner } from "typeorm";

export class alterAdressPropertyCategory1666208316717 implements MigrationInterface {
    name = 'alterAdressPropertyCategory1666208316717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_672d1164dcbb054275e37c049ff"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_ca9977669df4807ef2202584495"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "REL_672d1164dcbb054275e37c049f"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "adressesId"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "REL_ca9977669df4807ef220258449"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "categoriesId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "adressIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_7ccdcbf4e4ffdc275fb1eb32957" UNIQUE ("adressIdId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "categoryIDId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_5bf7c72a91cecdfa6f0c30c4b64" UNIQUE ("categoryIDId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957" FOREIGN KEY ("adressIdId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_5bf7c72a91cecdfa6f0c30c4b64" FOREIGN KEY ("categoryIDId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_5bf7c72a91cecdfa6f0c30c4b64"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_5bf7c72a91cecdfa6f0c30c4b64"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "categoryIDId"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "adressIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "categoriesId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "REL_ca9977669df4807ef220258449" UNIQUE ("categoriesId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "adressesId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "REL_672d1164dcbb054275e37c049f" UNIQUE ("adressesId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_ca9977669df4807ef2202584495" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_672d1164dcbb054275e37c049ff" FOREIGN KEY ("adressesId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
