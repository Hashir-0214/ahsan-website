// src/app/contact/page.js

"use client";
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Send, 
    MessageSquare,
    Clock,
    Building,
    User,
    Sparkles,
    CheckCircle
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: "info@cochinconnect.in",
            subtext: "We'll respond within 24 hours",
            link: "mailto:info@cochinconnect.in"
        },
        {
            icon: Phone,
            title: "Call Us",
            details: "+91 99466 89000",
            subtext: "Mon - Fri, 9 AM - 6 PM IST",
            link: "tel:+919946689000"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: "Cheranelloor, Ernakulam",
            subtext: "Operation Office, Kochi",
            link: "#"
        }
    ];

    const officeHours = [
        { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Closed" }
    ];

    return (
        <div className="w-full bg-gradient-to-br from-purple-50 via-white to-violet-50 overflow-hidden">
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full pt-32 pb-20 px-6"
            >
                {/* Decorative Elements */}
                <div className="absolute top-20 right-10 w-96 h-96 bg-[#8a48e7]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#5c21d2]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-16"
                    >
                        <motion.div variants={itemVariants} className="inline-block mb-6">
                            <span className="px-5 py-2 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] text-white rounded-full text-sm poppins-semibold shadow-lg">
                                Get In Touch
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-6"
                        >
                            Let's Connect
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
                        >
                            Have questions? We're here to help you grow your business network
                        </motion.p>
                    </motion.div>

                    {/* Contact Info Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-6 mb-16"
                    >
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={index}
                                href={info.link}
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 overflow-hidden text-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#8a48e7]/5 to-[#5c21d2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <info.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl poppins-bold text-gray-800 mb-2">{info.title}</h3>
                                    <p className="text-lg text-[#5c21d2] poppins-semibold mb-1">{info.details}</p>
                                    <p className="text-sm text-gray-600">{info.subtext}</p>
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8a48e7]/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-purple-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl poppins-bold text-gray-800">Send us a Message</h2>
                                </div>

                                {submitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <p className="text-green-700 poppins-medium">Thank you! We'll get back to you soon.</p>
                                    </motion.div>
                                )}

                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm poppins-semibold text-gray-700 mb-2">
                                                Your Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8a48e7] focus:ring-2 focus:ring-[#8a48e7]/20 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm poppins-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8a48e7] focus:ring-2 focus:ring-[#8a48e7]/20 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm poppins-semibold text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8a48e7] focus:ring-2 focus:ring-[#8a48e7]/20 transition-all"
                                                    placeholder="+91 99999 99999"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm poppins-semibold text-gray-700 mb-2">
                                                Company Name
                                            </label>
                                            <div className="relative">
                                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8a48e7] focus:ring-2 focus:ring-[#8a48e7]/20 transition-all"
                                                    placeholder="Your Company"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm poppins-semibold text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8a48e7] focus:ring-2 focus:ring-[#8a48e7]/20 transition-all resize-none"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        onClick={handleSubmit}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] text-white rounded-xl poppins-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                                    >
                                        Send Message
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            {/* Office Hours */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-lg poppins-bold text-gray-800">Office Hours</h3>
                                </div>
                                <div className="space-y-3">
                                    {officeHours.map((schedule, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-sm poppins-medium text-gray-700">{schedule.day}</span>
                                            <span className="text-sm text-gray-600">{schedule.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-gradient-to-br from-[#8a48e7] to-[#5c21d2] rounded-2xl p-6 shadow-lg text-white">
                                <Sparkles className="w-10 h-10 mb-4" />
                                <h3 className="text-xl poppins-bold mb-3">Need Immediate Help?</h3>
                                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                                    Our team is ready to assist you with any questions about joining Cochin Connect or our services.
                                </p>
                                <a
                                    href="tel:+919999999999"
                                    className="inline-flex items-center gap-2 bg-white text-[#5c21d2] px-5 py-2 rounded-lg poppins-semibold hover:shadow-lg transition-all text-sm"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </a>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
                                <div className="aspect-square bg-gradient-to-br from-[#8a48e7]/10 to-[#5c21d2]/10 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-12 h-12 text-[#5c21d2] mx-auto mb-2" />
                                        <p className="text-sm poppins-semibold text-gray-700">Kochi, Kerala</p>
                                        <p className="text-xs text-gray-600">India</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}