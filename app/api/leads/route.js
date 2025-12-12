import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, phone, company , message} = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, phone required" },
        { status: 400 }
      );
    }

    const leads = await prisma.lEADS.create({
      data: { name, email, phone, company, message },
    });

    return NextResponse.json({
      message: "Leads added successfully",
      leads,
    });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lEADS.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
