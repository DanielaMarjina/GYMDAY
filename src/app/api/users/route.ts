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
    const { name, email, password } = body;

    if (!name || !password || !email
    ) {
      return NextResponse.json({ error: "Missing username, email or password" }, { status: 400 });
    }

    const dataSource = await initializeDataSource();
    const userRepository = dataSource.getRepository(User);

    
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = userRepository.create({ name, email ,password: hashedPassword });
    await userRepository.save(newUser);

    return NextResponse.json({ message: "User created successfully", user: { id: newUser.id, name: newUser.name } }, { status: 201 });

  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}