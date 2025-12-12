import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET BLOG BY ID
export async function GET(req, { params }) {
  const { id } = params;

  const blog = await prisma.blog.findUnique({
    where: { id: Number(id) },
  });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// UPDATE BLOG BY ID
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const updated = await prisma.blog.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      slug: body.slug,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      metaKeywords: body.metaKeywords,
      bannerImage: body.bannerImage,
      content: body.content,
    },
  });

  return NextResponse.json(updated);
}

// DELETE BLOG BY ID
export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.blog.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
