import { MigrationInterface, QueryRunner } from "typeorm";

export class alterAdressPropertyCategory31666208438762 implements MigrationInterface {
    name = 'alterAdressPropertyCategory31666208438762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "adressIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "adressId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_e9058266ab1b092d636b1868956" UNIQUE ("adressId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_a82b56d3d456c30b8c630cba0c6" UNIQUE ("categoryId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_e9058266ab1b092d636b1868956" FOREIGN KEY ("adressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_a82b56d3d456c30b8c630cba0c6" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_a82b56d3d456c30b8c630cba0c6"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_e9058266ab1b092d636b1868956"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_a82b56d3d456c30b8c630cba0c6"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_e9058266ab1b092d636b1868956"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "adressId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "categoryIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_f051b757f8e45139549dceb39af" UNIQUE ("categoryIdId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "adressIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_7ccdcbf4e4ffdc275fb1eb32957" UNIQUE ("adressIdId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_f051b757f8e45139549dceb39af" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957" FOREIGN KEY ("adressIdId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
