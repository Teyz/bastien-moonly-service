import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCryptos1639140248054 implements MigrationInterface {
    name = 'fixCryptos1639140248054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crypto" ADD "symbol" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "current_price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "past_price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "percentage" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "isIncrease" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "isIncrease" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "percentage" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "past_price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" ALTER COLUMN "current_price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crypto" DROP COLUMN "symbol"`);
    }

}
