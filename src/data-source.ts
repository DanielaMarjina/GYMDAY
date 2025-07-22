import { DataSource } from "typeorm";
import "mysql2";
import * as path from "path"; 
import { User } from "./entities/User";
import { WorkoutPlan } from "./entities/WorkoutPlan";
import { Workout } from "./entities/Workout";
import { Exercise } from "./entities/Exercise";
import { WorkoutExercise } from "./entities/WorkoutExercise";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin1234",
  database: "gymday",
  synchronize: false,
  logging: false,
  entities: [User, WorkoutPlan, Workout, Exercise, WorkoutExercise],
  migrations: [path.join(__dirname, "migrations/*.ts")],  
});

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
