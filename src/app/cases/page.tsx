"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cases, invoices, timeEntries } from "@/lib/data";

export default function CasesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);
  const [reportType, setReportType] = useState<'general' | 'litigation' | 'complete' | 'hearings' | null>(null);

  // Initialize selected status from URL params
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
  }, [searchParams]);

  const statusCategories = ["All", "Active", "In Review", "Pending", "Concluded"];

  // Handle status tab change
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    // Update URL query parameter
    if (status === "All" || status === "") {
      router.push("/cases");
    } else {
      router.push(`/cases?status=${status}`);
    }
  };

  // Filter cases based on search term and status filter
  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === "" || selectedStatus === "All"
      ? true
      : case_.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Group filtered cases by category
  const groupedCases = filteredCases.reduce((acc, case_) => {
    const cat = case_.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(case_);
    return acc;
  }, {} as Record<string, typeof cases>);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Litigation":
        return "bg-red-100 text-red-800 border-red-200";
      case "Merger or Acquisition":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "General Advice":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleGenerateReport = (case_: typeof cases[0]) => {
    setSelectedCase(case_);
    setReportType(null); // Reset to show selection dialog
  };

  const selectReportType = (type: 'general' | 'litigation' | 'complete' | 'hearings') => {
    setReportType(type);
  };

  const closeReport = () => {
    setSelectedCase(null);
    setReportType(null);
  };

  const renderReportContent = () => {
    if (!selectedCase || !reportType) return null;

    const caseInvoices = invoices.filter(inv => inv.case === selectedCase.title);
    const caseTimeEntries = timeEntries.filter(te => te.case === selectedCase.title);

    switch (reportType) {
      case 'general':
        return (
          <div className="space-y-4">
            <div><strong>Client:</strong> {selectedCase.client}</div>
            <div><strong>Type:</strong> {selectedCase.type}</div>
            <div><strong>Category:</strong> {selectedCase.category}</div>
            <div><strong>Status:</strong> {selectedCase.status}</div>
            <div><strong>Attorney:</strong> {selectedCase.attorney}</div>
            <div><strong>Description:</strong> {selectedCase.description}</div>
            <div><strong>Created:</strong> {selectedCase.dateCreated}</div>
            <div><strong>Next Hearing:</strong> {selectedCase.nextHearing || "Not scheduled"}</div>
          </div>
        );
      case 'litigation':
        return (
          <div className="space-y-4">
            <div><strong>Client:</strong> {selectedCase.client}</div>
            <div><strong>Type:</strong> {selectedCase.type}</div>
            <div><strong>Category:</strong> {selectedCase.category}</div>
            <div><strong>Status:</strong> {selectedCase.status}</div>
            <div><strong>Attorney:</strong> {selectedCase.attorney}</div>
            <div><strong>Description:</strong> {selectedCase.description}</div>
            <div><strong>Created:</strong> {selectedCase.dateCreated}</div>
            <div><strong>Next Hearing:</strong> {selectedCase.nextHearing || "Not scheduled"}</div>
            <div><strong>Case Timeline:</strong> Initial consultation on {selectedCase.dateCreated}, next hearing scheduled for {selectedCase.nextHearing || "TBD"}</div>
            <div><strong>Key Events:</strong> Case filed, discovery in progress, mediation scheduled</div>
          </div>
        );
      case 'complete':
        return (
          <div className="space-y-4">
            <div><strong>Client:</strong> {selectedCase.client}</div>
            <div><strong>Type:</strong> {selectedCase.type}</div>
            <div><strong>Category:</strong> {selectedCase.category}</div>
            <div><strong>Status:</strong> {selectedCase.status}</div>
            <div><strong>Attorney:</strong> {selectedCase.attorney}</div>
            <div><strong>Description:</strong> {selectedCase.description}</div>
            <div><strong>Created:</strong> {selectedCase.dateCreated}</div>
            <div><strong>Next Hearing:</strong> {selectedCase.nextHearing || "Not scheduled"}</div>

            <div>
              <strong>Client Documents:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Client Intake Form.pdf</li>
                <li>Power of Attorney.pdf</li>
                <li>Medical Records.pdf</li>
                <li>Correspondence.pdf</li>
              </ul>
            </div>

            <div>
              <strong>Client Intake Forms:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Initial Consultation Form</li>
                <li>Conflict Check Form</li>
                <li>Retainer Agreement</li>
              </ul>
            </div>

            <div>
              <strong>Time Sheets:</strong>
              {caseTimeEntries.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                  {caseTimeEntries.map(entry => (
                    <li key={entry.id}>{entry.date}: {entry.hours}h - {entry.description}</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">No time entries found</p>
              )}
            </div>

            <div>
              <strong>Invoices:</strong>
              {caseInvoices.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                  {caseInvoices.map(inv => (
                    <li key={inv.id}>{inv.id}: ${inv.amount} ({inv.status})</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">No invoices found</p>
              )}
            </div>
          </div>
        );
      case 'hearings':
        return (
          <div className="space-y-4">
            <div><strong>Client:</strong> {selectedCase.client}</div>
            <div><strong>Case Title:</strong> {selectedCase.title}</div>
            <div><strong>Attorney:</strong> {selectedCase.attorney}</div>
            <div><strong>Next Hearing:</strong> {selectedCase.nextHearing || "No upcoming hearings"}</div>
            <div>
              <strong>Past Hearings:</strong>
              {selectedCase.pastHearings && selectedCase.pastHearings.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                  {selectedCase.pastHearings.map((hearing, index) => (
                    <li key={index}>{hearing.date}: {hearing.type} - {hearing.outcome}</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">No past hearings recorded</p>
              )}
            </div>
            <div><strong>Case Status:</strong> {selectedCase.status}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cases</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your legal cases
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          New Case
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-border">
        {statusCategories.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 font-medium rounded-t-lg border-b-2 transition-colors ${
              (selectedStatus === status) || (selectedStatus === "" && status === "All")
                ? "border-primary text-primary bg-background"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search cases, clients, or case types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Cases by Category */}
      {Object.keys(groupedCases).length > 0 ? (
        Object.entries(groupedCases).map(([category, categoryCases]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">{category}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categoryCases.map((case_) => (
                <Card key={case_.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Client: {case_.client}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getCategoryColor(case_.category)}>
                          {case_.category}
                        </Badge>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Case Type</p>
                        <p className="text-sm text-muted-foreground">{case_.type}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">Attorney</p>
                        <Link href={`/teams/${encodeURIComponent(case_.attorney)}`} className="text-sm text-primary hover:underline">
                          {case_.attorney}
                        </Link>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">Description</p>
                        <p className="text-sm text-muted-foreground">{case_.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Created</p>
                          <p className="text-muted-foreground">{case_.dateCreated}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Next Hearing</p>
                          <p className="text-muted-foreground">
                            {case_.nextHearing || "Not scheduled"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/cases/${case_.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleGenerateReport(case_)}>
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No cases found matching your search.</p>
        </div>
      )}

      {/* Report Selection Dialog */}
      {selectedCase && !reportType && (
        <Dialog open={!!selectedCase && !reportType} onOpenChange={closeReport}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Select Report Type for {selectedCase.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Button onClick={() => selectReportType('general')} className="w-full">
                General Report
              </Button>
              <Button onClick={() => selectReportType('litigation')} className="w-full" variant="outline">
                Litigation Report
              </Button>
              <Button onClick={() => selectReportType('complete')} className="w-full" variant="outline">
                Complete Report
              </Button>
              <Button onClick={() => selectReportType('hearings')} className="w-full" variant="outline">
                Hearings Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Report Display Dialog */}
      {selectedCase && reportType && (
        <Dialog open={!!selectedCase && !!reportType} onOpenChange={closeReport}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report: {selectedCase.title}</DialogTitle>
            </DialogHeader>
            {renderReportContent()}
            <div className="flex justify-end mt-4">
              <Button onClick={() => window.print()}>Print Report</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
