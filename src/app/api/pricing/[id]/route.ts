import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    const data = await request.json();
    const plan = await prisma.pricingPlan.update({
      where: { id: id },
      data,
    });
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update pricing plan" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    await prisma.pricingPlan.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete pricing plan" }, { status: 500 });
  }
}
