"use client";

import { Users, Crown, Star, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Committee() {
  const coreCommittee = [
    {
      image: "/assets/members/irfan.jpg",
      name: "Irfan",
      position: "President",
    },
    {
      image: "/assets/members/shifan.jpg",
      name: "Shifan",
      position: "Secretary",
    },
    {
      image: "/assets/members/munavvar.jpg",
      name: "Munawir",
      position: "Treasurer",
    },
    {
      image: "/assets/members/akhnas.jpg",
      name: "Akhnas",
      position: "Vice President",
    },
    {
      image: "/assets/members/bahjath.jpg",
      name: "Bahjath",
      position: "Vice President",
    },
    {
      image: "/assets/members/sanad.jpg",
      name: "Sanad",
      position: "Program Secretary",
    },
    {
      image: "/assets/members/thanseeh.jpg",
      name: "Thanseeh",
      position: "Arts Secretary",
    },
    {
      image: "/assets/members/shadil.jpg",
      name: "Shadil",
      position: "Office Secretary",
    },
    {
      image: "/assets/members/shibili.jpg",
      name: "Shibili M",
      position: "PRO",
    },
  ];

  const workingCommittee = [
    [
      {
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        name: "Anna Peterson",
        position: "Marketing Team",
      },
      {
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
        name: "Chris Evans",
        position: "Marketing Team",
      },
    ],
    [
      {
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
        name: "Rachel Green",
        position: "Design Team",
      },
      {
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
        name: "Tom Holland",
        position: "Design Team",
      },
      {
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
        name: "Maya Patel",
        position: "Design Team",
      },
    ],
    [
      {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        name: "Daniel Brown",
        position: "Finance Team",
      },
      {
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
        name: "Olivia Taylor",
        position: "Finance Team",
      },
    ],
    [
      {
        image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop",
        name: "Alex Turner",
        position: "Content Team",
      },
      {
        image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=400&fit=crop",
        name: "Nina Johnson",
        position: "Content Team",
      },
    ],
    [
      {
        image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop",
        name: "Kevin Lee",
        position: "Technical Team",
      },
      {
        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
        name: "Priya Sharma",
        position: "Technical Team",
      },
      {
        image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop",
        name: "Marcus White",
        position: "Technical Team",
      },
    ],
    [
      {
        image: "https://images.unsplash.com/photo-1464863979621-258859e62245?w=400&h=400&fit=crop",
        name: "Sophie Adams",
        position: "Events Team",
      },
      {
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
        name: "Jacob Miller",
        position: "Events Team",
      },
    ],
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32">
      {/* Core Committee Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-4">
            CORE COMMITTEE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 poppins-regular max-w-2xl mx-auto">
            Leadership team driving our vision forward
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {coreCommittee.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 border border-purple-100">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Social Icons (appear on hover) */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#8a48e7] hover:text-white transition-colors shadow-lg">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#8a48e7] hover:text-white transition-colors shadow-lg">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 text-center relative">
                  <div className="">
                    <h3 className="text-md font-bold poppins-bold text-gray-800 group-hover:text-[#8a48e7] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold poppins-medium text-[#8a48e7] uppercase tracking-wider">
                      {member.position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Working Committee Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5c21d2] to-[#8a48e7] mb-4">
            WORKING COMMITTEE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#5c21d2] to-[#8a48e7] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dedicated teams working together to achieve excellence
          </p>
        </div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {workingCommittee.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1, duration: 0.6 }}
              className={`flex ${group.length === 3 ? 'justify-center' : 'justify-center'} gap-6 flex-wrap`}
            >
              {group.map((member, memberIndex) => (
                <motion.div
                  key={memberIndex}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-purple-100 hover:border-[#8a48e7] ${
                    group.length === 3 ? 'w-72' : 'w-80'
                  }`}
                >
                  <div className="flex items-center gap-4 p-5">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden ring-4 ring-purple-100 group-hover:ring-[#8a48e7] transition-all duration-500">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#8a48e7] transition-colors truncate">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        {member.position}
                      </p>
                      
                      {/* Social Icons */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button className="w-8 h-8 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                          <Mail className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-8 h-8 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                          <Linkedin className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Decorative gradient bar */}
                  <div className="h-1 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}