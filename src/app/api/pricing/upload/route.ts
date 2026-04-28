import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as any[];

    // Expecting columns: name, price, description, features (comma separated), popular (true/false), order
    const plans = data.map((row, index) => ({
      name: String(row.name || ""),
      price: String(row.price || ""),
      description: String(row.description || ""),
      features: JSON.stringify(String(row.features || "").split(",").map((f: string) => f.trim())),
      popular: row.popular === true || row.popular === "true" || row.popular === "Yes",
      order: parseInt(row.order) || index,
    }));

    // Clear existing plans and insert new ones
    await prisma.pricingPlan.deleteMany({});
    await prisma.pricingPlan.createMany({
      data: plans,
    });

    return NextResponse.json({ message: "Pricing plans uploaded successfully", count: plans.length });
  } catch (error) {
    console.error("Excel Upload Error:", error);
    return NextResponse.json({ error: "Failed to process Excel file" }, { status: 500 });
  }
}
