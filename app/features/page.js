'use client'
import ThreeImage from "@/components/3d/ThreeImage";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

const sections = [
  {
    title: "Dashboard Overview",
    desc: "Your complete travel business overview with revenue insights, lead analytics, and booking status in one powerful screen.",
    points: [
      "Real-time revenue tracking",
      "Booking and lead summary",
      "Performance and trends",
      "Pending actions reminder",
    ],
    image: "/images/dashboard.png",
  },
  {
    title: "Lead Management",
    desc: "Track every enquiry from start to conversion with follow-ups, history, communication logs and status pipeline.",
    points: [
      "AI lead assignment",
      "Follow-up reminders",
      "Communication history",
      "Lead status monitoring",
    ],
    image: "https://www.travocrm.com/media/feature/51.png",
  },
  {
    title: "Package Builder",
    desc: "Build beautiful, shareable packages with itinerary, hotels, vehicles and pricing in a visually rich format.",
    points: [
      "Day-wise itinerary",
      "Link hotels & vehicles",
      "Auto-generate PDF",
      "Custom pricing control",
    ],
    image: "https://www.travocrm.com/media/feature/51.png",
  },
  {
    title: "Booking Management",
    desc: "Easily convert leads into bookings and manage customer details, payments, vouchers, and confirmations.",
    points: [
      "Customer details",
      "Hotel & cab assignment",
      "Downloadable vouchers",
      "Track payments",
    ],
    image: "https://www.travocrm.com/media/feature/51.png",
  },
];

export default function FeaturesPage() {
  return (
    <div className="relative container mx-auto py-24 space-y-40">
      <Header/>
      {/* SOFT BG SHAPES */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="w-96 h-96 bg-pink-200 rounded-full blur-3xl absolute top-10 left-0"></div>
        <div className="w-96 h-96 bg-purple-200 rounded-full blur-3xl absolute bottom-10 right-0"></div>
      </div>

      {sections.map((sec, i) => (
        <div
          key={i}
          className={`grid md:grid-cols-2 gap-16 items-center`}
        >
          {/* IMAGE LEFT OR RIGHT ALTERNATE */}
          <div className={`${i % 2 === 1 ? "order-2" : "order-1"}`}>
            <ThreeImage url={sec.image} />
          </div>

          {/* TEXT */}
          <div className={`${i % 2 === 1 ? "order-1" : "order-2"}`}>
            <h2 className="text-4xl font-semibold mb-4">{sec.title}</h2>
            <p className="text-gray-600 mb-6">{sec.desc}</p>

            <ul className="space-y-3">
              {sec.points.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="text-red-500 text-xl">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <Footer/>
    </div>
  );
}
