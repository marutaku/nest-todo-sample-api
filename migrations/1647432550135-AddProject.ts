import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProject1647432550135 implements MigrationInterface {
    name = 'AddProject1647432550135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "ceatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_users_user" ("projectId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_198c78e84c3bcdb0dc182e6d1e0" PRIMARY KEY ("projectId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9666c6dcd769c698bed4aa4bf5" ON "project_users_user" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8300efd87679e1e21532be980" ON "project_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "board" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_954fce22cf9a797afc6b1560c76" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_f8300efd87679e1e21532be9808" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_f8300efd87679e1e21532be9808"`);
        await queryRunner.query(`ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_954fce22cf9a797afc6b1560c76"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "projectId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8300efd87679e1e21532be980"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9666c6dcd769c698bed4aa4bf5"`);
        await queryRunner.query(`DROP TABLE "project_users_user"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
