import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutPlan1752580204011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
  
    await queryRunner.query(`
      CREATE TABLE workout_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS workout_plans`);
  }
}