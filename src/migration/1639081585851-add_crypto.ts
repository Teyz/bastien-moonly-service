import {MigrationInterface, QueryRunner} from "typeorm";

export class addCrypto1639081585851 implements MigrationInterface {
    name = 'addCrypto1639081585851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crypto" ("id" uuid NOT NULL, "name" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, CONSTRAINT "PK_5084b15a218a51654c1db780d8b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "crypto"`);
    }

}
