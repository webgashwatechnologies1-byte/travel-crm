import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
 

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
    return (
      <>
         <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="text-2xl font-bold"
              style={{ color: '#EC792E' }}
              whileHover={{ scale: 1.1 }}
            >
              <Link href="/">

              Travel CRM
              </Link>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-muted-foreground hover:text-foreground transition">Home</a>
              <a href="/about-us" className="text-muted-foreground hover:text-foreground transition">About Us</a>

              <a href="/features" className="text-muted-foreground hover:text-foreground transition">Features</a>
              <a href="/#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</a>
              <a href="/#faq" className="text-muted-foreground hover:text-foreground transition">FAQ</a>
              <a href="/blogs" className="text-muted-foreground hover:text-foreground transition">Blogs</a>
              <a href="/contact-us" className="text-muted-foreground hover:text-foreground transition">Contact</a>
            
              <Button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#EC792E' }} className="text-white hover:opacity-90">Start Free Trial</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden py-4 space-y-4"
            >
              <a href="#features" className="block text-muted-foreground hover:text-foreground transition">Features</a>
              <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition">Pricing</a>
              <a href="#faq" className="block text-muted-foreground hover:text-foreground transition">FAQ</a>
              <a href="#contact" className="block text-muted-foreground hover:text-foreground transition">Contact</a>
              <Link href="/admin/login">
                <Button variant="outline" className="w-full mb-2">Admin Login</Button>
              </Link>
              <Button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#EC792E' }} className="text-white hover:opacity-90 w-full">Start Free Trial</Button>
            </motion.div>
          )}
        </div>
      </motion.nav>
 {/* Trial Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Your Free 14-Day Trial</DialogTitle>
            <DialogDescription>
              No credit card required. Get full access to all features.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
              />
            </div>
            {submitMessage && (
              <p className={`text-sm ${submitMessage.includes('Thank') ? 'text-green-600' : 'text-red-600'}`}>
                {submitMessage}
              </p>
            )}
            <Button type="submit" disabled={isSubmitting} className="w-full text-white" style={{ backgroundColor: '#EC792E' }}>
              {isSubmitting ? 'Submitting...' : 'Start Free Trial'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      </>
    )
}

export default Header
