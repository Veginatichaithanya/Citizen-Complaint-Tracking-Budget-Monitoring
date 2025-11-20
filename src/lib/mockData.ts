// Mock data for CCTBM application

export const mockBudgets = [
  {
    id: "1",
    title: "Road Infrastructure Development FY 2024",
    department: "Public Works",
    amount: 5000000,
    status: "approved",
    datePosted: "2024-01-15",
    description: "Budget allocation for road construction and maintenance across the municipality.",
    fileUrl: "#",
  },
  {
    id: "2",
    title: "Healthcare Facilities Upgrade",
    department: "Health Services",
    amount: 3500000,
    status: "under_review",
    datePosted: "2024-02-20",
    description: "Funds for upgrading medical equipment and facilities.",
    fileUrl: "#",
  },
  {
    id: "3",
    title: "Education Technology Initiative",
    department: "Education",
    amount: 2000000,
    status: "approved",
    datePosted: "2024-01-10",
    description: "Digital learning tools and infrastructure for schools.",
    fileUrl: "#",
  },
];

export const mockComplaints = [
  {
    id: "C001",
    title: "Misuse of Road Development Funds",
    description: "Poor quality materials used in road construction despite approved budget.",
    department: "Public Works",
    status: "under_investigation",
    priority: "high",
    dateSubmitted: "2024-03-01",
    citizenName: "Anonymous",
    assignedTo: "Authority Officer 1",
    timeline: [
      { date: "2024-03-01", status: "submitted", note: "Complaint filed by citizen" },
      { date: "2024-03-02", status: "acknowledged", note: "Complaint acknowledged by authority" },
      { date: "2024-03-05", status: "under_investigation", note: "Investigation initiated" },
    ],
  },
  {
    id: "C002",
    title: "Unaccounted Healthcare Equipment Purchase",
    description: "Equipment purchased does not match the budget allocation records.",
    department: "Health Services",
    status: "resolved",
    priority: "medium",
    dateSubmitted: "2024-02-15",
    citizenName: "John Doe",
    assignedTo: "Authority Officer 2",
    timeline: [
      { date: "2024-02-15", status: "submitted", note: "Complaint filed" },
      { date: "2024-02-16", status: "acknowledged", note: "Under review" },
      { date: "2024-02-20", status: "resolved", note: "Issue resolved, records corrected" },
    ],
  },
  {
    id: "C003",
    title: "Delayed Salary Payments to Teachers",
    description: "Teachers have not received salaries for 2 months despite budget approval.",
    department: "Education",
    status: "pending",
    priority: "high",
    dateSubmitted: "2024-03-10",
    citizenName: "Anonymous",
    assignedTo: null,
    timeline: [
      { date: "2024-03-10", status: "submitted", note: "Complaint submitted" },
    ],
  },
];

export const mockCitizens = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    complaintsSubmitted: 3,
    joinedDate: "2023-11-15",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    complaintsSubmitted: 1,
    joinedDate: "2024-01-20",
    status: "active",
  },
  {
    id: "3",
    name: "Anonymous User",
    email: "N/A",
    phone: "N/A",
    complaintsSubmitted: 5,
    joinedDate: "2024-02-10",
    status: "anonymous",
  },
];

export const mockAuthorities = [
  {
    id: "1",
    name: "Authority Officer 1",
    email: "officer1@gov.example.com",
    department: "Public Works",
    assignedComplaints: 5,
    resolvedComplaints: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Authority Officer 2",
    email: "officer2@gov.example.com",
    department: "Health Services",
    assignedComplaints: 3,
    resolvedComplaints: 8,
    status: "active",
  },
];

export const mockNGOReports = [
  {
    id: "R001",
    title: "Q1 2024 Budget Compliance Report",
    ngoName: "Transparency Watch",
    datePublished: "2024-03-20",
    summary: "Overall compliance rate of 85%. Key concerns in Public Works department.",
    fileUrl: "#",
    verifiedComplaints: 15,
  },
  {
    id: "R002",
    title: "Healthcare Budget Analysis",
    ngoName: "Citizens for Good Governance",
    datePublished: "2024-02-28",
    summary: "Healthcare funds properly allocated. Minor discrepancies identified and addressed.",
    fileUrl: "#",
    verifiedComplaints: 4,
  },
];

export const mockActivities = [
  {
    id: "1",
    type: "budget_posted",
    title: "New Budget Posted",
    description: "Road Infrastructure Development budget posted",
    date: "2024-03-15",
    icon: "FileText",
  },
  {
    id: "2",
    type: "complaint_resolved",
    title: "Complaint Resolved",
    description: "Healthcare Equipment complaint marked as resolved",
    date: "2024-03-14",
    icon: "CheckCircle",
  },
  {
    id: "3",
    type: "authority_action",
    title: "Authority Action",
    description: "Investigation started on road development complaint",
    date: "2024-03-13",
    icon: "Shield",
  },
];
