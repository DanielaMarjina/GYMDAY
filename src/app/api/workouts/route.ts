import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from "../../../data-source";
import { Workout } from "../../../entities/Workout";

export async function POST(request: NextRequest) {
  try {
    const dataSource = await initializeDataSource();

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const data = await request.json();
    const { plan_id, day_of_week, date, completed} = data;

    if (!plan_id) {
      return NextResponse.json({ error: "plan_id is required" }, { status: 400 });
    }

    const workout = new Workout();
    workout.planId = plan_id;
    workout.dayOfWeek = day_of_week || "";
    workout.date = date ? new Date(date) : null;
    workout.completed = completed ?? false;

    const savedWorkout = await dataSource.manager.save(workout);

    return NextResponse.json(savedWorkout, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
