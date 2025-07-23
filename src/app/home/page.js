"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function HomePage() {
    const today = new Date();
    const actualDay = days[today.getDay()];

    const [exercises, setExercises] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newExercise, setNewExercise] = useState({
        exercise_id: "",
        sets: 4,
        reps: 12,
        weight: 2.5,
    });
    const [day, setDay] = useState(null);
    const [muscles, setMuscles] = useState();

    useEffect(() => {
        async function fetchDay() {
            const res = await fetch(`/api/workoutexercises/exercisestoday`);
            if (res.ok) {
                const data = await res.json();
                console.log("API response for today's workout:", data);
                setDay(data);
            } else {
                console.log("No workout today or error:", await res.text());
                setDay(null);
            }
        }
        fetchDay();
    }, []);

    useEffect(() => {
        async function fetchMusclesTrained() {
            const res = await fetch(`/api/workouts`);
            if (res.ok) {
                const data = await res.json();
                setMuscles(data);
            } else {
                setMuscles(null);
            }
        }
        fetchMusclesTrained();
    }, []);

    useEffect(() => {
        const fetchTodayWorkout = async () => {
            const res = await fetch("/api/workoutexercises/exercisestoday");
            const data = await res.json();

            if (res.ok) {
                setExercises(data.exercises || []); 
            } else {
                console.warn("No workout for today or error:", data.message || data.error);
                setExercises([]);
            }
        };

        fetchTodayWorkout();
    }, []);

    useEffect(() => {
        const fetchAllExercises = async () => {
            const res = await fetch("/api/exercises");
            const data = await res.json();

            if (res.ok) {
                setAllExercises(data);
            } else {
                console.warn("No exercises for today or error:", data.message || data.error);
                setAllExercises([]);
            }
        };

        fetchAllExercises();
    }, []);

    const updateExercise = (index, field, value) => {
        const updated = [...exercises];
        updated[index][field] = value;
        setExercises(updated);
    };

    const saveExercises = async () => {
        try {
            const results = await Promise.all(
                exercises.map((ex) =>
                    fetch(`/api/workoutexercises`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(ex),
                    })
                )
            );

            const allOk = results.every((res) => res.ok);
            alert(allOk ? "Saved all exercises!" : "Error saving some exercises");
        } catch (error) {
            alert("Network or server error");
        }
    };

    const deleteExercise = async (id) => {
        const confirmed = confirm("Are you sure you want to delete this exercise?");
        if (!confirmed) return;

        const res = await fetch(`/api/workoutexercises?id=${id}`, {  
            method: "DELETE",
        });

        if (res.ok) {
            setExercises(exercises.filter((ex) => ex.id !== id));
        } else {
            alert("Failed to delete exercise");
        }
    };


    const handleAddExercise = async () => {
        if (!newExercise.exercise_id) {
            alert("Please select an exercise!");
            return;
        }

        if (!day?.workout_id) {
            alert("Workout ID is missing!");
            return;
        }

        console.log("Sending to API:", {
            exercise_id: newExercise.exercise_id,
            sets: newExercise.sets,
            reps: newExercise.reps,
            weight: newExercise.weight,
            workout_id: day.workout_id,
            order_in_workout: exercises.length + 1,
        });

        try {
            const res = await fetch("/api/workoutexercises", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    exercise_id: newExercise.exercise_id,
                    sets: newExercise.sets,
                    reps: newExercise.reps,
                    weight: newExercise.weight,
                    workout_id: day.workout_id,
                    order_in_workout: exercises.length + 1,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setExercises([...exercises, data]);
                setShowAddForm(false);
                setNewExercise({ exercise_id: "", sets: 4, reps: 12, weight: 2.5 });
            } else {
                alert("Failed to add exercise: " + (data.error || JSON.stringify(data)));
            }
        } catch (error) {
            alert("Network error: " + error.message);
        }
    };

    return (
        <div className="flex">
            {/* MENIU */}
            <aside className="fixed top-0 left-0 h-screen w-56 bg-blue-600 text-gray-100 flex flex-col p-5 shadow-md">
                <div className="flex items-center gap-2 mb-7">
                    <Image src="/favicon.ico" alt="Logo" width={40} height={40} className="rounded-lg" />
                    <h2 className="text-3xl font-bold text-center m-0">GYMDAY</h2>
                </div>
                <nav className="flex flex-col gap-4">
                    <Link href="/home" className="nav-link hover:underline">
                        HOME
                    </Link>
                    <Link href="/calendar" className="nav-link hover:underline">
                        CALENDAR
                    </Link>
                    <Link href="/goals" className="nav-link hover:underline">
                        GOALS
                    </Link>
                    <Link href="/progress" className="nav-link hover:underline">
                        PROGRESS
                    </Link>
                    <Link href="/rewards" className="nav-link hover:underline">
                        REWARDS
                    </Link>
                    <Link href="/login" className="nav-link hover:underline">
                        LOG OUT
                    </Link>
                </nav>
            </aside>

            {/* CONTINUT */}
            <main className="flex flex-col flex-1 ml-56 p-10 bg-gray-100 text-blue-400 min-h-screen">
                <h2 className="text-4xl font-bold mb-2 text-center text-gray-800">HOME</h2>
                <h1 className="text-2xl font-semibold mb-1 text-center text-blue-600">{actualDay.toUpperCase()}'s program:</h1>
                {day && <h3 className="text-xl font-light mb-1 text-center text-blue-600">{day.muscles_trained}</h3>}

                {exercises.length > 0 ? (
                    <div className="max-w-xl mx-auto bg-white p-5 rounded-xl shadow-md mt-5">
                        <ul className="list-inside text-gray-700 leading-relaxed text-base">
                            {exercises.map((ex, idx) => (
                                <li key={idx} className="mb-2">
                                    <div className="flex items-center gap-4">
                                        <strong className="w-32">{ex.exercise.name}</strong>
                                        <div className="flex items-center w-24">
                                            <input
                                                type="number"
                                                value={ex.sets}
                                                onChange={(e) => updateExercise(idx, "sets", parseInt(e.target.value))}
                                                className="w-12 p-1 border rounded text-sm"
                                            />
                                            <span className="ml-1 whitespace-nowrap">sets</span>
                                        </div>
                                        <div className="flex items-center w-24">
                                            <input
                                                type="number"
                                                value={ex.reps}
                                                onChange={(e) => updateExercise(idx, "reps", parseInt(e.target.value))}
                                                className="w-12 p-1 border rounded text-sm"
                                            />
                                            <span className="ml-1 whitespace-nowrap">reps</span>
                                        </div>
                                        <div className="flex items-center w-28">
                                            <input
                                                type="number"
                                                value={ex.weight}
                                                onChange={(e) => updateExercise(idx, "weight", parseFloat(e.target.value))}
                                                className="w-15 p-1 border rounded text-sm"
                                            />
                                            <span className="ml-1 whitespace-nowrap">kg</span>
                                        </div>

                                        <button
                                            onClick={() => deleteExercise(ex.id)}
                                            className="cursor-pointer w-24 bg-red-500 hover:bg-red-800 font-bold text-white py-2 rounded transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto bg-white p-5 rounded-xl shadow-md mt-5">
                        <p className="text-center">Today it's REST DAY!</p>
                    </div>
                )}


                {showAddForm && (
                    <div className="mt-4 p-4 bg-blue-100 rounded-md max-w-xl mx-auto">
                        <h4 className="text-blue-700 font-semibold mb-2">Add Exercise</h4>

                        <select
                            value={newExercise.exercise_id}
                            onChange={(e) => setNewExercise({ ...newExercise, exercise_id: e.target.value })}
                            className="block mb-2 p-2 border rounded w-full"
                        >
                            <option value="">Select an exercise</option>
                            {allExercises.map((ex) => (
                                <option key={ex.id} value={ex.id}>
                                    {ex.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex gap-4">
                            <input
                                type="number"
                                placeholder="Sets"
                                value={newExercise.sets}
                                onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                                className="w-24 p-1 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Reps"
                                value={newExercise.reps}
                                onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
                                className="w-24 p-1 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Weight (kg)"
                                value={newExercise.weight}
                                onChange={(e) => setNewExercise({ ...newExercise, weight: parseFloat(e.target.value) })}
                                className="w-32 p-1 border rounded"
                            />
                        </div>

                        <button
                            onClick={handleAddExercise}
                            className="cursor-pointer mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                )}

                <div className="flex-grow" />

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={saveExercises}
                        className="cursor-pointer w-40 mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                    >
                        Save changes
                    </button>

                    <button
                        onClick={() => setShowAddForm(true)}
                        className="cursor-pointer w-40 mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition block"
                    >
                        Add exercise
                    </button>
                </div>
            </main>
        </div>
    );
}
