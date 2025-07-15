import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@Entity("workout_exercise")
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", default: 3 })
  sets: number;

  @Column({ type: "int", default: 10 })
  reps: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  weight?: number;

  @Column({ type: "int", default: 1 })
  order_in_workout: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, { onDelete: "CASCADE" })
  workout?: Workout;

  @ManyToOne(() => Exercise, (exercise) => exercise.usedIn, { onDelete: "CASCADE" })
  exercise?: Exercise;
}
