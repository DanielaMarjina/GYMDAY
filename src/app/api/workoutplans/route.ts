import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from "../../../data-source";
import { WorkoutPlan } from "../../../entities/WorkoutPlan";

export async function POST(request: NextRequest) {
  try {
    const dataSource = await initializeDataSource();

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const data = await request.json();
    const { user_id, name, description } = data;

    if (!user_id || !name) {
      return NextResponse.json({ error: "user_id and name are required" }, { status: 400 });
    }

    const workoutPlan = new WorkoutPlan();
    workoutPlan.userId = user_id;
    workoutPlan.name = name;
    workoutPlan.description = description || "";

    const savedPlan = await dataSource.manager.save(workoutPlan);

    return NextResponse.json(savedPlan, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
