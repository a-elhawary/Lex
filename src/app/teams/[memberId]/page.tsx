"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Seniority rates mapping
const seniorityRates = {
  "Managing Partner": 1000,
  "Partner": 800,
  "Senior Associate": 600,
  "Associate": 400,
  "Junior Associate": 250,
  "Paralegal": 125,
};

// Mock data for team members
const teamMembers = [
  // Dispute Resolution
  {
    name: "Johnathan Smith",
    department: "Dispute Resolution",
    seniority: "Managing Partner",
    email: "johnathan.smith@lawfirm.com",
    phone: "(555) 100-0001",
    cases: [
      { id: "1", title: "Johnson vs. Smith", client: "Michael Johnson", status: "Active", hours: 12.5 },
      { id: "3", title: "Corporate Legal Review", client: "TechCorp Inc.", status: "Active", hours: 8.0 },
    ],
    totalHours: 20.5,
    totalBilled: 5125.00,
    pointOfContactClients: ["Michael Johnson", "TechCorp Inc."],
    hourlyRate: seniorityRates["Managing Partner"],
  },
  {
    name: "Elizabeth Johnson",
    department: "Dispute Resolution",
    seniority: "Managing Partner",
    email: "elizabeth.johnson@lawfirm.com",
    phone: "(555) 100-0002",
    cases: [
      { id: "2", title: "Williams Estate Planning", client: "Sarah Williams", status: "In Review", hours: 6.0 },
    ],
    totalHours: 6.0,
    totalBilled: 1200.00,
    pointOfContactClients: ["Sarah Williams"],
    hourlyRate: seniorityRates["Managing Partner"],
  },
  {
    name: "Michael Davis",
    department: "Dispute Resolution",
    seniority: "Partner",
    email: "michael.davis@lawfirm.com",
    phone: "(555) 100-0003",
    cases: [
      { id: "3", title: "Corporate Legal Review", client: "TechCorp Inc.", status: "Active", hours: 4.0 },
    ],
    totalHours: 4.0,
    totalBilled: 1000.00,
    pointOfContactClients: ["TechCorp Inc."],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Sarah Wilson",
    department: "Dispute Resolution",
    seniority: "Partner",
    email: "sarah.wilson@lawfirm.com",
    phone: "(555) 100-0004",
    cases: [
      { id: "4", title: "Davis Divorce Proceedings", client: "Jennifer Davis", status: "Pending", hours: 2.5 },
    ],
    totalHours: 2.5,
    totalBilled: 500.00,
    pointOfContactClients: ["Jennifer Davis"],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "David Brown",
    department: "Dispute Resolution",
    seniority: "Senior Associate",
    email: "david.brown@lawfirm.com",
    phone: "(555) 100-0005",
    cases: [
      { id: "5", title: "Contract Dispute - ABC Corp", client: "ABC Corporation", status: "Concluded", hours: 1.5 },
    ],
    totalHours: 1.5,
    totalBilled: 375.00,
    pointOfContactClients: ["ABC Corporation"],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Emily Taylor",
    department: "Dispute Resolution",
    seniority: "Senior Associate",
    email: "emily.taylor@lawfirm.com",
    phone: "(555) 100-0006",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Robert Miller",
    department: "Dispute Resolution",
    seniority: "Associate",
    email: "robert.miller@lawfirm.com",
    phone: "(555) 100-0007",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Jessica Anderson",
    department: "Dispute Resolution",
    seniority: "Associate",
    email: "jessica.anderson@lawfirm.com",
    phone: "(555) 100-0008",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Christopher Lee",
    department: "Dispute Resolution",
    seniority: "Junior Associate",
    email: "christopher.lee@lawfirm.com",
    phone: "(555) 100-0009",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Amanda White",
    department: "Dispute Resolution",
    seniority: "Junior Associate",
    email: "amanda.white@lawfirm.com",
    phone: "(555) 100-0010",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Kevin Garcia",
    department: "Dispute Resolution",
    seniority: "Paralegal",
    email: "kevin.garcia@lawfirm.com",
    phone: "(555) 100-0011",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  {
    name: "Laura Martinez",
    department: "Dispute Resolution",
    seniority: "Paralegal",
    email: "laura.martinez@lawfirm.com",
    phone: "(555) 100-0012",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  // M&A
  {
    name: "Richard Thompson",
    department: "M&A",
    seniority: "Managing Partner",
    email: "richard.thompson@lawfirm.com",
    phone: "(555) 100-0013",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Managing Partner"],
  },
  {
    name: "Patricia Rodriguez",
    department: "M&A",
    seniority: "Partner",
    email: "patricia.rodriguez@lawfirm.com",
    phone: "(555) 100-0014",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Daniel Moore",
    department: "M&A",
    seniority: "Partner",
    email: "daniel.moore@lawfirm.com",
    phone: "(555) 100-0015",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Jennifer Jackson",
    department: "M&A",
    seniority: "Senior Associate",
    email: "jennifer.jackson@lawfirm.com",
    phone: "(555) 100-0016",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Matthew Harris",
    department: "M&A",
    seniority: "Senior Associate",
    email: "matthew.harris@lawfirm.com",
    phone: "(555) 100-0017",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Andrew Clark",
    department: "M&A",
    seniority: "Associate",
    email: "andrew.clark@lawfirm.com",
    phone: "(555) 100-0018",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Olivia Lewis",
    department: "M&A",
    seniority: "Associate",
    email: "olivia.lewis@lawfirm.com",
    phone: "(555) 100-0019",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "James Walker",
    department: "M&A",
    seniority: "Junior Associate",
    email: "james.walker@lawfirm.com",
    phone: "(555) 100-0020",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Sophia Hall",
    department: "M&A",
    seniority: "Junior Associate",
    email: "sophia.hall@lawfirm.com",
    phone: "(555) 100-0021",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Benjamin Young",
    department: "M&A",
    seniority: "Paralegal",
    email: "benjamin.young@lawfirm.com",
    phone: "(555) 100-0022",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  {
    name: "Isabella King",
    department: "M&A",
    seniority: "Paralegal",
    email: "isabella.king@lawfirm.com",
    phone: "(555) 100-0023",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  // Corporate
  {
    name: "William Wright",
    department: "Corporate",
    seniority: "Managing Partner",
    email: "william.wright@lawfirm.com",
    phone: "(555) 100-0024",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Managing Partner"],
  },
  {
    name: "Margaret Lopez",
    department: "Corporate",
    seniority: "Partner",
    email: "margaret.lopez@lawfirm.com",
    phone: "(555) 100-0025",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Charles Hill",
    department: "Corporate",
    seniority: "Partner",
    email: "charles.hill@lawfirm.com",
    phone: "(555) 100-0026",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Barbara Green",
    department: "Corporate",
    seniority: "Senior Associate",
    email: "barbara.green@lawfirm.com",
    phone: "(555) 100-0027",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Joseph Adams",
    department: "Corporate",
    seniority: "Senior Associate",
    email: "joseph.adams@lawfirm.com",
    phone: "(555) 100-0028",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Susan Baker",
    department: "Corporate",
    seniority: "Associate",
    email: "susan.baker@lawfirm.com",
    phone: "(555) 100-0029",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Thomas Nelson",
    department: "Corporate",
    seniority: "Associate",
    email: "thomas.nelson@lawfirm.com",
    phone: "(555) 100-0030",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Dorothy Carter",
    department: "Corporate",
    seniority: "Junior Associate",
    email: "dorothy.carter@lawfirm.com",
    phone: "(555) 100-0031",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "George Mitchell",
    department: "Corporate",
    seniority: "Junior Associate",
    email: "george.mitchell@lawfirm.com",
    phone: "(555) 100-0032",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Helen Perez",
    department: "Corporate",
    seniority: "Paralegal",
    email: "helen.perez@lawfirm.com",
    phone: "(555) 100-0033",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  {
    name: "Edward Roberts",
    department: "Corporate",
    seniority: "Paralegal",
    email: "edward.roberts@lawfirm.com",
    phone: "(555) 100-0034",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  // Intellectual Property
  {
    name: "Frank Turner",
    department: "Intellectual Property",
    seniority: "Managing Partner",
    email: "frank.turner@lawfirm.com",
    phone: "(555) 100-0035",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Managing Partner"],
  },
  {
    name: "Deborah Phillips",
    department: "Intellectual Property",
    seniority: "Partner",
    email: "deborah.phillips@lawfirm.com",
    phone: "(555) 100-0036",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Ronald Campbell",
    department: "Intellectual Property",
    seniority: "Partner",
    email: "ronald.campbell@lawfirm.com",
    phone: "(555) 100-0037",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Lisa Parker",
    department: "Intellectual Property",
    seniority: "Senior Associate",
    email: "lisa.parker@lawfirm.com",
    phone: "(555) 100-0038",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Anthony Evans",
    department: "Intellectual Property",
    seniority: "Senior Associate",
    email: "anthony.evans@lawfirm.com",
    phone: "(555) 100-0039",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Nancy Edwards",
    department: "Intellectual Property",
    seniority: "Associate",
    email: "nancy.edwards@lawfirm.com",
    phone: "(555) 100-0040",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Steven Collins",
    department: "Intellectual Property",
    seniority: "Associate",
    email: "steven.collins@lawfirm.com",
    phone: "(555) 100-0041",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Betty Stewart",
    department: "Intellectual Property",
    seniority: "Junior Associate",
    email: "betty.stewart@lawfirm.com",
    phone: "(555) 100-0042",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Paul Sanchez",
    department: "Intellectual Property",
    seniority: "Junior Associate",
    email: "paul.sanchez@lawfirm.com",
    phone: "(555) 100-0043",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Sandra Morris",
    department: "Intellectual Property",
    seniority: "Paralegal",
    email: "sandra.morris@lawfirm.com",
    phone: "(555) 100-0044",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  {
    name: "Mark Rogers",
    department: "Intellectual Property",
    seniority: "Paralegal",
    email: "mark.rogers@lawfirm.com",
    phone: "(555) 100-0045",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  // Employment Law
  {
    name: "Donald Reed",
    department: "Employment Law",
    seniority: "Managing Partner",
    email: "donald.reed@lawfirm.com",
    phone: "(555) 100-0046",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Managing Partner"],
  },
  {
    name: "Carol Cook",
    department: "Employment Law",
    seniority: "Partner",
    email: "carol.cook@lawfirm.com",
    phone: "(555) 100-0047",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Kenneth Morgan",
    department: "Employment Law",
    seniority: "Partner",
    email: "kenneth.morgan@lawfirm.com",
    phone: "(555) 100-0048",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Partner"],
  },
  {
    name: "Michelle Bell",
    department: "Employment Law",
    seniority: "Senior Associate",
    email: "michelle.bell@lawfirm.com",
    phone: "(555) 100-0049",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Eric Murphy",
    department: "Employment Law",
    seniority: "Senior Associate",
    email: "eric.murphy@lawfirm.com",
    phone: "(555) 100-0050",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Senior Associate"],
  },
  {
    name: "Sharon Bailey",
    department: "Employment Law",
    seniority: "Associate",
    email: "sharon.bailey@lawfirm.com",
    phone: "(555) 100-0051",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Scott Rivera",
    department: "Employment Law",
    seniority: "Associate",
    email: "scott.rivera@lawfirm.com",
    phone: "(555) 100-0052",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Associate"],
  },
  {
    name: "Ruth Cooper",
    department: "Employment Law",
    seniority: "Junior Associate",
    email: "ruth.cooper@lawfirm.com",
    phone: "(555) 100-0053",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Brian Richardson",
    department: "Employment Law",
    seniority: "Junior Associate",
    email: "brian.richardson@lawfirm.com",
    phone: "(555) 100-0054",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Junior Associate"],
  },
  {
    name: "Shirley Cox",
    department: "Employment Law",
    seniority: "Paralegal",
    email: "shirley.cox@lawfirm.com",
    phone: "(555) 100-0055",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
  {
    name: "Alan Howard",
    department: "Employment Law",
    seniority: "Paralegal",
    email: "alan.howard@lawfirm.com",
    phone: "(555) 100-0056",
    cases: [],
    totalHours: 0,
    totalBilled: 0,
    pointOfContactClients: [],
    hourlyRate: seniorityRates["Paralegal"],
  },
];

export default function TeamMemberProfilePage() {
  const params = useParams();
  const memberId = decodeURIComponent(params.memberId as string);

  const member = teamMembers.find(m => m.name === memberId);

  if (!member) {
    return (
      <div className="space-y-6 p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground">Team Member Not Found</h1>
          <p className="text-muted-foreground mt-2">The requested team member profile could not be found.</p>
          <Link href="/teams">
            <Button className="mt-4">Back to Teams</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Concluded":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/teams" className="text-muted-foreground hover:text-foreground">
              Teams
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{member.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{member.name}</h1>
          <p className="text-muted-foreground mt-2">
            {member.seniority} • {member.department}
          </p>
        </div>
        <Button variant="outline">Edit Profile</Button>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground">{member.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Department</p>
              <p className="text-sm text-muted-foreground">{member.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Seniority</p>
              <p className="text-sm text-muted-foreground">{member.seniority}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Billing Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">Hourly Rate</p>
              <p className="text-2xl font-bold text-foreground">${member.hourlyRate}/hr</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Total Hours Billed</p>
              <p className="text-2xl font-bold text-foreground">{member.totalHours}h</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Total Amount Billed</p>
              <p className="text-2xl font-bold text-foreground">${member.totalBilled.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Active Cases</p>
              <p className="text-2xl font-bold text-foreground">
                {member.cases.filter(c => c.status === "Active").length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Point of Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Clients</p>
              <div className="space-y-1">
                {member.pointOfContactClients.map((client, index) => (
                  <p key={index} className="text-sm text-muted-foreground">• {client}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cases Working On</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hours Billed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {member.cases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.title}</TableCell>
                  <TableCell>{case_.client}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(case_.status)}>
                      {case_.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{case_.hours}h</TableCell>
                  <TableCell>
                    <Link href={`/cases/${case_.id}`}>
                      <Button variant="outline" size="sm">View Case</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
