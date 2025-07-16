import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,  // << aici adaugă JoinColumn
} from "typeorm";

import type { Exercise } from "./Exercise";
import type { Workout } from "./Workout";

@Entity("workout_exercise")
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => require("./Workout").Workout, (workout: Workout) => workout.workoutExercises)
  workout: Workout;

  @ManyToOne(() => require("./Exercise").Exercise, (exercise: Exercise) => exercise.usedIn)
  @JoinColumn({ name: "exercise_id" })
  exercise: Exercise;

  @Column()
  reps: number;

  @Column()
  sets: number;
}
