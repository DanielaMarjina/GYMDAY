import { NextResponse } from "next/server";
import { initializeDataSource } from "../../../../data-source";
import { Workout } from "../../../../entities/Workout";
import { WorkoutExercise } from "../../../../entities/WorkoutExercise";

export async function GET(request: Request) {
  try {
    const db = await initializeDataSource();

    const url = new URL(request.url);
    let day = url.searchParams.get('day') || '';
    
    if (!day) {
      day = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    }

    day = day.toLowerCase();

    const workout = await db.getRepository(Workout).findOne({
      where: { dayOfWeek: day }
    });

    if (!workout) {
      return NextResponse.json({ message: "Rest day" });
    }

    const exercises = await db.getRepository(WorkoutExercise).find({
      where: { workout: { id: workout.id } },
      relations: ["exercise"]
    });

    return NextResponse.json({
      workout_id: workout.id,
      muscles_trained: workout.muscles_trained,
      exercises: exercises.map((ex) => ({
        id: ex.id,
        name: ex.exercise.name,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
      }))
    });

  } catch (err) {
    console.error("Eroare API:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
