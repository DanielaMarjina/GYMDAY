import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { WorkoutExercise } from "./WorkoutExercise";

@Entity("exercise")
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.exercise)
  usedIn?: WorkoutExercise[];
}
