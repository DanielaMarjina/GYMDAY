import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { initializeDataSource } from "../../../data-source";
import { User } from "../../../entities/User";

export async function GET() {
  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const users = await userRepo.find();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, passwordHash } = body;

    if (!name || !passwordHash || !email
    ) {
      return NextResponse.json({ error: "Missing username, email or password" }, { status: 400 });
    }

    const dataSource = await initializeDataSource();
    const userRepository = dataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOneBy({ name });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // Save user
    const newUser = userRepository.create({ name, email ,passwordHash: hashedPassword });
    await userRepository.save(newUser);

    return NextResponse.json({ message: "User created successfully", user: { id: newUser.id, name: newUser.name } }, { status: 201 });

  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
