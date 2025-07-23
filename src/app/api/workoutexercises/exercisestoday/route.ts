import { NextResponse } from "next/server";
import { initializeDataSource } from "../../../../data-source";
import { WorkoutExercise } from "../../../../entities/WorkoutExercise";
import { Workout } from "../../../../entities/Workout";

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const today = days[new Date().getDay()];

console.log("Actual day:", today);


export async function GET() {
  try {
    const db = await initializeDataSource();

    const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

    console.log("Today (lowercase):", today);

    const workoutRepo = db.getRepository(Workout);
    const workout = await workoutRepo
      .createQueryBuilder("workout")
      .where("workout.day_of_week = :today", { today })
      .getOne();

    console.log("Workout for today:", workout);

    if (!workout) {
      return NextResponse.json({ message: `No workout found for today (${today})` }, { status: 404 });
    }

    const weRepo = db.getRepository(WorkoutExercise);
    const exercises = await weRepo.find({
      where: { workout: { id: workout.id } },
      relations: ["exercise", "workout"],
      order: { order_in_workout: "ASC" },
    });

    console.log("Exercises for today's workout:", exercises);

    return NextResponse.json({
      workout_id: workout.id,
      muscles_trained: workout.muscles_trained,
      exercises: exercises
    });
  } catch (error) {
    console.error("Error fetching today's workout:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
