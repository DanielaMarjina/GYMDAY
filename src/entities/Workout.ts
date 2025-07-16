import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

// importă doar tipurile pentru tipare, nu și implementarea
import type { WorkoutPlan } from "./WorkoutPlan";
import type { WorkoutExercise } from "./WorkoutExercise";

@Entity("workout")
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @ManyToOne(() => require("./WorkoutPlan").WorkoutPlan, (plan: WorkoutPlan) => plan.workouts)
  workoutPlan: WorkoutPlan;

  @OneToMany(() => require("./WorkoutExercise").WorkoutExercise, (exercise: WorkoutExercise) => exercise.workout)
  workoutExercises: WorkoutExercise[];
}
