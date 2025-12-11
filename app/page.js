"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Button
} from "@/components/ui/button";
import {
  Users,
  Calendar,
  Phone,
  Bell,
  DollarSign,
  Smartphone,
  Cloud,
  Mail,
  FileBarChart,
  Zap,
  TrendingUp,
  Shield,
  Check,
} from "lucide-react";

import dynamic from "next/dynamic";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), { ssr: false });

export default function Home3D() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // ------------------------------------
  // HERO MOUSE PARALLAX
  // ------------------------------------
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />

      {/* ------------------------------------------------------- */}
      {/* HERO SECTION (LIGHT EFFECTS ONLY) */}
      {/* ------------------------------------------------------- */}
          <section className="relative min-h-screen  flex items-center justify-center overflow-hidden pt-4">
              {/* 3D Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-background">
                <ParticleField count={60} />
              </div>
              
            <div className="absolute top-1/2  translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-100">
                  <video 
                    src="/videos/video.webm" 
                    className="mt-20"
                    autoPlay 
                    muted 
                    playsInline 
                    loop
                  />
                </div>
      
              <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      x: mousePosition.x,
                      y: mousePosition.y
                    }}
                  >
                    <motion.h1 
                      className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Transform Your Travel Business with{' '}
                      <span style={{ color: '#EC792E' }} className="inline-block">
                        AI-Powered CRM
                      </span>
                    </motion.h1>
                    
                    <motion.p 
                      className="text-xl text-muted-foreground mb-8 max-w-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Complete Booking Management, Customer Relationship, Financial Tracking - All in One Platform. Reduce Manual Work by 70%, Increase Productivity by 50%
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button 
                        onClick={() => setIsModalOpen(true)} 
                        size="lg" 
                        className="text-lg px-8 py-6 text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
                        style={{ backgroundColor: '#EC792E' }}
                      >
                        <span className="relative z-10">Start Free 14-Day Trial</span>
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">No credit card required</p>
                    </motion.div>
                  </motion.div>
      
                  {/* 3D Floating Cards */}
                  <motion.div
                    className="relative hidden lg:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="relative w-full h-[500px] ">
                      {[
                        { text: '500+ Agencies', top: '5%', left: '0%', delay: 0 },
                        { text: '70% Less Work', top: '40%', right: '0%', delay: 0.2 },
                        { text: '50% More Productive', top: '70%', left: '10%', delay: 0.4 }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{ top: item.top, left: item.left, right: item.right }}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + item.delay }}
                          whileHover={{ scale: 1.1, z: 100 }}
                        >
                          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-orange-200">
                            <div className="text-3xl font-bold" style={{ color: '#EC792E' }}>
                              {item.text.split(' ')[0]}
                            </div>
                            <div className="text-muted-foreground">{item.text.split(' ').slice(1).join(' ')}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

      {/* ------------------------------------------------------- */}
      {/* KEY BENEFITS — 4 quick highlights */}
      {/* ------------------------------------------------------- */}
      <motion.section
        style={{ y:parallaxY}}
        className="  bg-white relative"
      >
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            { icon: Zap, title: "70% Less Manual Work", desc: "Automated lead assignment, reminders & confirmations." },
            { icon: TrendingUp, title: "Higher Productivity", desc: "Faster workflows, instant reporting & smart tools." },
            { icon: Shield, title: "Highly Secure", desc: "Encrypted data storage & multi-tenant architecture." },
            { icon: DollarSign, title: "Affordable Plans", desc: "Flexible pricing for every travel business." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50 mb-4">
                <item.icon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* ------------------------------------------------------- */}
      {/* FEATURES SECTION — SaaS Style Minimalistic Icon Cards */}
      {/* ------------------------------------------------------- */}
      <section id="features" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">

          <motion.h2
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Essential Features for Modern Travel Agencies
          </motion.h2>

          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            A complete suite of tools designed to streamline operations,
            automate workflows, and improve customer satisfaction.
          </motion.p>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              { title: "Smart Schedule Tracking", desc: "Plan tasks and follow-ups easily with automated alerts.", icon: Calendar },
              { title: "Lead Management", desc: "Handle inquiries effortlessly with fast assignment tools.", icon: Users },
              { title: "Centralized Contacts", desc: "Find customer details instantly with a unified search.", icon: Phone },
              { title: "Follow-Up Alerts", desc: "Never miss important tasks with intelligent reminders.", icon: Bell },
              { title: "Affordable for All", desc: "Premium travel CRM features at a budget-friendly price.", icon: DollarSign },
              { title: "Mobile Ready", desc: "Work on the go with fully responsive mobile support.", icon: Smartphone },
              { title: "Cloud-Based", desc: "No installation required — everything runs in the cloud.", icon: Cloud },
              { title: "Smart Campaigns", desc: "Reach your ideal customers with targeted campaigns.", icon: Mail },
              { title: "Detailed Reports", desc: "Visual insights that help you scale and optimize performance.", icon: FileBarChart },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-50 mb-4">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>

                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* ------------------------------------------------------- */}
      {/* WHY CHOOSE US — Left Text, Right Video */}
      {/* ------------------------------------------------------- */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SIDE CONTENT */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Why Agencies Prefer Our Travel CRM
            </h2>

            <ul className="space-y-5 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 text-2xl mr-3">✔</span>
                Cloud-based system accessible from any location.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 text-2xl mr-3">✔</span>
                Works smoothly across desktops, tablets, and phones.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 text-2xl mr-3">✔</span>
                Unlimited records for leads, files, bookings & itineraries.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 text-2xl mr-3">✔</span>
                Dedicated support team for onboarding & training.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 text-2xl mr-3">✔</span>
                Create itineraries, invoices, quotes, vouchers & more.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 text-2xl mr-3">✔</span>
                Data stored securely on AWS & Google Cloud.
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE VIDEO */}
          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-xl border bg-black/5">
              <video
                src="/videos/demo.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>
      {/* ------------------------------------------------------- */}
      {/* WHY TRAVEL CRM IS DIFFERENT */}
      {/* ------------------------------------------------------- */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <ParticleField count={40} />

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Why Our Travel CRM Stands Apart
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Built for Travel Agencies", desc: "A CRM created specifically for the travel business — not a generic system." },
              { title: "All-in-One Platform", desc: "Manage leads, bookings, finance, itineraries & more in one dashboard." },
              { title: "Enterprise-Grade Security", desc: "Multi-tenant architecture ensures complete data isolation & protection." },
              { title: "Powerful Automation", desc: "Automated lead assignment, reminders, tasks & communication." },
              { title: "Real-Time Collaboration", desc: "Work seamlessly with your team across multiple devices." },
              { title: "Modern Tech Stack", desc: "Lightning-fast performance using the latest web technologies." },
              { title: "User-Friendly Design", desc: "Easy-to-use interface built for speed and simplicity." },
              { title: "Value for Money", desc: "Premium features at pricing that outperforms the competition." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start space-x-3 p-3"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="mt-1 text-orange-600">
                  <Check className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ------------------------------------------------------- */}
      {/* BENEFITS SECTION */}
      {/* ------------------------------------------------------- */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center mb-10">
          <h2 className="text-4xl font-bold">How Your Agency Benefits</h2>
          <p className="text-gray-600 mt-3 text-lg">
            Trusted by hundreds of travel companies worldwide
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Access everything from anywhere with our cloud platform.",
            "Fully compatible with phones, tablets, and desktops.",
            "Store unlimited leads, documents, bookings & itineraries.",
            "Dedicated support team always ready to help you.",
            "Create quotes, invoices, itineraries & vouchers easily.",
            "Security powered by AWS & Google Cloud infrastructure.",
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <p className="text-gray-700">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ------------------------------------------------------- */}
      {/* PRICING SECTION */}
      {/* ------------------------------------------------------- */}
      <section id="pricing" className="py-20 px-4 bg-white relative">
        <ParticleField count={30} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4">
            Simple & Transparent Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Choose the plan that fits your business goals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "2,999",
                features: ["100 bookings/month", "5 users", "Email support", "Basic tools"],
                popular: false,
              },
              {
                name: "Professional",
                price: "5,999",
                features: [
                  "500 bookings/month",
                  "15 users",
                  "WhatsApp integration",
                  "Push notifications",
                  "API access",
                  "Priority support",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "12,999",
                features: [
                  "Unlimited bookings",
                  "Unlimited users",
                  "White-label option",
                  "Custom modules",
                  "Dedicated manager",
                ],
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`p-8 rounded-xl border shadow-sm bg-white ${
                  plan.popular ? "ring-2 ring-orange-300 border-orange-400 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-orange-600 text-white text-sm text-center py-1 rounded-md mb-4">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-500 mb-4">
                  {i === 0 ? "Perfect for small agencies" : i === 1 ? "Great for growing teams" : "For large organizations"}
                </p>

                <div className="text-4xl font-bold mb-6">
                  ₹{plan.price}
                  <span className="text-gray-500 text-lg">/month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start text-gray-700">
                      <Check className="w-5 h-5 text-orange-600 mr-2 mt-1" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full ${plan.popular ? "bg-orange-600 text-white" : "border border-orange-600 text-orange-600"}`}
                >
                  Start Free Trial
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ------------------------------------------------------- */}
      {/* SOCIAL PROOF */}
      {/* ------------------------------------------------------- */}
      <section className="py-20 bg-white px-4 relative overflow-hidden">
        <ParticleField count={40} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-center">

            {[
              { value: "500+", label: "Agencies Using CRM" },
              { value: "70%", label: "Less Manual Work" },
              { value: "50%", label: "More Productivity" },
              { value: "4.8★", label: "User Rating" },
              { value: "99.9%", label: "Uptime Guarantee" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                className="hover:scale-110 transition cursor-default"
              >
                <div className="text-4xl font-bold text-orange-600">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* ------------------------------------------------------- */}
      {/* TESTIMONIALS */}
      {/* ------------------------------------------------------- */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">

          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {[
              {
                name: "Rajesh Kumar", company: "Mumbai Travels",
                quote: "This CRM changed the way we operate. Our team's efficiency shot up immediately!"
              },
              {
                name: "Priya Sharma", company: "Delhi Tours",
                quote: "Extremely reliable, easy to use and perfect for travel agencies of any size."
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-md border"
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="text-orange-600 text-xl">★</span>
                  ))}
                </div>

                <p className="text-gray-700 mb-4">“{t.quote}”</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-gray-500">{t.company}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* ------------------------------------------------------- */}
      {/* FAQ */}
      {/* ------------------------------------------------------- */}
      <section id="faq" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-4xl">

          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              { q: "Do I need technical skills to use this CRM?", a: "Not at all. It's designed for travel professionals, not tech experts." },
              { q: "Is my data secure?", a: "Your data is encrypted and stored safely using enterprise-grade cloud servers." },
              { q: "Can I export my data anytime?", a: "Yes, you can export everything in PDF or Excel at any time." },
              { q: "Is the free trial fully featured?", a: "Yes, you get full access for 14 days without needing a card." },
              { q: "Can I cancel anytime?", a: "Yes, there are no long-term commitments or contracts." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl border"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ------------------------------------------------------- */}
      {/* FINAL CTA */}
      {/* ------------------------------------------------------- */}
      <section className="py-20 bg-gray-50 px-4 text-center">
        <div className="container mx-auto max-w-2xl">

          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Travel Business?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join 500+ agencies already using our CRM to scale their business.
          </p>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-6 text-lg bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
          >
            Start Your Free 14-Day Trial
          </Button>

          <p className="text-gray-500 text-sm mt-4">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>


      {/* FOOTER */}
      <Footer />
    </div>
  );
}
