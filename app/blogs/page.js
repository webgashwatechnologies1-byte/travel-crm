"use client";

import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blogs from API
  useEffect(() => {
    setLoading(true);

    fetch(`/api/blogs?page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setTotalPages(data.pages);
        setLoading(false);
      });
  }, [page]);


  return (
    <>
      <Header />

      <div className="min-h-screen bg-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center mt-10 mb-4">
            Travel CRM Blog
          </h1>

          <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
            Articles, guides, and resources to help you streamline your travel business.
          </p>

          {/* Loading State */}
          {loading && (
            <p className="text-center text-gray-500">Loading blogs...</p>
          )}

          {/* No Blogs */}
          {!loading && blogs.length === 0 && (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}

          {/* Blog Grid */}
          {!loading && blogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full h-48">
                    <Image
                      src={blog.bannerImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(blog.createdAt).toDateString()}
                    </p>

                    <h2 className="text-lg font-semibold leading-snug hover:text-orange-600">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {blog.metaDescription}
                    </p>

                    <Link href={`/blogs/${blog.slug || blog.id}`}>
                      <button className="text-orange-600 mt-4 text-sm font-medium hover:underline">
                        Read More →
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-3">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 border rounded-lg"
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-white border rounded-lg">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 border rounded-lg"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
