import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

export interface Complaint {
  id: string;
  citizenName: string;
  title: string;
  department: string;
  description: string;
  dateAssigned: string;
  status: string;
  priority: string;
}

interface ComplaintTableProps {
  complaints: Complaint[];
}

const ComplaintTable = ({ complaints }: ComplaintTableProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComplaints = complaints.filter(
    (c) =>
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search by ID, citizen name, or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-foreground">ID</th>
              <th className="text-left p-4 font-semibold text-foreground">Citizen</th>
              <th className="text-left p-4 font-semibold text-foreground">Title</th>
              <th className="text-left p-4 font-semibold text-foreground">Department</th>
              <th className="text-left p-4 font-semibold text-foreground">Date</th>
              <th className="text-left p-4 font-semibold text-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4 font-mono text-sm">{complaint.id}</td>
                <td className="p-4">{complaint.citizenName}</td>
                <td className="p-4 max-w-xs truncate">{complaint.title}</td>
                <td className="p-4 text-muted-foreground">{complaint.department}</td>
                <td className="p-4 text-muted-foreground text-sm">{complaint.dateAssigned}</td>
                <td className="p-4">
                  <StatusBadge status={complaint.status} />
                </td>
                <td className="p-4">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/authority/complaint/${complaint.id}`)}
                  >
                    Take Action <ArrowRight size={16} className="ml-1" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-card border border-border rounded-lg p-4 space-y-3 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-sm text-muted-foreground">{complaint.id}</p>
                <h4 className="font-semibold mt-1">{complaint.title}</h4>
              </div>
              <StatusBadge status={complaint.status} />
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium">Citizen:</span> {complaint.citizenName}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Department:</span> {complaint.department}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Date:</span> {complaint.dateAssigned}
              </p>
            </div>
            <Button
              className="w-full"
              size="sm"
              onClick={() => navigate(`/authority/complaint/${complaint.id}`)}
            >
              Take Action <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        ))}
      </div>

      {filteredComplaints.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No complaints found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintTable;
