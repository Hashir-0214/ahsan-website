"use client";

import { useState, useEffect } from "react";
import { ref, set, push, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { X, Upload, Loader2, Save } from "lucide-react";
import Image from "next/image";

export default function CommitteeFormModal({ isOpen, onClose, editData, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        designation: "Member",
        order: 99,
        isActive: true,
        email: "",
        photoUrl: "",
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const designations = [
        "President",
        "Vice President",
        "General Secretary",
        "Joint Secretary",
        "Treasurer",
        "Member"
    ];

    useEffect(() => {
        if (isOpen) {
            if (editData) {
                setFormData(editData);
                setPreviewUrl(editData.photoUrl || "");
            } else {
                setFormData({
                    name: "",
                    designation: "Member",
                    order: 99,
                    isActive: true,
                    email: "",
                    photoUrl: "",
                });
                setPreviewUrl("");
            }
            setPhotoFile(null);
            setError("");
        }
    }, [isOpen, editData]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError("Image must be less than 2MB");
                return;
            }
            setPhotoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let finalPhotoUrl = formData.photoUrl;

            // Upload new photo if selected
            if (photoFile) {
                const fileExtension = photoFile.name.split('.').pop();
                const fileName = `committee_photos/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
                const photoStorageRef = storageRef(storage, fileName);
                
                await uploadBytes(photoStorageRef, photoFile);
                finalPhotoUrl = await getDownloadURL(photoStorageRef);
            }

            const memberData = {
                ...formData,
                photoUrl: finalPhotoUrl,
                updatedAt: new Date().toISOString()
            };

            if (editData) {
                // Update
                await update(ref(db, `committee_members/${editData.id}`), memberData);
                onSuccess("Member updated successfully");
            } else {
                // Create
                const newMemberRef = push(ref(db, "committee_members"));
                memberData.createdAt = new Date().toISOString();
                await set(newMemberRef, memberData);
                onSuccess("Member added successfully");
            }
            onClose();
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || "An error occurred while saving");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <h2 className="text-xl font-bold text-gray-900">
                        {editData ? "Edit Member" : "Add Member"}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="member-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo</label>
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden shrink-0 transition-colors hover:border-gray-400">
                                    {previewUrl ? (
                                        <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                    ) : (
                                        <div className="text-center p-2 text-gray-400 flex flex-col items-center">
                                            <Upload size={20} className="mb-1" />
                                            <span className="text-[10px] uppercase font-bold">Upload</span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handlePhotoChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p className="font-medium text-gray-700 mb-1">Upload a clear photo</p>
                                    <p>Recommended size: 400x400px.</p>
                                    <p>Max file size: 2MB.</p>
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-shadow sm:text-sm"
                                placeholder="Enter member's name"
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Designation/Role *</label>
                            <select
                                required
                                value={formData.designation}
                                onChange={e => setFormData({...formData, designation: e.target.value})}
                                className="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-shadow sm:text-sm appearance-none"
                            >
                                <option value="">Select a role</option>
                                {designations.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Order & Email Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                                    className="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-shadow sm:text-sm"
                                    placeholder="e.g. 1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (Optional)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="block w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-shadow sm:text-sm"
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Active Status</p>
                                <p className="text-xs text-gray-500">Inactive members won't show on the main site.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={formData.isActive}
                                    onChange={e => setFormData({...formData, isActive: e.target.checked})}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                    </form>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="member-form"
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm focus:outline-none flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {loading ? 'Saving...' : 'Save Member'}
                    </button>
                </div>
            </div>
        </div>
    );
}
