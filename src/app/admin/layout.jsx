"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Users, LayoutDashboard, LogOut, Loader2, Menu, X, Settings } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser && pathname !== "/admin/login" && pathname !== "/admin/seed") {
                router.push("/admin/login");
            } else {
                setUser(currentUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router, pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/admin/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
            </div>
        );
    }

    if (!user && (pathname === "/admin/login" || pathname === "/admin/seed")) {
        return <>{children}</>;
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Committee", href: "/admin/committee", icon: Users },
        { name: "Settings", href: "#", icon: Settings },
    ];

    const currentPageName = navItems.find(i => i.href === pathname)?.name || "Dashboard";

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex poppins-regular">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} flex flex-col`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
                    <Link href="/admin" className="flex items-center gap-2">
                        <Image src="/assets/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
                        <span className="text-lg font-bold text-gray-900 tracking-tight">Admin</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-900">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Menu
                    </div>
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || (item.href !== "/admin" && item.href !== "#" && pathname.startsWith(item.href));
                            
                            return (
                                <Link key={item.name} href={item.href}>
                                    <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive 
                                            ? "bg-gray-100 text-gray-900" 
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}>
                                        <Icon size={18} className={isActive ? "text-gray-900" : "text-gray-400"} />
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100 shrink-0">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors group"
                    >
                        <LogOut size={18} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top header */}
                <header className="h-16 bg-white border-b border-gray-200 shrink-0 z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
                            {currentPageName}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm">
                            {user?.email?.charAt(0).toUpperCase() || "A"}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto bg-[#f8f9fa] p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
