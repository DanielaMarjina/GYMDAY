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

  @Column({ type: "varchar", length: 255, nullable: false })
  muscles_trained: string;


  @Column({
    name: "day_of_week",
    type: "enum",
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
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
