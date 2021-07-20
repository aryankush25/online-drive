import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1626814943767 implements MigrationInterface {
    name = 'UserMigration1626814943767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "hashedPassword" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
