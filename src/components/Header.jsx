"use client";

import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);

  // 2. Get current path
  const pathname = usePathname();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/programs", label: "Programs" },
    {
      label: "Publications",
      to: "/publications",
      subLinks: [
        {
          to: "/publications/annahda",
          label: "Annahda",
        },
        {
          to: "/publications/turuq",
          label: "TURUQ",
        },

        {
          to: "/publications/chromadiaries",
          label: "Chromadiaries",
        },
      ],
    },
    { to: "/committee", label: "Committee" },
    { to: "/voting", label: "Voting" },
    { to: "/events", label: "Events & Calender" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleMobileSubmenu = (index) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-sm z-50 border-b border-purple-100 poppins-regular">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <Image
              src="/assets/logo.png"
              alt="Cochin Connect Logo"
              width={48}
              height={48}
              className="w-8 h-auto relative rounded-xl transition-transform group-hover:scale-105"
            />
          </div>
          <div className="hidden sm:block">
            <div className="poppins-bold leading-4 text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447]">
              <span className="text-[12px] lg:text-xl">AHSAn</span> <br />
              <span className="text-[10px] lg:text-[12px] line-clamp-1">Al-Hidaya Students' Association</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isParentActive = link.subLinks
              ? link.subLinks.some(sub => pathname === sub.to)
              : pathname === link.to;

            if (link.subLinks) {
              return (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center px-2 lg:px-4 py-1 lg:py-2 text-[12px] lg:text-[14px] poppins-medium rounded-lg transition-colors group-hover:bg-purple-50/50 ${isParentActive ? "text-[#1FA447]" : "text-gray-700 hover:text-[#1FA447]"
                      }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 group-hover:-rotate-180 ${isParentActive ? "text-[#16a741]" : "text-[#16a741]"}`} />
                  </button>

                  {/* Creative Dropdown Panel */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 invisible opacity-0 group-hover:visible group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="relative bg-white backdrop-blur-2xl rounded-2xl shadow-xl border border-purple-100 overflow-hidden p-2">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#16a741] to-[#1FA447]"></div>

                      <div className="flex flex-col">
                        {link.subLinks.map((subItem) => {
                          const isSubActive = pathname === subItem.to;
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.to}
                              className={`flex justify-between py-2 lg:py-3 px-3 lg:px-6 rounded-xl transition-colors group/item ${isSubActive
                                  ? "bg-gradient-to-r from-[#16a741]/10 to-[#1FA447]/10"
                                  : "hover:bg-gradient-to-r hover:from-[#16a741]/5 hover:to-[#1FA447]/5"
                                }`}
                            >
                              <p className={`text-[12px] lg:text-[14px] poppins-semibold ${isSubActive ? "text-[#1FA447]" : "text-gray-800 group-hover/item:text-[#1FA447]"}`}>
                                {subItem.label}
                              </p>
                              <ExternalLink className={`w-4 h-4 mt-1 ${isSubActive ? "text-[#16a741]" : "text-gray-400 group-hover/item:text-[#16a741]"}`} />
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.to;

            return (
              <Link
                key={link.to}
                href={link.to}
                className={`relative px-2 lg:px-4 py-1 lg:py-2 text-[12px] lg:text-[14px] poppins-medium rounded-lg transition-all duration-300 group ${isActive ? "text-[#1FA447]" : "text-gray-700 hover:text-[#1FA447]"
                  }`}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Active Background Span */}
                <span className={`absolute inset-0 bg-gradient-to-r from-[#16a741]/10 to-[#1FA447]/10 rounded-lg transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}></span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 bg-gradient-to-r from-[#16a741] to-[#1FA447] hover:shadow-lg rounded-full transition-all duration-300 flex items-center justify-center"
          >
            {isMenuOpen ? (
              <X size={20} color="white" />
            ) : (
              <Menu size={20} color="white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-purple-100 shadow-lg h-screen">
          <nav className="flex flex-col space-y-1 px-6 py-4">
            {navLinks.map((link, index) => {
              if (link.subLinks) {
                const isParentActive = link.subLinks.some(sub => pathname === sub.to);
                return (
                  <div
                    key={link.label}
                    className="overflow-hidden"
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    <button
                      onClick={() => toggleMobileSubmenu(index)}
                      className={`w-full flex items-center justify-between px-4 py-3 poppins-medium rounded-lg hover:bg-purple-50 transition-all ${isParentActive ? "text-[#1FA447]" : "text-gray-700 hover:text-[#1FA447]"
                        }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${mobileSubmenuOpen === index ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileSubmenuOpen === index
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-gray-50/50 rounded-b-lg">
                        {link.subLinks.map((subItem) => {
                          const isSubActive = pathname === subItem.to;
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.to}
                              onClick={() => setIsMenuOpen(false)}
                              className={`flex items-center px-4 py-2.5 text-sm rounded-md transition-colors shadow-sm border border-transparent ${isSubActive
                                  ? "text-[#1FA447] bg-white border-purple-100"
                                  : "text-gray-600 hover:text-[#1FA447] hover:bg-white hover:border-purple-100"
                                }`}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = pathname === link.to;

              return (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 poppins-medium rounded-lg transition-all duration-300 ${isActive
                      ? "bg-gradient-to-r from-[#16a741]/10 to-[#1FA447]/10 text-[#1FA447]"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-[#16a741]/10 hover:to-[#1FA447]/10 hover:text-[#1FA447]"
                    }`}
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <style>{`
            @keyframes slideIn {
                from { opacity: 0; transform: translateX(-10px); }
                to { opacity: 1; transform: translateX(0); }
            }
        `}</style>
    </header>
  );
}