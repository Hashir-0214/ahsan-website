// src/components/events/events.jsx

"use client";

import { Calendar, Clock, MapPin, Users, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#16a741] to-[#1FA447] rounded-3xl flex items-center justify-center mx-auto shadow-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-2">
            EVENTS SCHEDULE
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#16a741] to-[#1FA447] mx-auto rounded-full mb-4"></div>
        </div>
        <div className="w-full p-4 rounded-2xl border-2 border-red-700">
          <Image
            src="/assets/calenr.jpg"
            alt="Events"
            width={2000}
            height={1000}
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
