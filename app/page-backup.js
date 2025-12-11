'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Check, Zap, Shield, TrendingUp, DollarSign, Users, Calendar, FileText, Hotel,Phone,Smartphone,Cloud,Car, Package, BarChart, Bell, Mail, FileBarChart, Menu } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Card3D from '@/components/3d/Card3D'
import Header from '@/components/layouts/header'
import Footer from '@/components/layouts/footer'

// Dynamically import 3D components (client-side only)
const GlobeScene = dynamic(() => import('@/components/3d/GlobeScene'), { ssr: false })
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false })

export default function Home3D() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      
      if (res.ok) {
        setSubmitMessage('Thank you! We\'ll contact you soon.')
        setFormData({ name: '', email: '', phone: '', company: '' })
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitMessage('')
        }, 2000)
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    { icon: Users, title: 'Advanced Lead Management', items: ['Auto-fetch from Google/Instagram/Facebook', 'Smart AI-powered lead assignment', 'Visual pipeline tracking', 'Call & message history', 'Bulk assignment'] },
    { icon: Calendar, title: 'Complete Booking Management', items: ['Auto-generated booking numbers', 'Status workflow (Pending→Confirmed→Completed)', 'Hotel & vehicle booking integration', 'Package linking', 'Customer database'] },
    { icon: FileText, title: 'Intelligent Financial Management', items: ['Payment installments tracking', 'Auto-generated invoices & vouchers (PDF)', 'Day Book & Ledger system', 'Profit calculation with commissions', 'Payment reminders'] },
    { icon: Hotel, title: 'Hotel & Transportation', items: ['Hotel master database with ratings', 'Room categories & meal plans', 'Vehicle database with cab categories', 'Vehicle owner management', 'Booking confirmation tracking'] },
    { icon: Package, title: 'Package & Destination', items: ['Tour package builder', 'Destination management', 'Hotel/vehicle linking', 'Auto PDF generation', 'Coupon integration'] },
    { icon: BarChart, title: 'Real-Time Dashboard', items: ['Live statistics & analytics', 'Revenue tracking charts', 'Booking status distribution', 'Financial overview', 'Performance metrics'] },
    { icon: Users, title: 'Advanced Team Management', items: ['Multi-tenant architecture', '6 role types (Super Admin to Employee)', 'Team hierarchy system', 'Granular permissions', 'Company-based isolation'] },
    { icon: Bell, title: 'Automated Follow-Ups', items: ['Follow-up scheduling', 'Automated reminders', 'Payment & document reminders', 'Push notifications', 'Overdue alerts'] },
    { icon: Mail, title: 'Communication System', items: ['Email integration', 'WhatsApp integration', 'Auto PDF generation', 'Browser push notifications', 'Multi-channel messaging'] },
    { icon: FileBarChart, title: 'Comprehensive Reports', items: ['Source-based reports', 'User performance reports', 'Financial analytics', 'PDF/Excel export', 'Custom date ranges'] }
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
     <Header/>
      {/* Hero Section with 3D Globe */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* 3D Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-background">
          <ParticleField count={60} />
        </div>
        
      <div className="absolute top-1/2 translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-100">
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

      {/* Key Benefits with Parallax */}
      <motion.section 
        className="py-16 px-4 bg-background relative"
        style={{ y: parallaxY }}
      >
        <ParticleField count={60} />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: '70% Less Manual Work', desc: 'Automated confirmations, invoices, lead assignment' },
              { icon: TrendingUp, title: '50% Productivity Increase', desc: 'Real-time analytics, one-click reports' },
              { icon: Shield, title: '100% Secure & Isolated', desc: 'Multi-tenant architecture, data isolation' },
              { icon: DollarSign, title: 'Cost-Effective', desc: 'Starting ₹2,999/month, no hidden costs' }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card3D>
                  <Card className="text-center h-full bg-white/80 backdrop-blur-sm border-2 hover:border-orange-200 transition-all">
                    <CardHeader>
                      <motion.div 
                        className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: '#FFF5F0' }}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <benefit.icon className="h-6 w-6" style={{ color: '#EC792E' }} />
                      </motion.div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Features with 3D Cards */}
   {/* FEATURES SECTION - CLEAN & FAST */}
