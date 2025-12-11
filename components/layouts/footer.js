import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
    return (
         <footer className="py-12 px-4 bg-background border-t border-border relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold mb-4" style={{ color: '#EC792E' }}>Travel CRM</div>
              <p className="text-muted-foreground">Complete booking and CRM solution for travel agencies</p>
            </motion.div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Demo'] },
              { title: 'Support', links: ['FAQ', 'Contact', 'Documentation'] },
              { title: 'Company', links: ['About', 'Privacy Policy', 'Terms of Service'] }
            ].map((column, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {column.links.map((link, j) => (
                    <motion.li 
                      key={j}
                      whileHover={{ x: 5, color: '#EC792E' }}
                    >
                      <a href="#" className="hover:text-foreground">{link}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-12 pt-8 border-t border-border text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 Travel CRM. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    )
}

export default Footer
