import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import type { Exercise } from "./Exercise";
import type { Workout } from "./Workout";

@Entity("workout_exercises")
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => require("./Workout").Workout, (workout: Workout) => workout.workoutExercises)
  @JoinColumn({ name: "workout_id" })
  workout: Workout;

  @ManyToOne(() => require("./Exercise").Exercise, (exercise: Exercise) => exercise.usedIn)
  @JoinColumn({ name: "exercise_id" })
  exercise: Exercise;

  @Column({ default: 3 })
  sets: number;

  @Column({ default: 10 })
  reps: number;

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ default: 1 })
  order_in_workout: number;
}