<section id="features" className="py-20 px-4 bg-white">
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
      Empower your business with tools designed to simplify operations, 
      improve response time, and boost team productivity.
    </motion.p>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {[
        {
          title: "Smart Schedule Tracking",
          desc: "Organize your daily tasks with a structured system that ensures no deal gets ignored or delayed.",
          icon: Calendar,
        },
        {
          title: "Lead Management",
          desc: "Handle inquiries effortlessly with timely follow-ups and automatic reminders for prospects.",
          icon: Users,
        },
        {
          title: "Centralized Contacts",
          desc: "Access your entire contact list instantly with advanced search for faster decision-making.",
          icon: Phone,
        },
        {
          title: "Follow-Up Reminders",
          desc: "Stay consistent with automated reminders for calls, messages, and pending updates.",
          icon: Bell,
        },
        {
          title: "Affordable for All",
          desc: "All advanced features at a budget-friendly price designed specifically for travel businesses.",
          icon: DollarSign,
        },
        {
          title: "Mobile Ready",
          desc: "Manage leads, bookings, and clients from anywhere with a smooth mobile and tablet interface.",
          icon: Smartphone,
        },
        {
          title: "Zero Installation",
          desc: "Works entirely on the cloud—no software installation or hardware required.",
          icon: Cloud,
        },
        {
          title: "Smart Campaign Tool",
          desc: "Reach the right customers with targeted campaigns to increase engagement and conversions.",
          icon: Mail,
        },
        {
          title: "Detailed Reports",
          desc: "View filtered performance data and insights that improve sales, operations, and monitoring.",
          icon: FileBarChart,
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-50 mb-4">
            <item.icon className="w-6 h-6 text-orange-500" />
          </div>

          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </motion.div>
      ))}

    </div>
  </div>
</section>

<section className="w-full py-20 bg-white">
  <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

    {/* LEFT SIDE – FEATURE CARDS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      {[
        {
          title: "Task Scheduler",
          desc: "Organize daily tasks with automated reminders and never miss an important activity.",
          icon: "📅",
        },
        {
          title: "Lead Management",
          desc: "Handle leads effortlessly with smart follow-up reminders.",
          icon: "🎯",
        },
        {
          title: "Contacts Directory",
          desc: "Access customers anytime with a powerful centralized search system.",
          icon: "📇",
        },
        {
          title: "Follow-Up Alerts",
          desc: "Timely call, message, and task reminders to keep workflow consistent.",
          icon: "⏰",
        },
        {
          title: "Mobile Friendly",
          desc: "Manage your CRM from phones or tablets with a fully responsive interface.",
          icon: "📱",
        },
        {
          title: "Cloud-Based",
          desc: "No installations required — everything runs on secure cloud servers.",
          icon: "☁️",
        },
        {
          title: "Smart Campaigns",
          desc: "Reach the right audience at the right time with intelligent targeting.",
          icon: "📢",
        },
        {
          title: "Detailed Reports",
          desc: "Get visual insights that improve decision-making and performance tracking.",
          icon: "📊",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-default"
        >
          <div className="text-3xl mb-3">{item.icon}</div>
          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}

    </div>

    {/* RIGHT SIDE – VIDEO PANEL */}
    <div className="w-full flex justify-center">
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


      {/* Why Different Section with Floating Elements */}
      <section className="py-16 px-4 bg-background relative overflow-hidden">
        <ParticleField count={60} />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Why Travel CRM is Different
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Built specifically for travel industry', desc: 'Not a generic CRM - designed for travel agencies' },
              { title: 'Complete all-in-one solution', desc: 'No multiple tools needed' },
              { title: 'Enterprise-grade multi-tenancy', desc: 'Complete data isolation' },
              { title: 'Intelligent automation', desc: '70% less manual work' },
              { title: 'Real-time collaboration', desc: 'Work together seamlessly' },
              { title: 'Modern tech stack', desc: 'Laravel 10, Bootstrap 5' },
              { title: 'User-friendly interface', desc: 'Easy to learn and use' },
              { title: 'Cost-effective pricing', desc: 'Best value for money' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: '#EC792E' }} />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<section className="w-full py-16 bg-gray-50">
  <div className="container mx-auto px-4 text-center mb-10">
    <h2 className="text-4xl font-bold">How Your Agency Benefits</h2>
    <p className="text-gray-600 mt-3 text-lg">
      Trusted by hundreds of travel companies worldwide
    </p>
  </div>

  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
    {[
      "Access your CRM anywhere, anytime with full cloud flexibility.",
      "Perfectly optimized for phones, tablets and desktops.",
      "Organize unlimited leads, files, packages, and bookings.",
      "Dedicated support team always ready to assist you.",
      "Create quotes, itineraries, invoices, vouchers & more with ease.",
      "Bank-grade security with AWS and Google Cloud protection."
    ].map((text, i) => (
      <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
        <p className="text-gray-700">{text}</p>
      </div>
    ))}

  </div>
