import CommitteeManagement from "@/components/admin/CommitteeManagement";

export default function CommitteePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Committee Management</h1>
                    <p className="text-gray-500 mt-1">Manage members, update designations, and organize the team.</p>
                </div>
            </div>
            
            <CommitteeManagement />
        </div>
    );
}
