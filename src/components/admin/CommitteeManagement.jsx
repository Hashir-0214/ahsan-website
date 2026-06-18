"use client";

import { useState, useEffect, useMemo } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { Plus, Search, Filter, Edit2, Trash2, UserCircle2, CheckCircle2, XCircle, ArrowUpDown, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import CommitteeFormModal from "./CommitteeFormModal";
import Image from "next/image";

export default function CommitteeManagement() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL"); // ALL, ACTIVE, INACTIVE
    
    // Sorting and Pagination
    const [sortConfig, setSortConfig] = useState({ key: 'order', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState(null);
    const [notification, setNotification] = useState(null);

    // Fetch members from Firebase
    useEffect(() => {
        const membersRef = ref(db, "committee_members");
        const unsubscribe = onValue(membersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const membersList = Object.entries(data).map(([id, values]) => ({
                    id,
                    ...values
                }));
                setMembers(membersList);
            } else {
                setMembers([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching members:", error);
            setLoading(false);
            showNotification("Failed to load members", "error");
        });

        return () => unsubscribe();
    }, []);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            try {
                await remove(ref(db, `committee_members/${id}`));
                showNotification("Member deleted successfully");
            } catch (error) {
                console.error("Delete error:", error);
                showNotification("Failed to delete member", "error");
            }
        }
    };

    const handleEdit = (member) => {
        setMemberToEdit(member);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setMemberToEdit(null);
        setIsModalOpen(true);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter, sort, and paginate members
    const processedMembers = useMemo(() => {
        // Filter
        let filtered = members.filter(member => {
            const matchesSearch = member.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  member.designation?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "ALL" || 
                                 (statusFilter === "ACTIVE" && member.isActive) || 
                                 (statusFilter === "INACTIVE" && !member.isActive);
            return matchesSearch && matchesStatus;
        });

        // Sort
        filtered.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return filtered;
    }, [members, searchQuery, statusFilter, sortConfig]);

    const totalPages = Math.ceil(processedMembers.length / itemsPerPage);
    const paginatedMembers = processedMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset pagination when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter]);

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm transition-all"
                        />
                    </div>
                    
                    {/* Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full sm:w-auto pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm appearance-none cursor-pointer"
                        >
                            <option value="ALL">All Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={openCreateModal}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg shadow-sm transition-colors text-sm"
                >
                    <Plus size={16} />
                    Add Member
                </button>
            </div>

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 ${
                    notification.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-900 text-white'
                }`}>
                    {notification.type === 'error' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                    {notification.message}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="p-4 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => handleSort('name')}>
                                <div className="flex items-center gap-1">Member <ArrowUpDown size={12}/></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => handleSort('designation')}>
                                <div className="flex items-center gap-1">Role <ArrowUpDown size={12}/></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => handleSort('isActive')}>
                                <div className="flex items-center gap-1">Status <ArrowUpDown size={12}/></div>
                            </th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                                                <div className="h-3 w-24 bg-gray-50 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4"><div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse"></div></td>
                                    <td className="p-4"><div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse"></div></td>
                                    <td className="p-4 text-right"><div className="h-8 w-16 bg-gray-100 rounded ml-auto animate-pulse"></div></td>
                                </tr>
                            ))
                        ) : paginatedMembers.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                            <Inbox size={24} className="text-gray-400" />
                                        </div>
                                        <p className="text-base font-medium text-gray-900">No members found</p>
                                        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedMembers.map(member => (
                                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-full border border-gray-200 bg-gray-50 overflow-hidden shrink-0">
                                                {member.photoUrl ? (
                                                    <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                                        {member.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm text-gray-900">{member.name}</div>
                                                {member.email && <div className="text-xs text-gray-500 mt-0.5">{member.email}</div>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                            {member.designation}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                                            member.isActive 
                                                ? 'bg-green-50 text-green-700' 
                                                : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${member.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                            {member.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button 
                                                onClick={() => handleEdit(member)}
                                                className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(member.id, member.name)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && processedMembers.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-white sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, processedMembers.length)}</span> of <span className="font-medium">{processedMembers.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            <CommitteeFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editData={memberToEdit}
                onSuccess={(msg) => showNotification(msg)}
            />
        </div>
    );
}
