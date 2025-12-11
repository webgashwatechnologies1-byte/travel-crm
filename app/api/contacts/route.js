import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, phone, company } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, phone required" },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone, company },
    });

    return NextResponse.json({
      message: "Contact added successfully",
      contact,
    });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ contacts });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
