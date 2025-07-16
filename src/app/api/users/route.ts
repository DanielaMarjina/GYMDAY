import { NextResponse } from "next/server";
import { initializeDataSource } from "../../../data-source";
import { User } from "../../../entities/User";

export async function GET() {
  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const users = await userRepo.find();
  return NextResponse.json(users);
}