</section>

      {/* Pricing with 3D Cards */}
      <section id="pricing" className="py-16 px-4 relative" style={{ backgroundColor: '#FAFAFA' }}>
        <ParticleField count={150} />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="text-center text-muted-foreground mb-12 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Choose the plan that fits your business needs
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '2,999', popular: false, features: ['100 bookings/month', '5 users', 'Basic features', 'Email support', '14-day free trial'] },
              { name: 'Professional', price: '5,999', popular: true, features: ['500 bookings/month', '15 users', 'All features', 'WhatsApp integration', 'Push notifications', 'Priority support', 'API access', '14-day free trial'] },
              { name: 'Enterprise', price: '12,999', popular: false, features: ['Unlimited bookings', 'Unlimited users', 'Custom features', 'White-label option', 'Dedicated support', 'On-site training', '14-day free trial'] }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <Card3D>
                  <Card className={`h-full ${plan.popular ? 'border-2 ring-2 ring-orange-200 shadow-2xl' : ''} bg-white/90 backdrop-blur-sm`}>
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{i === 0 ? 'Perfect for small agencies' : i === 1 ? 'For growing agencies' : 'For large agencies'}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">₹{plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, j) => (
                          <motion.li 
                            key={j}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 + j * 0.05 }}
                          >
                            <Check className="h-5 w-5 mr-2" style={{ color: '#EC792E' }} />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => setIsModalOpen(true)} 
                        variant={plan.popular ? 'default' : 'outline'}
                        className={`w-full ${plan.popular ? 'text-white' : ''}`}
                        style={plan.popular ? { backgroundColor: '#EC792E' } : { borderColor: '#EC792E', color: '#EC792E' }}
                      >
                        Start Free Trial
                      </Button>
                    </CardContent>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof with Floating Numbers */}
      <section className="py-16 px-4 bg-background relative overflow-hidden">
        <ParticleField count={60} />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { value: '500+', label: 'Travel Agencies' },
              { value: '70%', label: 'Less Manual Work' },
              { value: '50%', label: 'Productivity Increase' },
              { value: '4.8/5', label: 'Average Rating' },
              { value: '99.9%', label: 'Uptime Guarantee' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.2, y: -10 }}
              >
                <motion.div 
                  className="text-4xl font-bold"
                  style={{ color: '#EC792E' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 relative" style={{ backgroundColor: '#FAFAFA' }}>
        <ParticleField count={150} />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Rajesh Kumar', company: 'Mumbai Travels', quote: 'Travel CRM has transformed our business. We\'ve reduced manual work by 70% and productivity increased significantly.' },
              { name: 'Priya Sharma', company: 'Delhi Tours', quote: 'Multi-tenant architecture gives us complete data security. Dashboard helps us make quick decisions.' }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateY: i === 0 ? -45 : 45 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
              >
                <Card3D>
                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        {[1,2,3,4,5].map(star => (
                          <motion.svg 
                            key={star} 
                            className="w-5 h-5" 
                            style={{ fill: '#EC792E' }} 
                            viewBox="0 0 20 20"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 + star * 0.1 }}
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </motion.svg>
                        ))}
                      </div>
                      <p className="text-lg mb-4">\"{testimonial.quote}\"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 bg-background relative">
        <ParticleField count={60} />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {[
              { q: 'Do I need technical knowledge to use Travel CRM?', a: 'No technical knowledge required. Our intuitive interface is designed for travel professionals, not tech experts.' },
              { q: 'Can I customize the CRM for my needs?', a: 'Yes, customization is available on Professional and Enterprise plans. Contact us for specific requirements.' },
              { q: 'Is my data secure?', a: 'Absolutely. We use enterprise-grade multi-tenant architecture with complete data isolation and encryption.' },
              { q: 'Do I need a credit card for the free trial?', a: 'No credit card required for the 14-day free trial. Start immediately with full access to all features.' },
              { q: 'Can I export my data?', a: 'Yes, you can export all your data anytime in PDF or Excel format. Your data always belongs to you.' },
              { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime with no questions asked. No long-term contracts or commitments.' }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card3D>
                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>{faq.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-16 px-4 relative overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
        <ParticleField count={60} />
        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Ready to Transform Your Travel Business?
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join 500+ travel agencies already using Travel CRM
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
          >
            <Button 
              onClick={() => setIsModalOpen(true)} 
              size="lg" 
              className="text-lg px-8 py-6 text-white shadow-2xl hover:shadow-orange-500/50"
              style={{ backgroundColor: '#EC792E' }}
            >
              Start Your Free 14-Day Trial Today
            </Button>
          </motion.div>
          <p className="text-sm text-muted-foreground mt-4">No credit card required • Full access • Cancel anytime</p>
        </div>
      </section>

          <Footer/>

     
    </div>
  )
}
