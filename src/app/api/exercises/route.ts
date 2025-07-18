import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from "../../../data-source";
import { Exercise } from "../../../entities/Exercise";

export async function POST(request: NextRequest) {
  try {
    const dataSource = await initializeDataSource();

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const data = await request.json();
    const { name, description} = data;

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const exercise = new Exercise();
    exercise.name = name;
    exercise.description = description || "";

    const savedExercise = await dataSource.manager.save(exercise);

    return NextResponse.json(savedExercise, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
