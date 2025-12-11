"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Load Quill on client only
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewBlog() {
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

  const [content, setContent] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  // Upload Banner Image
  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setBannerUrl(data.url);
  };

  // Add keyword chip
  const addKeyword = (e) => {
    if (e.key === "Enter" && keywordInput.trim() !== "") {
      e.preventDefault();
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  // Remove keyword chip
  const removeKeyword = (index) => {
    const updated = [...keywords];
    updated.splice(index, 1);
    setKeywords(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title: e.target.title.value,
      metaTitle: e.target.metaTitle.value,
      metaDescription: e.target.metaDescription.value,
      metaKeywords: keywords.join(","), // convert chips → CSV
      bannerImage: bannerUrl,
      content,
    };

    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    alert("Blog Created!");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex items-center gap-4 mb-10">
        <Link href="/admin/blogs">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </Link>

        <h1 className="text-3xl font-bold">Create New Blog</h1>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT SIDE - BIG QUILL EDITOR */}
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

        {/* RIGHT SIDE - SEO + IMAGE */}
        <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">

          {/* BANNER UPLOAD */}
          <div>
            <label className="block font-semibold mb-2">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
            {bannerUrl && (
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
                placeholder="Enter blog title"
                required
              />
            </div>
          {/* META TITLE */}
          <div>
            <label className="block font-semibold mb-1">Meta Title</label>
            <input
              className="border p-3 w-full rounded"
              name="metaTitle"
              placeholder="Enter meta title"
            />
          </div>

          {/* META DESCRIPTION */}
          <div>
            <label className="block font-semibold mb-1">Meta Description</label>
            <textarea
              className="border p-3 w-full rounded"
              name="metaDescription"
              placeholder="Enter meta description"
            />
          </div>

          {/* KEYWORD CHIP SYSTEM */}
          <div>
            <label className="block font-semibold mb-1">Keywords</label>

            {/* INPUT */}
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={addKeyword}
              placeholder="Type keyword & press Enter"
              className="border p-3 w-full rounded mb-3"
            />

            {/* CHIP DISPLAY */}
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

       

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="bg-orange-600 text-white w-full py-3 rounded-lg text-lg hover:bg-orange-700 transition"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}
