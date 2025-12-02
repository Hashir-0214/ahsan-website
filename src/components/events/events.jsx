// src/components/events/events.jsx

"use client";

import { Calendar, Clock, MapPin, Users, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsSchedulePage() {
  const events = [
    {
      id: 1,
      title: "Entrepreneurship Workshop 2024",
      date: "December 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Innovation Hub, Building A",
      category: "Workshop",
      attendees: "150+",
      status: "over", // "upcoming" or "over"
    },
    {
      id: 2,
      title: "Tech Startup Networking Mixer",
      date: "December 20, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Rooftop Lounge, Tech Park",
      category: "Networking",
      attendees: "200+",
      status: "over",
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      date: "January 5, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Conference Hall, Business Center",
      category: "Seminar",
      attendees: "100+",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Annual Business Conference",
      date: "January 15, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Grand Convention Center",
      category: "Conference",
      attendees: "500+",
      status: "upcoming",
    },
    {
      id: 5,
      title: "Financial Planning for Startups",
      date: "January 22, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Online Webinar",
      category: "Training",
      attendees: "Unlimited",
      status: "upcoming",
    },
    {
      id: 6,
      title: "Product Design Workshop",
      date: "February 2, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "Design Studio, Creative Hub",
      category: "Workshop",
      attendees: "50",
      status: "upcoming",
    },
    {
      id: 7,
      title: "Leadership & Management Seminar",
      date: "February 10, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "Executive Lounge, Tower B",
      category: "Seminar",
      attendees: "80",
      status: "upcoming",
    },
    {
      id: 8,
      title: "Investor Pitch Night",
      date: "February 18, 2025",
      time: "6:30 PM - 9:30 PM",
      location: "Investment Forum Hall",
      category: "Networking",
      attendees: "120",
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-3xl flex items-center justify-center mx-auto shadow-xl">
              <Calendar className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-6">
            EVENTS SCHEDULE
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our upcoming programs and past events
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div
                className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 flex flex-col lg:flex ${
                  event.status === "over" ? "" : ""
                }`}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <div className="relative h-80 lg:h-full">
                    {/* Category Badge */}
                    <div className="">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold flex items-center gap-2 mx-auto">
                        <Tag className="w-4 h-4 text-[#8a48e7]" />
                        {event.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-800 font-bold mb-1">
                      <Calendar className="w-5 h-5 text-[#8a48e7]" />
                      {event.date}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 group-hover:text-[#8a48e7] transition-colors">
                    {event.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-3xl p-12 text-center shadow-2xl">
            <Calendar className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated on Events
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our event calendar and get notified about upcoming
              programs and activities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-[#8a48e7] rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Subscribe to Calendar
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
