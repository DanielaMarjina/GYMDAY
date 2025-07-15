import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./entity/User";
// import { WorkoutPlan } from "./entity/WorkoutPlan";


const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin1234",
  database: "gymday",
  synchronize: false,
  logging: true,
  //entities: [User, WorkoutPlan],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;
