import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

// importă doar tipul pentru WorkoutPlan (fără import runtime)
import type { WorkoutPlan } from "./WorkoutPlan";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "password_hash" })
  passwordHash: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // Folosește require() în decorator și tip explicit pentru parametru
  @OneToMany(() => require("./WorkoutPlan").WorkoutPlan, (plan: WorkoutPlan) => plan.user)
  workoutPlans: WorkoutPlan[];
}
