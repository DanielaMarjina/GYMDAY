import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import type { WorkoutExercise } from "./WorkoutExercise";

@Entity("exercises")
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;


  @OneToMany(() => require("./WorkoutExercise").WorkoutExercise, (workoutExercise: WorkoutExercise) => workoutExercise.exercise)
  usedIn?: WorkoutExercise[];
}
