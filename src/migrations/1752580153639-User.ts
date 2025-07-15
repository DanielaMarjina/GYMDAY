import { MigrationInterface, QueryRunner } from "typeorm";

export class User1752580153639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
     }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }

}
