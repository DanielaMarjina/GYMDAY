import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";


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
  password: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

 
  @OneToMany(() => require("./WorkoutPlan").WorkoutPlan, (plan: WorkoutPlan) => plan.user)
  workoutPlans: WorkoutPlan[];
}
