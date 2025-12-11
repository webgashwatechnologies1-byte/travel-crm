"use client";

import React, { useState } from "react";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

import {
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  MessageSquare,
} from "lucide-react";

export default function Page() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const data = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Something went wrong");
      } else {
        toast.success("Message sent successfully!");
        e.target.reset();
      }
    } catch (error) {
      toast.error("Server error, please try again!");
    }

    setLoading(false);
  }

  return (
    <>
      <Header />

      <section className="bg-background text-foreground mt-5 py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE INFO */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Get in <span className="text-primary">Touch</span>
            </h2>

            <p className="text-muted-foreground">
              Have questions about pricing, features, CRM setup, or want support?
              Simply reach out — our team will assist you instantly.
            </p>

            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-svg-download-png-4849052.png"
              className="w-full max-w-md md:block hidden"
            />

            <div className="space-y-4 md:block hidden">
              <div className="flex items-center gap-3">
                <Phone className="text-primary" />
                <p className="font-medium">+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-primary" />
                <p className="font-medium">support@yourcrm.com</p>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-primary" />
                <p className="font-medium">Chandigarh, India</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                  <Input name="name" placeholder="Enter your full name" className="pl-10" required />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                  <Input name="email" type="email" placeholder="Enter your email" className="pl-10" required />
                </div>
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                  <Input name="phone" placeholder="Enter phone number" className="pl-10" required />
                </div>
              </div>

              {/* COMPANY */}
              <div className="space-y-2">
                <Label>Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                  <Input name="company" placeholder="Your company" className="pl-10" />
                </div>
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <Label>Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                  <Textarea name="message" placeholder="Write your message..." className="pl-10 min-h-[130px]" />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="w-full py-3"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
