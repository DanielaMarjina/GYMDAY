"use client";

import React, { useState, useEffect } from "react";
import program from "../data/program";
import Link from "next/link";
import Image from "next/image";

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];




export default function HomePage() {
    const today = new Date();
    const actualDay = days[today.getDay()];
    const day = program[actualDay];

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const res = await fetch(`/api/exercises/${actualDay}`);
            const data = await res.json();
            setExercises(data);
        };
        fetchExercises();
    }, [actualDay]);

    const updateExercise = (index, field, value) => {
        const updated = [...exercises];
        updated[index][field] = value;
        setExercises(updated);
    };

    const saveExercises = async () => {
        const res = await fetch(`/api/exercises/${actualDay}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ exercises })
        });
        const data = await res.json();
        alert(data.success ? "Saved!" : "Error saving");
    };



    return (
        <div className="flex h-screen font-sans">
            {/* MENIU */}
            <aside className="w-56 bg-blue-600 text-gray-100 flex flex-col p-5 shadow-md">
                <div className="flex items-center gap-2 mb-7">
                    <Image
                        src="/favicon.ico"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                    <h2 className="text-3xl font-bold text-center m-0">GYMDAY</h2>
                </div>
                <nav className="flex flex-col gap-4">
                    <Link href="/home" className="nav-link hover:underline">HOME</Link>
                    <Link href="/calendar" className="nav-link hover:underline">CALENDAR</Link>
                    <Link href="/goals" className="nav-link hover:underline">GOALS</Link>
                    <Link href="/progress" className="nav-link hover:underline">PROGRESS</Link>
                    <Link href="/rewards" className="nav-link hover:underline">REWARDS</Link>
                    <Link href="/login" className="nav-link hover:underline">LOG OUT</Link>
                </nav>
            </aside>

            {/* CONTINUT */}

            <main className="flex flex-col flex-1 p-10 bg-gray-100 text-blue-400">
                <h2 className="text-4xl font-bold mb-2 text-center text-gray-800">HOME</h2>
                <h1 className="text-2xl font-semibold mb-1 text-center text-blue-600">
                    {actualDay.toUpperCase()}'s program:
                </h1>
                <h3 className="text-xl font-light mb-1 text-center text-blue-600">{day.type_day}</h3>

                {day.exercises.length > 0 ? (
                    <div className="max-w-xl mx-auto bg-white p-5 rounded-xl shadow-md mt-5">
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed text-base">
                            {exercises.map((ex, idx) => (
                                <li key={idx} className="mb-2">
                                    <div>
                                        {ex.exerciseName} 
                                        <input
                                            type="number"
                                            value={ex.sets}
                                            onChange={(e) => updateExercise(idx, 'sets', parseInt(e.target.value))}
                                            className="w-16 mx-2 p-1 border rounded text-sm"
                                        /> sets 
                                        <input
                                            type="number"
                                            value={ex.reps}
                                            onChange={(e) => updateExercise(idx, 'reps', parseInt(e.target.value))}
                                            className="w-16 mx-2 p-1 border rounded text-sm"
                                        />
                                        reps @
                                        <input
                                            type="number"
                                            value={ex.weight}
                                            onChange={(e) => updateExercise(idx, 'weight', parseInt(e.target.value))}
                                            className="w-16 mx-2 p-1 border rounded text-sm"
                                        /> kg
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                ) : (
                    <div className="max-w-xl mx-auto bg-white p-5 rounded-xl shadow-md mt-5">
                        <p className="text-center">Today it's REST DAY!</p>
                    </div>
                )
                }

                {/* <button onClick={saveExercises} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button> */}


            </main>
        </div>
    );
}
