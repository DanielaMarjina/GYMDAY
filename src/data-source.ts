import { DataSource } from "typeorm";
import "mysql2";
import { User } from "./entities/User";
import { WorkoutPlan } from "./entities/WorkoutPlan";
import { Workout } from "./entities/Workout";
import { Exercise } from "./entities/Exercise";
import { WorkoutExercise } from "./entities/WorkoutExercise";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "practica",
  password: "admin1234",
  database: "gymday",
  synchronize: false,
  logging: false,
  entities: [User, WorkoutPlan, Workout, Exercise, WorkoutExercise],
  migrations: ["src/migrations/*.js"],
});

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
