"use client";

import Link from "next/link";
import { Users, Vote, Trophy, ArrowUpRight, Activity } from "lucide-react";

export default function AdminDashboard() {
    const statCards = [
        {
            title: "Total Members",
            value: "Manage",
            icon: Users,
            href: "/admin/committee",
            trend: "+3 this week"
        },
        {
            title: "Active Elections",
            value: "Settings",
            icon: Vote,
            href: "/voting",
            trend: "Configured"
        },
        {
            title: "Election Results",
            value: "View",
            icon: Trophy,
            href: "/voting",
            trend: "Live"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your platform and view key metrics.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/committee" className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                        View Committee
                    </Link>
                    <Link href="/voting" className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                        Voting Settings
                    </Link>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link key={card.title} href={card.href} className="group block">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-100 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                                        <Icon size={20} />
                                    </div>
                                    <ArrowUpRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">{card.title}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-gray-900 tracking-tight">{card.value}</span>
                                    </div>
                                    <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                                        <span className="text-green-600 font-medium">{card.trend}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
                            <Activity className="text-gray-400" size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-900">No recent activity</p>
                        <p className="text-sm mt-1">Actions taken by administrators will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
