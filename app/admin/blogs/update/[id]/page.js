"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditBlog({ params }) {
  const { id } = params;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // STATES
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  // Fetch blog data on load
  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blogs/${id}`);
      const blog = await res.json();

      setFormData({
        title: blog.title || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        metaKeywords: blog.metaKeywords || "",
      });

      setContent(blog.content || "");
      setBannerUrl(blog.bannerImage || "");

      // Convert CSV → chips
      setKeywords(blog.metaKeywords ? blog.metaKeywords.split(",") : []);

      setLoading(false);
    }

    fetchBlog();
  }, [id]);

  // Banner Upload
        const uploadImage = async (file) => {
        setUploading(true);

        const form = new FormData();
        form.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: form,
        });

        const data = await res.json();
        setBannerUrl(data.url);

        setUploading(false);
        };


  // Add keyword chip
  const addKeyword = (e) => {
    if (e.key === "Enter" && keywordInput.trim() !== "") {
      e.preventDefault();
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  // Remove chip
  const removeKeyword = (index) => {
    const updated = [...keywords];
    updated.splice(index, 1);
    setKeywords(updated);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = {
      title: formData.title,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      metaKeywords: keywords.join(","), // chips → string
      bannerImage: bannerUrl,
      content,
    };

    await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });

    alert("Blog Updated Successfully!");
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Loading blog details...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <Link href="/admin/blogs">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </Link>

        <h1 className="text-3xl font-bold">Update Blog</h1>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: EDITOR */}
        <div className="lg:col-span-2">
          <label className="block font-semibold mb-2">Blog Content</label>

          <div className="h-[500px] bg-white border rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="h-[450px]"
            />
          </div>
        </div>

        {/* RIGHT: SEO + IMAGE */}
        <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">

          {/* BANNER UPLOAD */}
         {/* BANNER UPLOAD */}
            <div>
            <label className="block font-semibold mb-2">Banner Image</label>

            <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => uploadImage(e.target.files[0])}
                className={`${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            {/* Loader */}
            {uploading && (
                <div className="w-full mt-3 py-10 flex justify-center">
                <div className="animate-spin border-4 border-orange-500 border-t-transparent rounded-full w-10 h-10"></div>
                </div>
            )}

            {/* Image Preview */}
            {!uploading && bannerUrl && (
                <img
                src={bannerUrl}
                className="w-full rounded-lg mt-3 border"
                alt="Banner Preview"
                />
            )}
            </div>


          {/* BLOG TITLE */}
          <div>
            <label className="block font-semibold mb-1">Blog Title</label>
            <input
              className="border p-3 w-full rounded"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* META TITLE */}
          <div>
            <label className="block font-semibold mb-1">Meta Title</label>
            <input
              className="border p-3 w-full rounded"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
            />
          </div>

          {/* META DESCRIPTION */}
          <div>
            <label className="block font-semibold mb-1">Meta Description</label>
            <textarea
              className="border p-3 w-full rounded"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
            />
          </div>

          {/* KEYWORDS */}
          <div>
            <label className="block font-semibold mb-1">Keywords</label>

            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={addKeyword}
              placeholder="Type keyword & press Enter"
              className="border p-3 w-full rounded mb-3"
            />

            <div className="flex flex-wrap gap-2">
              {keywords.map((kw, i) => (
                <div
                  key={i}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {kw}
                  <button
                    type="button"
                    onClick={() => removeKeyword(i)}
                    className="ml-2 text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* UPDATE BUTTON */}
          <button
            type="submit"
            className="bg-orange-600 text-white w-full py-3 rounded-lg text-lg hover:bg-orange-700 transition"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}
