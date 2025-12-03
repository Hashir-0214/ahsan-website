import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { href: "/#about", label: "About Us" },
      { href: "/#vision", label: "Vision" },
      { href: "/#mission", label: "Mission" },
      { href: "/#committee", label: "Committee" },
    ],
    publications: [
      { href: "/publications", label: "All Publications" },
      { href: "/publications/annahda", label: "Annahda" },
      { href: "/publications/turuq", label: "TURUQ" },
      { href: "/publications/chromadiaries", label: "Chromadiaries" },
    ],
    resources: [
      { href: "/programs", label: "Programs" },
      { href: "/committee", label: "Committee" },
      { href: "/events", label: "Events" },
      { href: "/contact", label: "Contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#16a741]/20 to-[#1FA447]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#1FA447]/20 to-[#16a741]/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <Image
                  src="/assets/logo.png"
                  alt="AHSAN Logo"
                  width={48}
                  height={48}
                  className="relative w-12 h-auto rounded-xl object-contain"
                />
              </div>
              <h3 className="text-2xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447]">
                AHSAN
              </h3>
            </div>
            <p className="text-[12px] text-gray-400 poppins-medium">
              <strong className="text-[#1FA447]">A</strong>l
              <strong className="text-[#1FA447]"> H</strong>idaya
              <strong className="text-[#1FA447]"> S</strong>tudents
              <strong className="text-[#1FA447]"> A</strong>ssociatio
              <strong className="text-[#1FA447]">n</strong>
            </p>
            <p className="poppins-regular text-[12px] text-gray-400 mb-2">Sabeelul Hidaya Islamic College</p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-[#16a741] hover:to-[#1FA447] rounded-lg flex items-center justify-center transition-all duration-300 group border border-white/10"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div>
            <h4 className="text-lg poppins-semibold mb-6 text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#16a741] to-[#1FA447] mr-3"></span>
              About
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors poppins-regular duration-300 flex items-center group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#16a741]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Quick Links */}
          <div>
            <h4 className="text-lg poppins-semibold mb-6 text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#16a741] to-[#1FA447] mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors poppins-regular duration-300 flex items-center group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#16a741]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Publications Section */}
          <div>
            <h4 className="text-lg poppins-semibold mb-6 text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#16a741] to-[#1FA447] mr-3"></span>
              Publications
            </h4>
            <ul className="space-y-3">
              {footerLinks.publications.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors poppins-regular duration-300 flex items-center group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#16a741]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg poppins-semibold mb-6 text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-[#16a741] to-[#1FA447] mr-3"></span>
              Get in Touch
            </h4>
            <div className="space-y-4 mb-6">
              <a
                href="mailto:ahsannilambur@gmail.com"
                className="flex items-start text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5 mr-3 mt-0.5 text-[#16a741] flex-shrink-0" />
                <span className="text-sm poppins-regular">
                  ahsansabeel@gmail.com
                </span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-start text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-5 h-5 mr-3 mt-0.5 text-[#16a741] flex-shrink-0" />
                <span className="text-sm poppins-regular">+91 8086392526</span>
              </a>
              <div className="flex items-start text-gray-400 poppins-regular">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-[#16a741] flex-shrink-0" />
                <span className="text-[10px] line-clamp-2">
                  Sabeelul Hidaya Islamic College
                  <br />
                  Parappur, kottakkal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-400">
                Subscribe to our newsletter for latest updates and events
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 md:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#16a741] transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#16a741] to-[#1FA447] rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-[#16a741]/50 transition-all duration-300 group font-semibold">
                <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} AHSAN - Alumni Association of HSS Arts & Science,
              Nilambur. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#16a741] to-[#1FA447]"></div>
    </footer>
  );
}
