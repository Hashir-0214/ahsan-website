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
    CheckCircle,
    Locate
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
            details: "ahsansabeel@gmail.com",
            subtext: "",
            link: "mailto:ahsansabeel@gmail.com"
        },
        {
            icon: Phone,
            title: "Call Us",
            details: "+91 8086392526",
            subtext: "",
            link: "tel:+918086392526"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: "Parappur, kottakkal",
            subtext: "Sabeelul Hidaya Islamic College",
            link: "#"
        }
    ];

    const officeHours = [
        { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Closed" }
    ];

    return (
        <div className="w-full bg-gradient-to-br from-purple-50 via-white to-violet-50 overflow-hidden pt-32">
            <section
                className="relative w-full pb-20 px-6"
            >
                {/* Decorative Elements */}
                <div className="absolute top-20 right-10 w-96 h-96 bg-[#16a741]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1FA447]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <div variants={itemVariants} className="inline-block mb-6">
                            <span className="px-5 py-2 bg-gradient-to-r from-[#16a741] to-[#1FA447] text-white rounded-full text-sm poppins-semibold shadow-lg">
                                Get In Touch
                            </span>
                        </div>

                        <h1
                            variants={itemVariants}
                            className="text-2xl md:text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-2"
                        >
                            Let's Connect
                        </h1>

                        <p
                            variants={itemVariants}
                            className="text-[14px] lg:text-[16px] text-gray-700 max-w-3xl mx-auto poppins-regular leading-relaxed"
                        >
                            Have questions? We're here to help you grow your business network
                        </p>
                    </div>

                    {/* Contact Info Cards */}
                    <div
                        variants={containerVariants}
                        className="grid grid-cols-3 gap-6 mb-16"
                    >
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 overflow-hidden text-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#16a741]/5 to-[#1FA447]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#16a741] to-[#1FA447] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <info.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl poppins-bold text-gray-800 mb-2">{info.title}</h3>
                                    <p className="text-lg text-[#1FA447] poppins-semibold mb-1">{info.details}</p>
                                    <p className="text-sm text-gray-600">{info.subtext}</p>
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#16a741]/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                            </a>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-purple-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#16a741] to-[#1FA447] rounded-xl flex items-center justify-center">
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
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#16a741] focus:ring-2 focus:ring-[#16a741]/20 transition-all"
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
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#16a741] focus:ring-2 focus:ring-[#16a741]/20 transition-all"
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
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#16a741] focus:ring-2 focus:ring-[#16a741]/20 transition-all"
                                                    placeholder="+91 99999 99999"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm poppins-semibold text-gray-700 mb-2">
                                                Address
                                            </label>
                                            <div className="relative">
                                                <Locate className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#16a741] focus:ring-2 focus:ring-[#16a741]/20 transition-all"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#16a741] focus:ring-2 focus:ring-[#16a741]/20 transition-all resize-none"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        onClick={handleSubmit}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-[#16a741] to-[#1FA447] text-white rounded-xl poppins-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                                    >
                                        Send Message
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </section>
        </div>
    );
}