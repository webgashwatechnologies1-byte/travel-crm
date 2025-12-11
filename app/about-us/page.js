"use client";

import { motion } from "framer-motion";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import Card3D from "@/components/3d/Card3D";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Check, Users, Target, Shield, Zap, Star, Globe2 } from "lucide-react";

export default function AboutPage() {
          const images = [
            '/images/agency-office-1.jpeg',
            '/images/trip-planning-map.jpeg',
            '/images/airplane-wing.jpeg',
            '/images/team-office.jpeg',
            '/images/hotel-booking.png',
            '/images/airport-luggage.jpeg',
            '/images/dashboard-laptop.jpeg',
            '/images/agent-customer-help.jpeg'
            ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <Header />

      {/* ------------------------------------------------- */}
      {/* HERO SECTION - MANY IMAGE BOXES */}
      {/* ------------------------------------------------- */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-white pt-28 pb-20">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About <span className="text-[#EC792E]">Travel CRM</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          We are building the world’s most advanced AI-driven travel CRM designed to automate,
          modernize, and scale travel businesses across the globe.
        </motion.p>

        {/* Multi-image placeholder grid */}
 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {images.map((src, i) => (
            <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full h-40 overflow-hidden rounded-xl shadow-sm">
            <img src={src} alt={`about-image-${i}`} className="w-full h-full object-cover" />
            </motion.div>
        ))}
        </div>

      </section>

      {/* ------------------------------------------------- */}
      {/* OUR MISSION */}
      {/* ------------------------------------------------- */}
      <section className="py-20 bg-[#FAFAFA] px-4 text-center">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Our Mission
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Our mission is to empower travel agencies with automation that eliminates 70% of manual work,
          increases productivity, enhances customer experience, and brings digital transformation to the industry.
        </motion.p>
      </section>

      {/* ------------------------------------------------- */}
      {/* PROBLEM WE SOLVE */}
      {/* ------------------------------------------------- */}
      <section className="py-20 bg-white px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          The Problems We Solve
        </motion.h2>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Scattered Tools",
              desc: "Agencies depend on WhatsApp, Excel, PDFs, and manual tracking — causing chaos."
            },
            {
              icon: Shield,
              title: "No Data Security",
              desc: "Traditional tools lack secure multi-tenant systems for data isolation."
            },
            {
              icon: Zap,
              title: "Slow & Manual Process",
              desc: "Follow-ups, payments, reminders, and bookings are highly manual and time-consuming."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card3D>
                <Card className="bg-white border shadow-sm hover:shadow-lg transition">
                  <CardHeader>
                    <item.icon className="h-10 w-10 text-[#EC792E] mb-4" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* WHY WE ARE DIFFERENT */}
      {/* ------------------------------------------------- */}
      <section className="py-20 bg-[#FAFAFA] px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          What Makes Us Different
        </motion.h2>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Built specifically for the travel industry",
            "AI-powered workflows and automation",
            "Real-time booking, finance & customer data",
            "Multi-tenant architecture with enterprise-grade security",
            "Designed for teams: roles, permissions, workflows",
            "Simple, fast, modern user experience"
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Check className="text-[#EC792E] mt-1 h-6 w-6" />
              <p className="text-lg">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* OUR JOURNEY TIMELINE */}
      {/* ------------------------------------------------- */}
      <section className="py-20 bg-white px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Our Journey
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-10">
          {[
            { year: "2022", text: "Started building CRM after studying 100+ travel agencies' workflows." },
            { year: "2023", text: "Launched first beta with lead management and booking engine." },
            { year: "2024", text: "Introduced AI automation, dashboard analytics & finance modules." },
            { year: "2025", text: "Trusted by 500+ agencies with a 4.8/5 satisfaction rating." }
          ].map((step, i) => (
            <motion.div
              key={i}
              className="flex space-x-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="text-4xl font-bold text-[#EC792E]">{step.year}</div>
              <p className="text-lg text-muted-foreground">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* TEAM SECTION */}
      {/* ------------------------------------------------- */}
      <section className="py-20 bg-[#FAFAFA] px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Meet the Team
        </motion.h2>

          
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
            {
            img: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1200&q=80",
            name: "Team Member 1",
            role: "Product Strategy & Vision"
            },
            {
            img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=80",
            name: "Team Member 2",
            role: "Lead Developer & Architecture"
            },
            {
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
            name: "Team Member 3",
            role: "Customer Success & Training"
            }
        ].map((t, i) => (
            <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            >
            <Card3D>
                <Card className="text-center bg-white border shadow-sm hover:shadow-lg transition">
                
                {/* Team Image */}
                <div className="w-full h-40 overflow-hidden border-b rounded-t-xl">
                    <img 
                    src={t.img} 
                    alt={t.name}
                    className="w-full h-full object-cover"
                    />
                </div>

                <CardHeader>
                    <CardTitle>{t.name}</CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground">{t.role}</p>
                </CardContent>

                </Card>
            </Card3D>
            </motion.div>
        ))}
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* COMPANY VALUES */}
      {/* ------------------------------------------------- */}
      <section className="py-20 bg-white px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Our Core Values
        </motion.h2>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: "Excellence", desc: "We craft products with attention to detail and premium quality."},
            { icon: Shield, title: "Security First", desc: "Your data is always safe with complete multi-tenant security."},
            { icon: Users, title: "Customer First", desc: "We build features based on real agency needs."},
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card3D>
                <Card className="bg-white border shadow-sm hover:shadow-lg transition">
                  <CardHeader>
                    <value.icon className="h-10 w-10 text-[#EC792E] mb-4" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- */}
      {/* FINAL CTA */}
      {/* ------------------------------------------------- */}
      <section className="py-24 bg-[#FAFAFA] text-center">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Ready to grow your travel business?
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Join 500+ agencies already using our CRM to automate workflows and boost productivity.
        </motion.p>

        <motion.a
          href="/#contact"
          className="inline-block px-8 py-4 bg-[#EC792E] text-white text-lg rounded-xl shadow-md hover:shadow-orange-400/50 transition"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          Start Your Free Trial
        </motion.a>
      </section>

      <Footer />
    </div>
  );
}
