import DashboardLayout from "@/components/DashboardLayout";
import DataTable from "@/components/DataTable";
import { mockNGOReports } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus } from "lucide-react";

const NGOReports = () => {
  const columns = [
    {
      key: "id",
      label: "Report ID",
      className: "font-mono text-sm",
    },
    {
      key: "title",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "ngoName",
      label: "NGO",
      className: "text-muted-foreground",
    },
    {
      key: "verifiedComplaints",
      label: "Verified Cases",
      render: (item: typeof mockNGOReports[0]) => (
        <span className="font-semibold">{item.verifiedComplaints}</span>
      ),
    },
    {
      key: "datePublished",
      label: "Published",
      className: "text-muted-foreground",
    },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <Button variant="outline" size="sm">
          <Download size={16} className="mr-2" />
          Download
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout role="ngo">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Transparency Reports</h1>
              <p className="text-muted-foreground mt-1">Access and publish compliance reports</p>
            </div>
          </div>
          <Button>
            <Plus size={16} className="mr-2" />
            Create Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold text-foreground mt-1">{mockNGOReports.length}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Verified Cases</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {mockNGOReports.reduce((sum, r) => sum + r.verifiedComplaints, 0)}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">This Quarter</p>
            <p className="text-2xl font-bold text-foreground mt-1">2</p>
          </div>
        </div>

        <DataTable data={mockNGOReports} columns={columns} />
      </div>
    </DashboardLayout>
  );
};

export default NGOReports;
