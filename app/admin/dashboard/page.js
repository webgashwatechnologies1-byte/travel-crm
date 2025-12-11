'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import AdminPanelLayout from '@/components/layouts/admin/AdminPanelLayout'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [leads, setLeads] = useState([])
  const [contacts, setContacts] = useState([])
  const [activeTab, setActiveTab] = useState("leads")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [openMessage, setOpenMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/admin/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch {
      setUser(null)
    }

    fetchLeads(token)
    fetchContacts()
  }, [])

  const fetchLeads = async (token) => {
    try {
      const res = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) setLeads(data.leads || [])
    } catch (e) {
      setError("Error fetching leads")
    }
  }

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contacts")
      const data = await res.json()
      if (res.ok) setContacts(data.contacts || [])
    } catch (e) {
      setError("Error fetching messages")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/admin/login")
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
const today = new Date().toDateString();

const totalLeads = leads.length;
const newLeads = leads.filter(l => l.status === "new").length;
const todayLeads = leads.filter(l => new Date(l.createdAt).toDateString() === today).length;

const totalMessages = contacts.length;
const todayMessages = contacts.filter(m => new Date(m.createdAt).toDateString() === today).length;

  return (
    <AdminPanelLayout>
      <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={'/'}>
            <div  className="text-2xl font-bold" style={{ color: "#EC792E" }}>Travel CRM</div>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
        {/* Stats Section */}
<div className="grid container grid-cols-1 md:grid-cols-5 gap-6 mb-8">

  {/* Total Leads */}
  <Card>
    <CardHeader>
      <CardTitle>Total Leads</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold" style={{ color: "#EC792E" }}>
        {totalLeads}
      </div>
    </CardContent>
  </Card>

  {/* New Leads */}
  <Card>
    <CardHeader>
      <CardTitle>New Leads</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold" style={{ color: "#EC792E" }}>
        {newLeads}
      </div>
    </CardContent>
  </Card>

  {/* Today's Leads */}
  <Card>
    <CardHeader>
      <CardTitle>Today's Leads</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold" style={{ color: "#EC792E" }}>
        {todayLeads}
      </div>
    </CardContent>
  </Card>

  {/* Total Messages */}
  <Card>
    <CardHeader>
      <CardTitle>Total Messages</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold" style={{ color: "#EC792E" }}>
        {totalMessages}
      </div>
    </CardContent>
  </Card>

  {/* Today's Messages */}
  <Card>
    <CardHeader>
      <CardTitle>Today's Messages</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold" style={{ color: "#EC792E" }}>
        {todayMessages}
      </div>
    </CardContent>
  </Card>

</div>
      </header>


      {/* Tabs */}
      <div className="container mx-auto px-4 mt-6">
        <div className="flex gap-4">
          <Button
            variant={activeTab === "leads" ? "default" : "outline"}
            onClick={() => setActiveTab("leads")}
          >
            Messages ({leads.length})
          </Button>

          <Button
            variant={activeTab === "messages" ? "default" : "outline"}
            onClick={() => setActiveTab("messages")}
          >
            Leades ({contacts.length})
          </Button>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "leads" ? "All Leads" : "All Messages"}
            </CardTitle>
          </CardHeader>

          <CardContent>

            {/* LEADS TABLE */}
          {activeTab === "leads" && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {leads.map((lead) => (
                    <>
                      {/* NORMAL TABLE ROW */}
                      <TableRow key={lead.id}>
                        <TableCell>{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.company || "-"}</TableCell>
                        <TableCell>{formatDate(lead.createdAt)}</TableCell>

                        {/* MESSAGE TOGGLE BUTTON */}
                        <TableCell>
                          <button
                            onClick={() =>
                              setOpenMessage(openMessage === lead.id ? null : lead.id)
                            }
                            className="text-primary underline decoration-dotted"
                          >
                            {openMessage === lead.id ? "Hide Message" : "View Message"}
                          </button>
                        </TableCell>
                      </TableRow>

                      {/* EXPANDABLE FULL-WIDTH MESSAGE ROW */}
                      {openMessage === lead.id && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <div className="p-4 mt-2 mb-4 bg-gray-50 rounded-md border text-gray-700 shadow-sm">
                              <p className="font-medium mb-1 text-gray-800">Message:</p>
                              <p>{lead.message || "No message provided"}</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}



            {/* CONTACTS TABLE */}
            {activeTab === "messages" && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {contacts.map((msg) => (
                      <TableRow key={msg.id}>
                        <TableCell>{msg.name}</TableCell>
                        <TableCell>{msg.email}</TableCell>
                        <TableCell>{msg.phone}</TableCell>
                        <TableCell>{msg.company}</TableCell>
                        <TableCell>{formatDate(msg.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

          </CardContent>
        </Card>
      </main>
    </div>
    </AdminPanelLayout>
  )
}
