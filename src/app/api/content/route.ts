import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("raw") === "true";

  try {
    const content = await prisma.content.findMany();
    
    if (raw) {
      return NextResponse.json(content);
    }

    const contentMap = content.reduce((acc: any, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    return NextResponse.json(contentMap);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json(); // Expected format: { key: value }
    const updates = [];
    
    for (const [key, value] of Object.entries(data)) {
      updates.push(
        prisma.content.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      );
    }
    
    await Promise.all(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
