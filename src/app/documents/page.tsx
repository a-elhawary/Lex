"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedMatter, setSelectedMatter] = useState("all");

  // Enhanced documents data with client and matter categorization
  const documents = [
    {
      id: "1",
      name: "Johnson vs Smith - Initial Complaint.pdf",
      type: "Legal Document",
      case: "Johnson vs. Smith",
      client: "Michael Johnson",
      matter: "Personal Injury",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
      status: "Final",
      sharepointUrl: "https://yourcompany.sharepoint.com/sites/legal/JohnsonCase/Complaint.pdf",
    },
    {
      id: "2",
      name: "Medical Records - Johnson.pdf",
      type: "Evidence",
      case: "Johnson vs. Smith",
      client: "Michael Johnson",
      matter: "Personal Injury",
      uploadDate: "2024-01-18",
      size: "5.7 MB",
      status: "Reviewed",
      sharepointUrl: "https://yourcompany.sharepoint.com/sites/legal/JohnsonCase/MedicalRecords.pdf",
    },
    {
      id: "3",
      name: "Williams Estate Plan - Draft.docx",
      type: "Legal Document",
      case: "Williams Estate",
      client: "Sarah Williams",
      matter: "Estate Planning",
      uploadDate: "2024-01-22",
      size: "856 KB",
      status: "Draft",
      sharepointUrl: "https://yourcompany.sharepoint.com/sites/legal/WilliamsEstate/EstatePlan.docx",
    },
  ];

  // Templates section
  const templates = [
    {
      id: "t1",
      name: "Client Intake Form",
      type: "Form",
      description: "Standard client intake form for new cases",
      lastUpdated: "2024-01-15",
      sharepointUrl: "https://yourcompany.sharepoint.com/sites/legal/Templates/ClientIntakeForm.docx",
    },
    {
      id: "t2",
      name: "Retainer Agreement Template",
      type: "Contract",
      description: "Standard retainer agreement template",
      lastUpdated: "2024-01-10",
      sharepointUrl: "https://yourcompany.sharepoint.com/sites/legal/Templates/RetainerAgreement.docx",
    },
  ];

  // Filter documents by client and matter
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.case.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClient = selectedClient === "all" || doc.client === selectedClient;
    const matchesMatter = selectedMatter === "all" || doc.matter === selectedMatter;
    
    return matchesSearch && matchesClient && matchesMatter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Final":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Reviewed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openSharePoint = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize all case-related documents with SharePoint integration
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => openSharePoint("https://yourcompany.sharepoint.com/sites/legal")}
          >
            Open SharePoint
          </Button>
        </div>
      </div>

      {/* SharePoint Integration Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>
            <div>
              <p className="font-medium text-blue-900">Microsoft SharePoint Integration</p>
              <p className="text-sm text-blue-700">
                All documents are stored and managed through SharePoint
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search documents, clients, or cases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <select 
          value={selectedClient} 
          onChange={(e) => setSelectedClient(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-sm"
        >
          <option value="all">All Clients</option>
          <option value="Michael Johnson">Michael Johnson</option>
          <option value="Sarah Williams">Sarah Williams</option>
          <option value="TechCorp Inc.">TechCorp Inc.</option>
          <option value="Jennifer Davis">Jennifer Davis</option>
        </select>
        <select 
          value={selectedMatter} 
          onChange={(e) => setSelectedMatter(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-sm"
        >
          <option value="all">All Matters</option>
          <option value="Personal Injury">Personal Injury</option>
          <option value="Estate Planning">Estate Planning</option>
          <option value="Corporate Law">Corporate Law</option>
          <option value="Divorce Proceedings">Divorce Proceedings</option>
        </select>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <div className="space-y-6">
            {["Michael Johnson", "Sarah Williams", "TechCorp Inc.", "Jennifer Davis"].map((client) => {
              const clientDocs = filteredDocuments.filter(doc => doc.client === client);
              if (clientDocs.length === 0) return null;
              
              return (
                <Card key={client} className="mb-6">
                  <CardHeader>
                    <CardTitle>{client}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {clientDocs.length} document{clientDocs.length !== 1 ? 's' : ''}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {["Personal Injury", "Estate Planning", "Corporate Law", "Divorce Proceedings"].map((matter) => {
                      const matterDocs = clientDocs.filter(doc => doc.matter === matter);
                      if (matterDocs.length === 0) return null;
                      
                      return (
                        <div key={matter} className="mb-4">
                          <h4 className="font-medium text-lg mb-2">{matter}</h4>
                          <div className="space-y-3">
                            {matterDocs.map((doc) => (
                              <div key={doc.id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{doc.name}</p>
                                    <Badge className={getStatusColor(doc.status)}>
                                      {doc.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {doc.case} • {doc.uploadDate} • {doc.size}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => openSharePoint(doc.sharepointUrl)}
                                  >
                                    View in SharePoint
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Document Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pre-built templates for common legal documents
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <Badge variant="secondary">{template.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Last updated: {template.lastUpdated}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => openSharePoint(template.sharepointUrl)}
                      >
                        Open in SharePoint
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
