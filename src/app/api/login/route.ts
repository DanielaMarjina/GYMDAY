import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { initializeDataSource } from "../../../data-source";
import { User } from "../../../entities/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { name, passwordHash } = body;

    if (!name || !passwordHash) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const dataSource = await initializeDataSource();
    const userRepository = dataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ name });

    if (!existingUser) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(passwordHash, existingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      user: { id: existingUser.id, username: existingUser.name }
    }, { status: 200 });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
