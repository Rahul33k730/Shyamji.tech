import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { sessionId, messages, leadEmail, leadName } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const chat = await prisma.chat.upsert({
      where: { sessionId },
      update: {
        messages: JSON.stringify(messages),
        leadEmail: leadEmail || undefined,
        leadName: leadName || undefined,
      },
      create: {
        sessionId,
        messages: JSON.stringify(messages),
        leadEmail,
        leadName,
      },
    });

    return NextResponse.json({ success: true, chat });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  try {
    if (!sessionId) {
      // Return all chats for admin panel
      const chats = await prisma.chat.findMany({
        orderBy: { updatedAt: "desc" },
      });
      return NextResponse.json(chats);
    }

    const chat = await prisma.chat.findUnique({
      where: { sessionId },
    });

    return NextResponse.json({ success: true, messages: chat ? JSON.parse(chat.messages) : [] });
  } catch (error) {
    console.error("Chat GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
