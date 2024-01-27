import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706361926085 implements MigrationInterface {
    name = 'Migration1706361926085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue" DROP COLUMN "complete"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue" ADD "complete" boolean NOT NULL`);
    }

}
