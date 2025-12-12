import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { slug } = params;
  console.log(slug);
  
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug:slug },
    });
    console.log("PRISMA KE ANDAR:", prisma);
    console.log("MODEL HAI KYA ?", prisma.blog);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  }catch (err) {
  console.log("ERROR INSIDE API FILE :", err);
  return NextResponse.json({ error: err.message }, { status: 500 });
}

}
