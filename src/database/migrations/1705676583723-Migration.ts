import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705676583723 implements MigrationInterface {
    name = 'Migration1705676583723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."space_auth_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "space_auth" ("userId" uuid NOT NULL, "spaceId" integer NOT NULL, "role" "public"."space_auth_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf7c592f647bfa502b902b1635d" PRIMARY KEY ("userId", "spaceId"))`);
        await queryRunner.query(`CREATE TABLE "space" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."issue_priority_enum" AS ENUM('URGENT', 'HIGH', 'MEDIUM', 'LOW')`);
        await queryRunner.query(`CREATE TYPE "public"."issue_progress_enum" AS ENUM('BACKLOG', 'READY', 'IN_PROGRESS', 'IN_REVIEW', 'DONE')`);
        await queryRunner.query(`CREATE TYPE "public"."issue_size_enum" AS ENUM('X-LARGE', 'LARGE', 'MEDIUM', 'SMALL', 'TINY')`);
        await queryRunner.query(`CREATE TABLE "issue" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "todoDay" TIMESTAMP NOT NULL, "startDay" TIMESTAMP, "endDay" TIMESTAMP, "priority" "public"."issue_priority_enum", "progress" "public"."issue_progress_enum", "size" "public"."issue_size_enum", "complete" boolean NOT NULL, "content" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "spaceId" integer, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "issueId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "nickname" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "space_auth" ADD CONSTRAINT "FK_5ed3a45837ce67b5e7c5285df39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "space_auth" ADD CONSTRAINT "FK_ccc2f1c77c35a34c26fe5942399" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_4c6703056d25d335a21c9259da2" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c91b5a63310845bdeca63d9ee13" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c91b5a63310845bdeca63d9ee13"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_4c6703056d25d335a21c9259da2"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df"`);
        await queryRunner.query(`ALTER TABLE "space_auth" DROP CONSTRAINT "FK_ccc2f1c77c35a34c26fe5942399"`);
        await queryRunner.query(`ALTER TABLE "space_auth" DROP CONSTRAINT "FK_5ed3a45837ce67b5e7c5285df39"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "issue"`);
        await queryRunner.query(`DROP TYPE "public"."issue_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."issue_progress_enum"`);
        await queryRunner.query(`DROP TYPE "public"."issue_priority_enum"`);
        await queryRunner.query(`DROP TABLE "space"`);
        await queryRunner.query(`DROP TABLE "space_auth"`);
        await queryRunner.query(`DROP TYPE "public"."space_auth_role_enum"`);
    }

}
