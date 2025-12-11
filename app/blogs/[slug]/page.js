"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, ArrowLeft, ArrowRight } from "lucide-react";

// Calculate reading time
const calculateReadingTime = (html) => {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
};

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [toc, setToc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blogs/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBlog(data);

          // Auto-generate table of contents
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.content, "text/html");
          const headings = [...doc.querySelectorAll("h2, h3")].map((el) => ({
            id: el.innerText.toLowerCase().replace(/\s+/g, "-"),
            text: el.innerText,
            level: el.tagName
          }));
          setToc(headings);

          // Fetch related posts
          fetch("/api/blogs?limit=3")
            .then((r) => r.json())
            .then((rel) => setRelated(rel.blogs || []));
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="animate-pulse p-10 text-center text-gray-400">
        Loading blog...
      </div>
    );

  if (!blog) return <p className="text-center py-20">Blog not found.</p>;

  const readTime = calculateReadingTime(blog.content);

  return (
    <>
      <Header />

      {/* HERO BANNER */}
      <div className="relative w-full h-[380px] md:h-[500px]">
        <Image
          src={blog.bannerImage}
          alt={blog.title}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute bottom-10 left-6 md:left-16 text-white">
          <p className="text-sm opacity-80 mb-2">
            {new Date(blog.createdAt).toDateString()} · {readTime} min read
          </p>
          <h1 className="text-3xl md:text-5xl font-bold max-w-4xl drop-shadow-xl">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl grid md:grid-cols-[250px_1fr] gap-12 px-6 py-16">

        {/* TABLE OF CONTENTS */}
        <aside className="hidden md:block sticky top-24 h-fit bg-gray-50 p-5 rounded-xl border">
          <h3 className="font-semibold mb-3">Contents</h3>
          <ul className="space-y-2 text-sm">
            {toc.map((item, i) => (
              <li key={i} className="pl-1">
                <a
                  href={`#${item.id}`}
                  className="text-gray-600 hover:text-orange-600 transition"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <div>

          {/* SHARE BUTTONS */}
          <div className="flex items-center gap-4 mb-10">
            <span className="font-semibold text-gray-700">Share:</span>

            <button className="p-2 bg-blue-600 text-white rounded-full">
              <Facebook size={18} />
            </button>
            <button className="p-2 bg-sky-400 text-white rounded-full">
              <Twitter size={18} />
            </button>
            <button className="p-2 bg-blue-700 text-white rounded-full">
              <Linkedin size={18} />
            </button>
          </div>

          {/* BLOG CONTENT */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* AUTHOR BOX */}
          <div className="mt-16 p-6 bg-gray-50 border rounded-xl">
            <h3 className="font-bold text-xl mb-2">Written by TravelCRM Team</h3>
            <p className="text-gray-600">
              We create tools to help travel agencies grow faster with automation,
              CRM intelligence, and smart operations.
            </p>
          </div>

          {/* NEXT / PREV BUTTONS */}
          <div className="flex justify-between mt-16 border-t pt-6">
            <Link href="/blogs" className="flex items-center text-orange-600">
              <ArrowLeft size={18} className="mr-2" /> Back to Blogs
            </Link>

            <Link href="/blogs" className="flex items-center text-orange-600">
              Next Article <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          {/* RELATED POSTS */}
          <h2 className="text-3xl font-bold mt-20 mb-5">Related Articles</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.map((b) => (
              <Link key={b.id} href={`/blogs/${b.slug}`}>
                <div className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                  <div className="relative h-40">
                    <Image src={b.bannerImage} alt={b.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg">{b.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {b.metaDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
