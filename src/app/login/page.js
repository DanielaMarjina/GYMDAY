"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
                                           //GREGNB
    const data = {
      name: username,
      password: password,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        router.push("/home");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Login failed");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#5483B3]">
      <form
        onSubmit={handleLogin}
        className="bg-[#7DA0CA] p-6 rounded-lg font-bold text-lg shadow-md flex flex-col gap-2 w-[500px]"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-lg font-bold text-lg cursor-pointer border-none focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg font-bold text-lg cursor-pointer border-none focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#0070f3] text-white p-3 rounded-lg font-bold text-lg cursor-pointer shadow-md transition-colors duration-300 hover:bg-[#005bb5]"
        >
          Login
        </button>
      </form>
    </div>
  );
}
