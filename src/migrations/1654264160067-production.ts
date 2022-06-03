import {MigrationInterface, QueryRunner} from "typeorm";

export class production1654264160067 implements MigrationInterface {
    name = 'production1654264160067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "refreshtoken" character varying, "refreshtokenexpires" character varying, "fcmToken" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-alerte" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lower_price" integer, "upper_price" integer, "cryptoId" uuid, "userId" uuid, CONSTRAINT "PK_eb27a8634b03db1df40ff346cbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crypto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cmc_rank" integer, "name" character varying(300) NOT NULL, "icon_url" character varying(300) NOT NULL, "symbol" character varying(300), "current_price" double precision, "past_price" json, "percentage" character varying, "isIncrease" boolean, "tags" text NOT NULL, "percentages" json, CONSTRAINT "PK_5084b15a218a51654c1db780d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_bookmarked_cryptos_crypto" ("userId" uuid NOT NULL, "cryptoId" uuid NOT NULL, CONSTRAINT "PK_68650d7466b2f923ad3238120ea" PRIMARY KEY ("userId", "cryptoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a047b9ffa2043f6e51c74efd4d" ON "user_bookmarked_cryptos_crypto" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d7cb004b192b6a8c3d2edff8e" ON "user_bookmarked_cryptos_crypto" ("cryptoId") `);
        await queryRunner.query(`ALTER TABLE "user-alerte" ADD CONSTRAINT "FK_2c2199a1bbf8e6112c3b2e9e32e" FOREIGN KEY ("cryptoId") REFERENCES "crypto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-alerte" ADD CONSTRAINT "FK_d24d7e4421147543b2f91b9d4d7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bookmarked_cryptos_crypto" ADD CONSTRAINT "FK_a047b9ffa2043f6e51c74efd4d6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_bookmarked_cryptos_crypto" ADD CONSTRAINT "FK_5d7cb004b192b6a8c3d2edff8e7" FOREIGN KEY ("cryptoId") REFERENCES "crypto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bookmarked_cryptos_crypto" DROP CONSTRAINT "FK_5d7cb004b192b6a8c3d2edff8e7"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarked_cryptos_crypto" DROP CONSTRAINT "FK_a047b9ffa2043f6e51c74efd4d6"`);
        await queryRunner.query(`ALTER TABLE "user-alerte" DROP CONSTRAINT "FK_d24d7e4421147543b2f91b9d4d7"`);
        await queryRunner.query(`ALTER TABLE "user-alerte" DROP CONSTRAINT "FK_2c2199a1bbf8e6112c3b2e9e32e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d7cb004b192b6a8c3d2edff8e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a047b9ffa2043f6e51c74efd4d"`);
        await queryRunner.query(`DROP TABLE "user_bookmarked_cryptos_crypto"`);
        await queryRunner.query(`DROP TABLE "crypto"`);
        await queryRunner.query(`DROP TABLE "user-alerte"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
