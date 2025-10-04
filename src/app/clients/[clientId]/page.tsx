"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  // Mock data - in a real app, this would be fetched based on clientId
  const clientData = {
    id: clientId,
    name: "Michael Johnson",
    email: "michael.johnson@email.com",
    phone: "(555) 123-4567",
    mobile: "(555) 987-6543",
    company: "Johnson Enterprises",
    position: "CEO",
    status: "Active",
    dateAdded: "2024-01-10",
    lastContact: "2024-01-28",
    address: {
      street: "123 Business Ave",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
    },
    notes: "Preferred communication via email. Available for meetings on weekdays after 2 PM.",
  };

  const cases = [
    {
      id: "1",
      title: "Johnson vs. Smith",
      status: "Active",
      type: "Personal Injury",
      dateCreated: "2024-01-15",
      nextHearing: "2024-02-20",
    },
    {
      id: "2",
      title: "Contract Review - Johnson Enterprises",
      status: "Active",
      type: "Corporate Law",
      dateCreated: "2024-01-20",
      nextHearing: null,
    },
    {
      id: "3",
      title: "Employment Agreement Review",
      status: "Closed",
      type: "Employment Law",
      dateCreated: "2023-12-01",
      nextHearing: null,
    },
  ];

  const communications = [
    {
      id: "1",
      date: "2024-01-28",
      type: "Email",
      subject: "Case Update - Johnson vs. Smith",
      summary: "Sent case progress update and next steps",
    },
    {
      id: "2",
      date: "2024-01-25",
      type: "Phone Call",
      subject: "Discovery Discussion",
      summary: "Discussed discovery process and timeline",
    },
    {
      id: "3",
      date: "2024-01-20",
      type: "Meeting",
      subject: "Contract Review Meeting",
      summary: "In-person meeting to review employment contracts",
    },
    {
      id: "4",
      date: "2024-01-15",
      type: "Email",
      subject: "Welcome and Case Initiation",
      summary: "Initial welcome email and case setup",
    },
  ];

  const documents = [
    {
      id: "1",
      name: "Client Intake Form",
      type: "Administrative",
      uploadDate: "2024-01-10",
      size: "1.2 MB",
    },
    {
      id: "2",
      name: "Retainer Agreement",
      type: "Contract",
      uploadDate: "2024-01-10",
      size: "856 KB",
    },
    {
      id: "3",
      name: "Medical Records",
      type: "Evidence",
      uploadDate: "2024-01-18",
      size: "5.7 MB",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCommunicationTypeColor = (type: string) => {
    switch (type) {
      case "Email":
        return "bg-blue-100 text-blue-800";
      case "Phone Call":
        return "bg-green-100 text-green-800";
      case "Meeting":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/clients" className="text-muted-foreground hover:text-foreground">
              Clients
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{clientData.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{clientData.name}</h1>
          {clientData.company && (
            <p className="text-muted-foreground mt-2">
              {clientData.position} at {clientData.company}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Badge className={getStatusColor(clientData.status)}>
            {clientData.status}
          </Badge>
          <Button variant="outline">Edit Client</Button>
        </div>
      </div>

      {/* Client Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">{clientData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground">{clientData.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Mobile</p>
              <p className="text-sm text-muted-foreground">{clientData.mobile}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Address</p>
              <p className="text-sm text-muted-foreground">
                {clientData.address.street}<br />
                {clientData.address.city}, {clientData.address.state} {clientData.address.zip}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">Date Added</p>
              <p className="text-sm text-muted-foreground">{clientData.dateAdded}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Last Contact</p>
              <p className="text-sm text-muted-foreground">{clientData.lastContact}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Active Cases</p>
              <p className="text-sm text-muted-foreground">
                {cases.filter(c => c.status === "Active").length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Total Cases</p>
              <p className="text-sm text-muted-foreground">{cases.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Send Email
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Create New Case
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Client Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cases.map((case_) => (
                  <div key={case_.id} className="flex justify-between items-center p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{case_.title}</p>
                        <Badge className={getStatusColor(case_.status)} variant="outline">
                          {case_.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {case_.type} • Created {case_.dateCreated}
                      </p>
                      {case_.nextHearing && (
                        <p className="text-sm text-muted-foreground">
                          Next hearing: {case_.nextHearing}
                        </p>
                      )}
                    </div>
                    <Link href={`/cases/${case_.id}`}>
                      <Button variant="outline" size="sm">
                        View Case
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div className="w-px h-full bg-border mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{comm.subject}</p>
                          <Badge className={getCommunicationTypeColor(comm.type)} variant="outline">
                            {comm.type}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{comm.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comm.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Client Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Client Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-foreground">{clientData.notes}</p>
              </div>
              <div className="mt-4">
                <Button variant="outline">Edit Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
