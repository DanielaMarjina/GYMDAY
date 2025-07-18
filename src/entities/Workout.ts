import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";
import { WorkoutExercise } from "./WorkoutExercise";

@Entity("workouts")
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "plan_id" })
  planId: number;

  @Column({
    name: "day_of_week",
    type: "enum",
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    nullable: true,
  })
  dayOfWeek: string | null;

  @Column({ type: "date", nullable: true })
  date: Date | null;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.workouts)
  @JoinColumn({ name: "plan_id" })
  workoutPlan: WorkoutPlan;

  @OneToMany(() => WorkoutExercise, (exercise) => exercise.workout)
  workoutExercises: WorkoutExercise[];
}
