import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from "../../../data-source";
import { WorkoutExercise } from "../../../entities/WorkoutExercise";
import { Workout } from "../../../entities/Workout";
import { Exercise } from "../../../entities/Exercise";


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      workout_id,
      exercise_id,
      sets = 3,
      reps = 10,
      weight,
      order_in_workout = 1,
    } = data;

    if (!workout_id || !exercise_id) {
      return NextResponse.json(
        { error: "workout_id and exercise_id are required" },
        { status: 400 }
      );
    }

    const db = await initializeDataSource();
    const workoutRepo = db.getRepository(Workout);
    const exerciseRepo = db.getRepository(Exercise);
    const weRepo = db.getRepository(WorkoutExercise);

    const workout = await workoutRepo.findOneBy({ id: workout_id });
    const exercise = await exerciseRepo.findOneBy({ id: exercise_id });

    if (!workout || !exercise) {
      return NextResponse.json({ error: "Invalid workout or exercise ID" }, { status: 404 });
    }

    const workoutExercise = new WorkoutExercise();
    workoutExercise.workout = workout;
    workoutExercise.exercise = exercise;
    workoutExercise.sets = sets;
    workoutExercise.reps = reps;
    workoutExercise.weight = weight;
    workoutExercise.order_in_workout = order_in_workout;

    const saved = await weRepo.save(workoutExercise);

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("POST WorkoutExercise error:", error);
    return NextResponse.json({ error: "Failed to create workout exercise" }, { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id,
      workout_id,
      exercise_id,
      sets,
      reps,
      weight,
      order_in_workout,
    } = data;

    if (!id) {
      return NextResponse.json({ error: "WorkoutExercise id is required" }, { status: 400 });
    }

    const db = await initializeDataSource();
    const repo = db.getRepository(WorkoutExercise);

    const workoutExercise = await repo.findOne({
      where: { id },
      relations: ["workout", "exercise"],
    });

    if (!workoutExercise) {
      return NextResponse.json({ error: "WorkoutExercise not found" }, { status: 404 });
    }

    if (workout_id) {
      const workout = await db.getRepository(Workout).findOneBy({ id: workout_id });
      if (!workout) return NextResponse.json({ error: "Workout not found" }, { status: 404 });
      workoutExercise.workout = workout;
    }

    if (exercise_id) {
      const exercise = await db.getRepository(Exercise).findOneBy({ id: exercise_id });
      if (!exercise) return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
      workoutExercise.exercise = exercise;
    }

    if (sets !== undefined) workoutExercise.sets = sets;
    if (reps !== undefined) workoutExercise.reps = reps;
    if (weight !== undefined) workoutExercise.weight = weight;
    if (order_in_workout !== undefined) workoutExercise.order_in_workout = order_in_workout;

    const updated = await repo.save(workoutExercise);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT WorkoutExercise error:", error);
    return NextResponse.json({ error: "Failed to update workout exercise" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));

    if (!id) {
      return NextResponse.json({ error: "WorkoutExercise id is required" }, { status: 400 });
    }

    const db = await initializeDataSource();
    const repo = db.getRepository(WorkoutExercise);

    const workoutExercise = await repo.findOneBy({ id });

    if (!workoutExercise) {
      return NextResponse.json({ error: "WorkoutExercise not found" }, { status: 404 });
    }

    await repo.remove(workoutExercise);

    return NextResponse.json({ message: `WorkoutExercise with id ${id} deleted` });
  } catch (error) {
    console.error("DELETE WorkoutExercise error:", error);
    return NextResponse.json({ error: "Failed to delete workout exercise" }, { status: 500 });
  }
}

