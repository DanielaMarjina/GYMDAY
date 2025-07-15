import { MigrationInterface, QueryRunner } from "typeorm";

export class Workout1752580933986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_id INT NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') DEFAULT NULL,
    date DATE DEFAULT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE
);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS workouts`);
    }

}
