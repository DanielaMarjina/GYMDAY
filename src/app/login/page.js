"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username == "admin" && password == "1234") {
            router.push("/home");
        }
        else {
            alert("Wrong username/password!");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin}
                style={styles.form}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button
                    type="submit"
                    style={styles.button}

                    onMouseEnter={e => e.target.style.backgroundColor = "#005bb5"}
                    onMouseLeave={e => e.target.style.backgroundColor = "#0070f3"}
                >Login</button>
            </form>
        </div >
    );
}

const styles = {
    container:
    {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5483B3"
    },
    form:
    {
        backgroundColor: "#7DA0CA",
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 500
    },
    input:
    {
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
    },
    button:
    {
        backgroundColor: "#0070f3",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 112, 243, 0.5)",
        transition: "background-color 0.3s ease"
    }

};