import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkout1753181091780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE workouts
            ADD COLUMN muscles_trained VARCHAR(255) NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE workouts
            DROP COLUMN muscles_trained;
        `);
    }

}
