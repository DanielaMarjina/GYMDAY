import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
// import doar tipul, fără import runtime
import type { WorkoutExercise } from "./WorkoutExercise";

@Entity("exercise")
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  // folosește require() pentru a evita ciclu la runtime
  @OneToMany(() => require("./WorkoutExercise").WorkoutExercise, (workoutExercise: WorkoutExercise) => workoutExercise.exercise)
  usedIn?: WorkoutExercise[];
}
