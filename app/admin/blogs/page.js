"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminPanelLayout from "@/components/layouts/admin/AdminPanelLayout";

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteBlog, setDeleteBlog] = useState(null); // blog to delete
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
    // Fetch blogs
    useEffect(() => {
    setLoading(true);
    
    fetch(`/api/blogs?page=${page}&limit=6&search=${search}`)
        .then((res) => res.json())
        .then((data) => {
        setBlogs(data.blogs);
        setTotalPages(data.pages);
        setLoading(false);
        });
    }, [page, search]);


  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = async () => {
    await fetch(`/api/blogs/${deleteBlog.id}`, {
      method: "DELETE",
    });

    setBlogs((prev) => prev.filter((b) => b.id !== deleteBlog.id));
    setDeleteBlog(null);
  };

  return (
  <AdminPanelLayout>
      <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">Manage Blogs</h1>

          <Link href="/admin/blogs/create">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="w-5 h-5 mr-2" /> Add New Blog
            </Button>
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blog by title..."
            className="w-full border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* BLOG GRID */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* Banner Image */}
                <div className="w-full h-44 overflow-hidden">
                  <img
                    src={blog.bannerImage}
                    className="w-full h-full object-cover"
                    alt="Blog Banner"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(blog.createdAt).toDateString()}
                  </p>

                  <h2 className="text-lg font-semibold mb-3">{blog.title}</h2>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {blog.metaDescription}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t">
                    <Link href={`/admin/blogs/update/${blog.id}`}>
                      <button className="flex items-center text-blue-600 hover:text-blue-700">
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => setDeleteBlog(blog)}
                      className="flex items-center text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
{/* PAGINATION */}
<div className="flex justify-center mt-10 gap-3">
  <Button
    variant="outline"
    disabled={page <= 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </Button>

  <span className="px-4 py-2 bg-white border rounded-lg">
    Page {page} of {totalPages}
  </span>

  <Button
    variant="outline"
    disabled={page >= totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </Button>
</div>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={!!deleteBlog} onOpenChange={() => setDeleteBlog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-600">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-700 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">{deleteBlog?.title}</span>?  
            This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setDeleteBlog(null)}
            >
              Cancel
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </AdminPanelLayout>
  );
}
