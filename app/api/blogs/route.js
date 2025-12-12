import { NextResponse } from "next/server";
import slugify from "slugify";

import prisma from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  const slug = slugify(body.title, { lower: true });

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      slug,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      metaKeywords: body.metaKeywords,
      bannerImage: body.bannerImage,
      content: body.content,
    },
  });

  return NextResponse.json(blog);
}


export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const search = (searchParams.get("search") || "").toLowerCase();

  const skip = (page - 1) * limit;

  const whereCondition = search
    ? {
        // MySQL-safe case-insensitive search
        title: { contains: search },
      }
    : {};

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blog.count({
      where: whereCondition,
    }),
  ]);

  return NextResponse.json({
    blogs,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
