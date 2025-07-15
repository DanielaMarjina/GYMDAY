import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";
import { WorkoutExercise } from "./WorkoutExercise";

@Entity("workout")
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    nullable: true,
  })
  day_of_week?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

  @Column({ type: "date", nullable: true })
  date?: string;  

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.workouts, { onDelete: "CASCADE" })
  plan?: WorkoutPlan;

  @OneToMany(() => WorkoutExercise, (exercise) => exercise.workout)
  workoutExercises?: WorkoutExercise[];
}
