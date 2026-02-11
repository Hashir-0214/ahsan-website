"use client";

import { useEffect, useState } from "react";
import { ref, onValue, set, remove, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { CLASS_ROSTER, NOMINEES, POSITIONS, VOTERS, ELECTION_REF } from "@/data/votingData";

export default function AdminDashboardScreen({ onLogout, role }) {
    const [stats, setStats] = useState({
        total: 0,
        voted: 0,
        waiting: 0,
        votes: {},
        voters: {},
    });
    const [logs, setLogs] = useState([]);
    const [config, setConfig] = useState({
        enabled: true,
        startTime: "",
        endTime: "",
        broadcast: { message: "", active: false },
        maintenance: false
    });
    const [activeTab, setActiveTab] = useState("STATS"); // STATS, VOTERS, LOGS, SETTINGS, CANDIDATES
    const [showPendingOnly, setShowPendingOnly] = useState(false);
    const [candidates, setCandidates] = useState(null); // Dynamic nominees
    const [votersList, setVotersList] = useState(null); // Dynamic voters list

    // Helper for datetime-local input (YYYY-MM-DDTHH:mm in local time)
    const toLocalISOString = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const pad = (num) => String(num).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const downloadCSV = (data, filename) => {
        let csvContent = "data:text/csv;charset=utf-8,";

        if (filename === "election_logs.csv") {
            const header = ["Timestamp,VoterID,Name,Selections\n"];
            const rows = data.map(log => {
                const selections = log.selections
                    ? Object.entries(log.selections).map(([role, id]) => `${role}:${id}`).join(" | ")
                    : "";
                return `${new Date(log.timestamp).toLocaleString()},${log.voterId},${log.name},"${selections}"`;
            });
            csvContent += header + rows.join("\n");
        } else if (filename === "election_results.csv") {
            const header = ["Position,CandidateID,Count\n"];
            const rows = [];
            // Use dynamic candidates if available, else static
            const sourceNominees = candidates || NOMINEES;
            POSITIONS.forEach(pos => {
                (sourceNominees[pos] || []).forEach(nom => {
                    const count = data[pos]?.[nom.id] || 0;
                    rows.push(`${pos},${nom.id} (${nom.name}),${count}`);
                });
            });
            csvContent += header + rows.join("\n");
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        // Listen to 'votes'
        const votesRef = ref(db, `${ELECTION_REF}/votes`);
        const unsubscribeVotes = onValue(votesRef, (snapshot) => {
            const data = snapshot.val() || {};
            setStats((prev) => ({ ...prev, votes: data }));
        });

        // Listen to 'voters'
        const votersRef = ref(db, `${ELECTION_REF}/voters`);
        const unsubscribeVoters = onValue(votersRef, (snapshot) => {
            const data = snapshot.val() || {};
            // We'll update total/voted/waiting inside render or another effect since activeVoters depends on votersList
            setStats((prev) => ({
                ...prev,
                voters: data,
            }));
        });

        // Listen to 'logs'
        const logsRef = ref(db, `${ELECTION_REF}/logs`);
        const unsubscribeLogs = onValue(logsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const logsList = Object.entries(data).map(([key, val]) => ({ id: key, ...val })).sort((a, b) => b.timestamp - a.timestamp);
            setLogs(logsList);
        });

        // Listen to 'config'
        const configRef = ref(db, `${ELECTION_REF}/config/voting`);
        const unsubscribeConfig = onValue(configRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setConfig({
                    enabled: data.enabled,
                    startTime: toLocalISOString(data.startTime),
                    endTime: toLocalISOString(data.endTime),
                    broadcast: data.broadcast || { message: "", active: false },
                    maintenance: data.maintenance || false
                });
            }
        });

        // Listen to 'nominees'
        const nomineesRef = ref(db, `${ELECTION_REF}/nominees`);
        const unsubscribeNominees = onValue(nomineesRef, (snapshot) => {
            setCandidates(snapshot.val()); // If null, means not seeded yet
        });

        // Listen to 'voters_list' (Dynamic)
        const votersListRef = ref(db, `${ELECTION_REF}/voters_list`);
        const unsubscribeVotersList = onValue(votersListRef, (snapshot) => {
            setVotersList(snapshot.val()); // If null, means not seeded
        });

        return () => {
            unsubscribeVotes();
            unsubscribeVoters();
            unsubscribeLogs();
            unsubscribeConfig();
            unsubscribeNominees();
            unsubscribeVotersList();
        };
    }, []);

    // Determine which voters to use (Local or Remote)
    const activeVoters = votersList || VOTERS;

    // Update Stats based on activeVoters
    useEffect(() => {
        const totalCount = Object.keys(activeVoters).length;
        const votedCount = Object.keys(stats.voters).length;
        setStats(prev => ({
            ...prev,
            total: totalCount,
            voted: votedCount,
            waiting: totalCount - votedCount
        }));
    }, [activeVoters, stats.voters]);


    const handleResetElection = async () => {
        if (!confirm("ARE YOU SURE? This deletes ALL votes, voters, and logs.")) return;
        try {
            await set(ref(db, `${ELECTION_REF}/votes`), null);
            await set(ref(db, `${ELECTION_REF}/voters`), null);
            await set(ref(db, `${ELECTION_REF}/logs`), null);
            alert("Election Reset Successfully");
        } catch (e) {
            alert("Error resetting: " + e.message);
        }
    };

    const handleResetVoter = async (voterId) => {
        if (!confirm(`Are you sure you want to reset voting status for user ${voterId}?`)) return;
        try {
            await remove(ref(db, `${ELECTION_REF}/voters/${voterId}`));
            alert("Voter reset successfully");
        } catch (e) {
            alert("Error resetting voter: " + e.message);
        }
    };

    const handleSaveConfig = async () => {
        const startTs = config.startTime ? new Date(config.startTime).getTime() : null;
        const endTs = config.endTime ? new Date(config.endTime).getTime() : null;

        try {
            await update(ref(db, `${ELECTION_REF}/config/voting`), {
                enabled: config.enabled,
                startTime: startTs,
                endTime: endTs,
                broadcast: config.broadcast,
                maintenance: config.maintenance
            });
            alert("Settings Saved!");
        } catch (e) {
            alert("Error saving settings: " + e.message);
        }
    };

    const handleSeedCandidates = async () => {
        if (!confirm("This will overwrite all online candidates with the local defaults. Continue?")) return;
        try {
            await set(ref(db, `${ELECTION_REF}/nominees`), NOMINEES);
            alert("Candidates Seeded Successfully!");
        } catch (e) {
            alert("Error seeding candidates: " + e.message);
        }
    };

    // --- VOTER MANAGEMENT HANDLERS ---

    const handleSeedVoters = async () => {
        if (!confirm("This will overwrite the online voter list with local defaults. Continue?")) return;
        try {
            const newVotersList = {};
            // Iterate CLASS_ROSTER to assign classes
            for (const [className, ids] of Object.entries(CLASS_ROSTER)) {
                ids.forEach(id => {
                    const voter = VOTERS[id];
                    if (voter) {
                        newVotersList[id] = {
                            name: voter.name,
                            dob: voter.dob,
                            class: className
                        };
                    }
                });
            }
            // Add any voters not in roster? (Optional, skipping for now as VOTERS only has valid keys)

            await set(ref(db, `${ELECTION_REF}/voters_list`), newVotersList);
            alert("Voters List Seeded Successfully!");
        } catch (e) {
            alert("Error seeding voters: " + e.message);
        }
    };

    const handleAddVoter = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get("id");
        const name = formData.get("name");
        const dob = formData.get("dob");
        const cls = formData.get("class");

        if (!id || !name || !dob) return;

        try {
            await update(ref(db, `${ELECTION_REF}/voters_list/${id}`), {
                name, dob, class: cls
            });
            e.target.reset();
            alert("Voter Added!");
        } catch (err) {
            alert("Error adding voter: " + err.message);
        }
    };

    const handleDeleteVoter = async (id) => {
        if (!confirm(`Delete voter ${id}? This only removes them from the registry, not their past vote.`)) return;
        try {
            await remove(ref(db, `${ELECTION_REF}/voters_list/${id}`));
        } catch (err) {
            alert("Error deleting voter: " + err.message);
        }
    };

    const handleAddCandidate = async (e, position) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        if (!name) return;

        const newId = position.substring(0, 1) + Date.now().toString().slice(-4);
        const newCandidate = { id: newId, name, photo: null };

        const currentList = candidates?.[position] || [];
        const updatedList = [...currentList, newCandidate];

        try {
            await update(ref(db, `${ELECTION_REF}/nominees`), {
                [position]: updatedList
            });
            e.target.reset();
        } catch (err) {
            alert("Error adding candidate: " + err.message);
        }
    };

    const handleDeleteCandidate = async (position, candidateId) => {
        if (!confirm("Delete this candidate?")) return;
        const currentList = candidates?.[position] || [];
        const updatedList = currentList.filter(c => c.id !== candidateId);

        try {
            await update(ref(db, `${ELECTION_REF}/nominees`), {
                [position]: updatedList
            });
        } catch (err) {
            alert("Error removing candidate: " + err.message);
        }
    };

    const formatTime = (ts) => ts ? new Date(ts).toLocaleString() : "-";
    const isSuper = role === "super_admin";

    // Determine which nominees to show (local or remote)
    const activeNominees = candidates || NOMINEES;

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#1a237e] gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-[#1a237e]">Admin Dashboard</h1>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                            {isSuper ? "Super Admin Access" : "Standard Access"}
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => downloadCSV(stats.votes, "election_results.csv")}
                            className="bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-colors text-sm px-4 py-2 flex-grow md:flex-grow-0 whitespace-nowrap"
                        >
                            Export Results
                        </button>
                        {isSuper && (
                            <button
                                onClick={() => downloadCSV(logs, "election_logs.csv")}
                                className="bg-purple-50 text-purple-700 font-semibold rounded-lg hover:bg-purple-100 transition-colors text-sm px-4 py-2 flex-grow md:flex-grow-0 whitespace-nowrap"
                            >
                                Export Logs
                            </button>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 px-6 py-2 flex-grow md:flex-grow-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                        <button
                            onClick={onLogout}
                            className="bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors px-6 py-2 flex-grow md:flex-grow-0"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                {/* Ensure tabs are scrollable on mobile */}
                <div className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto pb-2 mb-8 hide-scrollbar">
                    <div className="flex space-x-4 min-w-max">
                        {[
                            { id: "STATS", label: "Live Stats", visible: true },
                            { id: "VOTERS", label: "Voter Manager", visible: true },
                            { id: "LOGS", label: "Audit Logs", visible: isSuper },
                            { id: "CANDIDATES", label: "Candidates", visible: isSuper },
                            { id: "SETTINGS", label: "Settings", visible: isSuper },
                        ].filter(t => t.visible).map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-[#1a237e] text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- STATS VIEW --- */}
                {activeTab === "STATS" && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[
                                { label: "Total Students", value: stats.total, color: "text-[#1a237e]" },
                                { label: "Voted", value: stats.voted, color: "text-[#c62828]" },
                                { label: "Waiting", value: stats.waiting, color: "text-green-600" },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-[#1a237e]">
                                    <div className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2">{item.label}</div>
                                    <div className={`text-4xl font-extrabold ${item.color}`}>{item.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Live Results */}
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Live Results</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {POSITIONS.map((position) => {
                                    const posVotes = stats.votes[position] || {};
                                    const totalVotesForPos = Object.values(posVotes).reduce((a, b) => a + b, 0);

                                    return (
                                        <div key={position} className="bg-white p-6 rounded-xl shadow-sm">
                                            <h3 className="text-lg font-bold text-[#1a237e] uppercase border-b-2 border-[#ffd700] pb-2 mb-4">
                                                {position}
                                            </h3>
                                            <div className="space-y-4">
                                                {(activeNominees[position] || []).map((nominee) => {
                                                    const count = posVotes[nominee.id] || 0;
                                                    const percentage = totalVotesForPos > 0 ? ((count / totalVotesForPos) * 100).toFixed(1) : 0;

                                                    return (
                                                        <div key={nominee.id}>
                                                            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                                                                <span>{nominee.name}</span>
                                                                <span>{count}</span>
                                                            </div>
                                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-[#1a237e] transition-all duration-500"
                                                                    style={{ width: `${percentage}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Danger Zone (Super Only for full reset) */}
                        {isSuper && (
                            <div className="bg-red-50 p-8 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center mt-12">
                                <h3 className="text-xl font-bold text-red-700 mb-2">Danger Zone</h3>
                                <p className="text-red-600/70 mb-6 max-w-sm">
                                    Permanently delete all voting records, logs, and reset the election.
                                </p>
                                <button
                                    onClick={handleResetElection}
                                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 active:scale-95 transition-all"
                                >
                                    Reset Entire Election
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* --- VOTER MANAGER VIEW --- */}
                {activeTab === "VOTERS" && (
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Voter Registry</h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Manage authorized voters. Currently using:
                                        <span className="font-bold text-blue-700 ml-1">
                                            {votersList ? "Firebase Dynamic List" : "Local Static Data"}
                                        </span>
                                    </p>
                                </div>
                                {!votersList && (
                                    <button
                                        onClick={handleSeedVoters}
                                        className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold hover:bg-orange-200 transition-colors text-sm"
                                    >
                                        Upload Defaults to Firebase
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Add Voter Form (Only if using dynamic list) */}
                        {votersList && (
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-bold text-gray-700 mb-4">Add New Voter</h3>
                                <form onSubmit={handleAddVoter} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <input name="id" placeholder="ID (e.g. 1050)" className="border p-2 rounded" required />
                                    <input name="name" placeholder="Full Name" className="border p-2 rounded" required />
                                    <input name="dob" type="text" placeholder="OB (DD-MM-YYYY)" className="border p-2 rounded" required />
                                    <input name="class" placeholder="Class (e.g. SS1)" className="border p-2 rounded" required />
                                    <button className="bg-[#1a237e] text-white font-bold py-2 rounded hover:bg-[#283593] md:col-span-4">
                                        Add Voter
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Voter Table */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showPendingOnly}
                                            onChange={e => setShowPendingOnly(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1a237e]"></div>
                                        <span className="ml-2 text-sm font-medium text-gray-900">Show Pending Only</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Search Voter..."
                                        className="px-4 py-2 border rounded-lg text-sm w-48"
                                        onKeyUp={(e) => {
                                            // Simple client-side filter could go here
                                        }}
                                    />
                                </div>
                                <div className="text-right text-sm text-gray-500">
                                    Total: {Object.keys(activeVoters).length}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                            <th className="p-4 rounded-tl-lg">ID</th>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Class</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 rounded-tr-lg">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-700">
                                        {Object.entries(activeVoters).map(([id, voter]) => {
                                            const voteRecord = stats.voters[id];
                                            const hasVoted = !!voteRecord;
                                            const votedAt = voteRecord?.votedAt || null;

                                            if (showPendingOnly && hasVoted) return null;

                                            return (
                                                <tr key={id} className={`border-b border-gray-100 hover:bg-gray-50 ${hasVoted ? "bg-green-50/30" : ""}`}>
                                                    <td className="p-4 font-mono font-bold text-[#1a237e]">{id}</td>
                                                    <td className="p-4 font-medium">
                                                        {voter.name}
                                                        <div className="text-xs text-gray-400">{voter.dob}</div>
                                                    </td>
                                                    <td className="p-4 text-gray-500">{voter.class || "-"}</td>
                                                    <td className="p-4">
                                                        {hasVoted ? (
                                                            <div className="flex flex-col">
                                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold w-fit">VOTED</span>
                                                                <span className="text-xs text-gray-400 mt-1">{formatTime(votedAt)}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs font-bold">PENDING</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 flex gap-2">
                                                        {isSuper && hasVoted && (
                                                            <button
                                                                onClick={() => handleResetVoter(id)}
                                                                className="text-orange-600 hover:text-orange-800 hover:bg-orange-50 px-3 py-1 rounded transition-colors text-xs font-bold border border-orange-200"
                                                            >
                                                                RESET VOTE
                                                            </button>
                                                        )}
                                                        {isSuper && votersList && (
                                                            <button
                                                                onClick={() => handleDeleteVoter(id)}
                                                                className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition-colors text-xs font-bold border border-red-200"
                                                            >
                                                                DELETE USER
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- LOGS VIEW --- */}
                {activeTab === "LOGS" && isSuper && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Audit Logs</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                        <th className="p-4 rounded-tl-lg">Time</th>
                                        <th className="p-4">Voter</th>
                                        <th className="p-4">Selections</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-700">
                                    {logs.map((log) => (
                                        <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4 text-gray-500 whitespace-nowrap">{formatTime(log.timestamp)}</td>
                                            <td className="p-4">
                                                <div className="font-bold text-[#1a237e]">{log.name}</div>
                                                <div className="text-xs text-gray-400 font-mono">{log.voterId}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {log.selections && Object.entries(log.selections).map(([pos, candId]) => (
                                                        <span key={pos} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded text-xs">
                                                            <b>{pos}:</b> {candId}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {logs.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="p-8 text-center text-gray-400">No logs found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- CANDIDATES VIEW --- */}
                {activeTab === "CANDIDATES" && isSuper && (
                    <div className="space-y-8">
                        {/* Seeding Alert */}
                        {!candidates && (
                            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-orange-900">No Online Candidates Found</h3>
                                    <p className="text-orange-700 text-sm">The system is currently using local default data. Upload current defaults to Firebase to enable editing?</p>
                                </div>
                                <button
                                    onClick={handleSeedCandidates}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700 transition-colors"
                                >
                                    Upload Defaults
                                </button>
                            </div>
                        )}

                        {POSITIONS.map(pos => (
                            <div key={pos} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold text-[#1a237e] uppercase border-b-2 border-[#ffd700] pb-2 mb-4">{pos}</h3>

                                <ul className="space-y-3 mb-6">
                                    {(activeNominees[pos] || []).map(cand => (
                                        <li key={cand.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <div>
                                                <span className="font-bold text-gray-800">{cand.name}</span>
                                                <span className="ml-2 text-xs text-gray-400 font-mono">({cand.id})</span>
                                            </div>
                                            {candidates && (
                                                <button
                                                    onClick={() => handleDeleteCandidate(pos, cand.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                {/* Add Form */}
                                {candidates && (
                                    <form onSubmit={(e) => handleAddCandidate(e, pos)} className="flex gap-2">
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder={`New ${pos} candidate name...`}
                                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                            required
                                        />
                                        <button className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-700">
                                            Add
                                        </button>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* --- SETTINGS VIEW --- */}
                {activeTab === "SETTINGS" && isSuper && (
                    <div className="bg-white p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Election Settings</h2>

                        <div className="space-y-6">
                            {/* Enable Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-bold text-gray-700">Election Status</h3>
                                    <p className="text-sm text-gray-500">Enable or disable voting globally.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={config.enabled}
                                        onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a237e]"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900">{config.enabled ? "Active" : "Disabled"}</span>
                                </label>
                            </div>

                            {/* Time Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        value={config.startTime}
                                        onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">End Time</label>
                                    <input
                                        type="datetime-local"
                                        value={config.endTime}
                                        onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </div>
                            </div>

                            {/* Broadcast System */}
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-2">Broadcast Message</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. Voting closes in 5 minutes!"
                                        value={config.broadcast.message}
                                        onChange={(e) => setConfig({ ...config, broadcast: { ...config.broadcast, message: e.target.value } })}
                                        className="flex-1 p-2 border rounded-lg text-sm"
                                    />
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={config.broadcast.active}
                                            onChange={(e) => setConfig({ ...config, broadcast: { ...config.broadcast, active: e.target.checked } })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Maintenance Mode */}
                            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div>
                                    <h3 className="font-bold text-yellow-800">Maintenance Mode</h3>
                                    <p className="text-sm text-yellow-700">Stops all access except for Admins.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={config.maintenance}
                                        onChange={(e) => setConfig({ ...config, maintenance: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                                </label>
                            </div>

                            <button
                                onClick={handleSaveConfig}
                                className="w-full text-white bg-[#1a237e] hover:bg-[#283593] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                            >
                                Save Configuration
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
