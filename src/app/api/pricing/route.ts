import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pricing = await prisma.pricingPlan.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(pricing);
  } catch (error) {
    console.error("API Error (GET /pricing):", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const plan = await prisma.pricingPlan.create({ data });
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create pricing plan" }, { status: 500 });
  }
}
