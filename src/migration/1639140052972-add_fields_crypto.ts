import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldsCrypto1639140052972 implements MigrationInterface {
  name = 'addFieldsCrypto1639140052972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crypto" ADD "symbol" character varying(300) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "crypto" DROP COLUMN "symbol"`);
  }
}
