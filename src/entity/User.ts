import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany,
} from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";


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

    @OneToMany(() => WorkoutPlan, (plan) => plan.user)
    workoutPlans: WorkoutPlan[];
}
