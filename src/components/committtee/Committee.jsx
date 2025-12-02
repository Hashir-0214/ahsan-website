"use client";

import { Users, Crown, Star, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Committee() {
  const coreCommittee = [
    {
      image: "/assets/core-committee/irfan.jpg",
      name: "Irfan",
      position: "President",
    },
    {
      image: "/assets/core-committee/shifan.jpg",
      name: "Shifan",
      position: "Secretary",
    },
    {
      image: "/assets/core-committee/munavvar.jpg",
      name: "Munawir",
      position: "Treasurer",
    },
    {
      image: "/assets/core-committee/akhnas.jpg",
      name: "Akhnas",
      position: "Vice President",
    },
    {
      image: "/assets/core-committee/bahjath.jpg",
      name: "Bahjath",
      position: "Vice President",
    },
    {
      image: "/assets/core-committee/sanad.jpg",
      name: "Sanad",
      position: "Program Secretary",
    },
    {
      image: "/assets/core-committee/thanseeh.jpg",
      name: "Thanseeh",
      position: "Arts Secretary",
    },
    {
      image: "/assets/core-committee/shadil.jpg",
      name: "Shadil",
      position: "Office Secretary",
    },
    {
      image: "/assets/core-committee/shibili.jpg",
      name: "Shibili M",
      position: "PRO",
    },
  ];

  // Working committee organized in pairs/groups
  const workingCommittee = [
    {
      role: "Research Pool",
      members: [
        {
          image: "/assets/working-committee/ansari.jpg",
          name: "Ansari",
        },
        {
          image: "/assets/working-committee/nazim.jpg",
          name: "Nazim",
        },
      ],
    },
    {
      role: "Quiz Club",
      members: [
        {
          image: "/assets/working-committee/fayiz.jpg",
          name: "Fayiz",
        },
        {
          image: "/assets/working-committee/sabith.jpg",
          name: "Sabith",
        },
      ],
    },
    {
      role: "Art Wing",
      members: [
        {
          image: "/assets/working-committee/raihan.jpg",
          name: "Raihan",
        },
        {
          image: "/assets/working-committee/sinan-pa.jpg",
          name: "Sinan PA",
        },
      ],
    },
    {
      role: "Science & Maths",
      members: [
        {
          image: "/assets/working-committee/syed-hamid.jpg",
          name: "S. Hamid",
        },
        {
          image: "/assets/working-committee/sinan.jpg",
          name: "Sinan",
        },
      ],
    },
    {
      role: "Medical Board",
      members: [
        {
          image: "/assets/working-committee/ashiq.jpg",
          name: "Ashiq",
        },
        {
          image: "/assets/working-committee/khair.jpg",
          name: "Khair",
        },
      ],
    },
    {
      role: "IT & Media",
      members: [
        {
          image: "/assets/working-committee/ziyad.jpg",
          name: "Ziyad",
        },
        {
          image: "/assets/working-committee/naseef.jpg",
          name: "Naseef",
        },
      ],
    },
    {
      role: "Organizing Wing",
      members: [
        {
          image: "/assets/working-committee/amal.jpg",
          name: "Amal",
        },
        {
          image: "/assets/working-committee/jasir-ali.jpg",
          name: "Jasir Ali",
        },
      ],
    },
    {
      role: "SRDB",
      members: [
        {
          image: "/assets/working-committee/hazib.jpg",
          name: "Hazib",
        },
        {
          image: "/assets/working-committee/harshad.jpg",
          name: "Harshad",
        },
      ],
    },
    {
      role: "Publishing Bureau",
      members: [
        {
          image: "/assets/working-committee/hidhan.jpg",
          name: "Hidhan",
        },
        {
          image: "/assets/working-committee/jasir.jpg",
          name: "Jasir",
        },
      ],
    },
    {
      role: "Editorial Board",
      members: [
        {
          image: "/assets/working-committee/aseel.jpg",
          name: "Aseel",
        },
        {
          image: "/assets/working-committee/mujthaba.jpg",
          name: "Mujthaba",
        },
      ],
    },
    {
      role: "Malayalam Wing",
      members: [
        {
          image: "/assets/working-committee/anshid.jpg",
          name: "Anshid",
        },
        {
          image: "/assets/working-committee/afsal.jpg",
          name: "Afsal",
        },
      ],
    },
    {
      role: "Urdu Wing",
      members: [
        {
          image: "/assets/working-committee/anshid-m.jpg",
          name: "Anshid M",
        },
        {
          image: "/assets/working-committee/mahroof.jpg",
          name: "Mahroof",
        },
      ],
    },
    {
      role: "English Wing",
      members: [
        {
          image: "/assets/working-committee/shan.jpg",
          name: "Shan",
        },
        {
          image: "/assets/working-committee/basith.jpg",
          name: "Basith",
        },
      ],
    },
    {
      role: "Arabic Wing",
      members: [
        {
          image: "/assets/working-committee/sinan-t.jpg",
          name: "Sinan T",
        },
        {
          image: "/assets/working-committee/salim.jpg",
          name: "Salim",
        },
      ],
    },
    {
      role: "Al-Hadi",
      members: [
        {
          image: "/assets/working-committee/Hafeef.jpg",
          name: "Hafeef",
        },
        {
          image: "/assets/working-committee/syed-thafheem.jpg",
          name: "Syed Thafheem",
        },
      ],
    },
    {
      role: "Campus Viqaya & Fitness",
      members: [
        {
          image:
            "/assets/working-committee/sahal.jpg",
          name: "Sahal",
        },
        {
          image:
            "/assets/working-committee/jinshad.jpg",
          name: "Jinshad",
        },
        {
          image:
            "/assets/working-committee/fayis.jpg",
          name: "Fayis",
        },
      ],
    },
    {
      role: "Prasanga Kala Vedi",
      members: [
        {
          image:
            "/assets/working-committee/shifin.jpg",
          name: "Shifin",
        },
        {
          image:
            "/assets/working-committee/mashhood.jpg",
          name: "Mashhood",
        },
        {
          image:
            "/assets/working-committee/farah.jpg",
          name: "Farah",
        },
      ],
    },
  ];

  return (
    <div className="mb-36 max-w-5xl mx-auto px-6 pt-36">
      {/* Core Committee Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-4">
            CORE COMMITTEE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto poppins-regular">
            Leadership team driving our vision forward
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {coreCommittee.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100">
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-top object-cover group-hover:scale-110 transition-transform duration-700"
                    width={240}
                    height={300}
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
                    <h3 className="text-md poppins-bold text-gray-800 group-hover:text-[#8a48e7] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs poppins-semibold text-[#8a48e7] uppercase tracking-wider">
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
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#5c21d2] to-[#8a48e7] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5c21d2] to-[#8a48e7] mb-4">
            WORKING COMMITTEE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#5c21d2] to-[#8a48e7] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 poppins-regular max-w-2xl mx-auto">
            Dedicated teams working together to achieve excellence
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {workingCommittee.map((group, groupIndex) => (
            <div key={groupIndex} className="relative">
              {/* NEW: Group Role Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex w-fit mx-auto items-center justify-center mb-8"
              >
                <div className="h-[1px] w-12 bg-gray-300 mr-4"></div>
                <h3 className="text-xl bg-[#5c21d2] px-2 rounded poppins-bold text-white uppercase tracking-wide">
                  {group.role}
                </h3>
                <div className="h-[1px] w-12 bg-gray-300 ml-4"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-row justify-center gap-2 md:gap-8 flex-wrap"
              >
                {group.members.map((member, memberIndex) => (
                  <motion.div
                    key={memberIndex}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:border-[#8a48e7] w-auto md:w-64"
                  >
                    <div className="flex flex-col items-center p-4 md:p-6 text-center">
                      {/* Image */}
                      <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-purple-50 group-hover:ring-[#8a48e7] transition-all duration-500">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={112}
                            height={112}
                            className="w-full h-full object-top object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="w-full">
                        <h3 className="text-sm md:text-lg poppins-bold text-gray-800 mb-3 group-hover:text-[#8a48e7] transition-colors">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    {/* Decorative bottom bar */}
                    <div className="h-1 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
