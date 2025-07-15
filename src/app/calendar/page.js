"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { generateMonthlyProgram } from "../calendar/generateMonthlyProgram";
import program from "../data/program";
import Link from "next/link";
import Image from "next/image";
import './calendar.css';


export default function CalendarPage() {

    const [date, setDate] = useState(new Date());
    const [program, setProgram] = useState({});

    useEffect(() => {
        const calendarData = generateMonthlyProgram();
        setProgram(calendarData);
    }, []);

    const getDayType = (date) => {
        const iso = date.toISOString().split("T")[0];
        return program[iso]?.type;
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

            <div className="p-6 flex-1 h-full bg-[#f4f4f4] flex justify-center items-start overflow-x-auto">
                <div className="calendar-container">
                    <div style={{ minWidth: "800px" }}>
                        <h1 className="text-2xl text-center text-[#2C3E50] font-bold mt-0 mb-4">GYM Calendar</h1>
                        <Calendar
                            onChange={setDate}
                            value={date}

                            tileContent={({ date }) => (
                                <div className="text-xs text-blue-600 text-center">
                                    {getDayType(date)}
                                </div>
                            )}
                            className="gym-calendar"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
