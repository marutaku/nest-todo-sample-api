import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskStatus1647869374632 implements MigrationInterface {
    name = 'AddTaskStatus1647869374632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_954fce22cf9a797afc6b1560c76"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "status" TO "statusId"`);
        await queryRunner.query(`CREATE TABLE "task_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "boardId" integer, CONSTRAINT "UQ_5826616869433a2e06d5fb12f61" UNIQUE ("boardId", "order"), CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c" FOREIGN KEY ("statusId") REFERENCES "task_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_status" ADD CONSTRAINT "FK_e33941acb2b2b9c1b23ebd0d3d0" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_954fce22cf9a797afc6b1560c76" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_954fce22cf9a797afc6b1560c76"`);
        await queryRunner.query(`ALTER TABLE "task_status" DROP CONSTRAINT "FK_e33941acb2b2b9c1b23ebd0d3d0"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "statusId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "task_status"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "statusId" TO "status"`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_954fce22cf9a797afc6b1560c76" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
