import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";  
import type { Workout } from "./Workout";

@Entity("workout_plans")
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => require("./User").User, (user: User) => user.workoutPlans, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @OneToMany(() => require("./Workout").Workout, (workout: Workout) => workout.workoutPlan)
  workouts: Workout[];
}
