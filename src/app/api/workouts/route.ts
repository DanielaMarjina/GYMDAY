import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from "../../../data-source";
import { Workout } from "../../../entities/Workout";

export async function GET() {
  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const db = await initializeDataSource();
    const workoutRepo = db.getRepository(Workout);
    const workout = await workoutRepo.findOneBy({ dayOfWeek: today });

    if (!workout) {
      return NextResponse.json({ message: `No workout found for today (${today})` }, { status: 404 });
    }
    
    return NextResponse.json({
      workout_id: workout.id,
      muscles_trained: workout.muscles_trained,
      dayOfWeek: workout.dayOfWeek,
      date: workout.date,
      completed: workout.completed,
    });
  } catch (error) {
    console.error("Error fetching today's workout:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await initializeDataSource();

    if (!db.isInitialized) {
      await db.initialize();
    }

    const data = await request.json();
    const { plan_id, muscles_trained, day_of_week, date, completed } = data;

    if (!plan_id) {
      return NextResponse.json({ error: "plan_id is required" }, { status: 400 });
    }

    const workout = new Workout();
    workout.planId = plan_id;
    workout.muscles_trained = data.muscles_trained;
    workout.dayOfWeek = day_of_week || "";
    workout.date = date ? new Date(date) : null;
    workout.completed = completed ?? false;

    const savedWorkout = await db.manager.save(workout);

    return NextResponse.json(savedWorkout, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
