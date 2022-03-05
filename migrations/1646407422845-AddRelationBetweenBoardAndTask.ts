import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationBetweenBoardAndTask1646407422845 implements MigrationInterface {
    name = 'AddRelationBetweenBoardAndTask1646407422845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "boardId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardId"`);
    }

}
