"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { InvoiceStatus, TimeEntry } from "@/types/billing";

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);
  const [showTimeEntryDialog, setShowTimeEntryDialog] = useState(false);
  const [showFeeCalculator, setShowFeeCalculator] = useState(false);
  const [newTimeEntry, setNewTimeEntry] = useState({
    client: "",
    case: "",
    description: "",
    hours: 0,
    rate: 200,
    billable: true,
    date: new Date().toISOString().split('T')[0]
  });
  const [feeCalculatorData, setFeeCalculatorData] = useState({
    caseName: "",
    lawyers: [{ name: "", hours: 0, rate: 200 }],
    expenses: [{ description: "", amount: 0 }],
    taxRate: 0,
    discount: 0
  });

  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      client: "Michael Johnson",
      case: "Johnson vs. Smith",
      amount: 5500.00,
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "paid",
      description: "Legal services for personal injury case",
      hoursWorked: 22,
      hourlyRate: 250,
    },
    {
      id: "INV-002",
      client: "Sarah Williams",
      case: "Williams Estate Planning",
      amount: 3200.00,
      date: "2024-01-20",
      dueDate: "2024-02-20",
      status: "pending-approval",
      description: "Estate planning and will preparation",
      hoursWorked: 16,
      hourlyRate: 200,
    },
    {
      id: "INV-003",
      client: "TechCorp Inc.",
      case: "Corporate Legal Review",
      amount: 8750.00,
      date: "2024-01-25",
      dueDate: "2024-02-25",
      status: "overdue",
      description: "Contract review and legal consultation",
      hoursWorked: 35,
      hourlyRate: 250,
    },
    {
      id: "INV-004",
      client: "Jennifer Davis",
      case: "Davis Divorce Proceedings",
      amount: 4200.00,
      date: "2024-01-28",
      dueDate: "2024-02-28",
      status: "sent",
      description: "Family law services and court representation",
      hoursWorked: 21,
      hourlyRate: 200,
    },
    {
      id: "INV-005",
      client: "Robert Chen",
      case: "Chen Business Formation",
      amount: 2800.00,
      date: "2024-01-30",
      dueDate: "2024-03-01",
      status: "draft",
      description: "Business formation and incorporation services",
      hoursWorked: 14,
      hourlyRate: 200,
    },
    {
      id: "INV-006",
      client: "Emma Thompson",
      case: "Thompson IP Litigation",
      amount: 6800.00,
      date: "2024-01-18",
      dueDate: "2024-02-18",
      status: "paid",
      description: "Patent infringement defense",
      hoursWorked: 27,
      hourlyRate: 250,
    },
    {
      id: "INV-007",
      client: "Global Consulting Ltd",
      case: "Contract Dispute Resolution",
      amount: 9500.00,
      date: "2024-01-22",
      dueDate: "2024-02-22",
      status: "sent",
      description: "Commercial litigation services",
      hoursWorked: 38,
      hourlyRate: 250
    },
  ]);

  const timeEntries: TimeEntry[] = [
    {
      id: "1",
      date: "2024-01-30",
      client: "Michael Johnson",
      case: "Johnson vs. Smith",
      description: "Review medical records and prepare case summary",
      hours: 3.5,
      rate: 250,
      amount: 875.00,
      billable: true,
      timekeeper: "Johnathan Smith",
    },
    {
      id: "2",
      date: "2024-01-30",
      client: "Sarah Williams",
      case: "Williams Estate Planning",
      description: "Draft will and trust documents",
      hours: 2.0,
      rate: 200,
      amount: 400.00,
      billable: true,
      timekeeper: "Elizabeth Johnson",
    },
    {
      id: "3",
      date: "2024-01-29",
      client: "TechCorp Inc.",
      case: "Corporate Legal Review",
      description: "Contract negotiation meeting",
      hours: 4.0,
      rate: 250,
      amount: 1000.00,
      billable: true,
      timekeeper: "Michael Davis",
    },
    {
      id: "4",
      date: "2024-01-29",
      client: "Jennifer Davis",
      case: "Davis Divorce Proceedings",
      description: "Court hearing preparation",
      hours: 2.5,
      rate: 200,
      amount: 500.00,
      billable: true,
      timekeeper: "Sarah Wilson",
    },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.case.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: InvoiceStatus): string => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "sent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending-approval":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalRevenue = invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === "pending-approval" || inv.status === "sent").reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0);

  const handleNewInvoice = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would create a new invoice
    console.log("Creating new invoice");
    setShowNewInvoiceForm(false);
  };

  const handleStatusChange = (invoiceId: string, newStatus: InvoiceStatus) => {
    // In a real app, this would update the invoice status
    console.log(`Updating invoice ${invoiceId} status to ${newStatus}`);
    // Update the invoices array
    setInvoices(prev => prev.map(inv =>
      inv.id === invoiceId ? { ...inv, status: newStatus } : inv
    ));
  };

  const handleAddTimeEntry = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would create a new time entry
    console.log("Adding time entry:", newTimeEntry);
    setShowTimeEntryDialog(false);
    setNewTimeEntry({
      client: "",
      case: "",
      description: "",
      hours: 0,
      rate: 200,
      billable: true,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground mt-2">
            Manage invoices, track payments, and monitor revenue
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setShowNewInvoiceForm(true)}
          >
            Create Invoice
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowFeeCalculator(true)}
          >
            Fee Calculator
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              ${pendingAmount.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Pending Payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              ${overdueAmount.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Overdue Amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {invoices.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search invoices by client, case, or invoice number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* New Invoice Form */}
      {showNewInvoiceForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewInvoice} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input id="client" placeholder="Select client" required />
                </div>
                <div>
                  <Label htmlFor="case">Case</Label>
                  <Input id="case" placeholder="Select case" required />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" step="0.01" placeholder="0.00" required />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" required />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Invoice description" rows={3} />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Invoice</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewInvoiceForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{invoice.id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {invoice.client}
                        </p>
                      </div>
                      <Select
                        value={invoice.status}
                        onValueChange={(value) => handleStatusChange(invoice.id, value as InvoiceStatus)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                          <SelectItem value="pending-approval">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Case</p>
                        <p className="text-sm text-muted-foreground">{invoice.case}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-foreground">Description</p>
                        <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Amount</p>
                          <p className="text-lg font-bold text-foreground">
                            ${invoice.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Hours</p>
                          <p className="text-muted-foreground">
                            {invoice.hoursWorked}h @ ${invoice.hourlyRate}/hr
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Invoice Date</p>
                          <p className="text-muted-foreground">{invoice.date}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Due Date</p>
                          <p className="text-muted-foreground">{invoice.dueDate}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No invoices found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="time-tracking">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Time Entries</CardTitle>
                <Dialog open={showTimeEntryDialog} onOpenChange={setShowTimeEntryDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add Time Entry</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Time Entry</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddTimeEntry} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="time-client">Client</Label>
                          <Input
                            id="time-client"
                            value={newTimeEntry.client}
                            onChange={(e) => setNewTimeEntry({...newTimeEntry, client: e.target.value})}
                            placeholder="Enter client name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time-case">Case</Label>
                          <Input
                            id="time-case"
                            value={newTimeEntry.case}
                            onChange={(e) => setNewTimeEntry({...newTimeEntry, case: e.target.value})}
                            placeholder="Enter case name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time-hours">Hours</Label>
                          <Input
                            id="time-hours"
                            type="number"
                            step="0.25"
                            value={newTimeEntry.hours}
                            onChange={(e) => setNewTimeEntry({...newTimeEntry, hours: parseFloat(e.target.value) || 0})}
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time-rate">Rate ($/hr)</Label>
                          <Input
                            id="time-rate"
                            type="number"
                            step="25"
                            value={newTimeEntry.rate}
                            onChange={(e) => setNewTimeEntry({...newTimeEntry, rate: parseFloat(e.target.value) || 0})}
                            placeholder="200"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time-date">Date</Label>
                          <Input
                            id="time-date"
                            type="date"
                            value={newTimeEntry.date}
                            onChange={(e) => setNewTimeEntry({...newTimeEntry, date: e.target.value})}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="time-billable"
                            checked={newTimeEntry.billable}
                            onCheckedChange={(checked) => setNewTimeEntry({...newTimeEntry, billable: checked === true})}
                          />
                          <Label htmlFor="time-billable">Billable</Label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="time-description">Description</Label>
                        <Textarea
                          id="time-description"
                          value={newTimeEntry.description}
                          onChange={(e) => setNewTimeEntry({...newTimeEntry, description: e.target.value})}
                          placeholder="Describe the work performed"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">Add Time Entry</Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowTimeEntryDialog(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Timekeeper</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.client}</TableCell>
                      <TableCell>{entry.case}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>
                        <Link
                          href={`/teams/${encodeURIComponent(entry.timekeeper)}`}
                          className="text-primary hover:underline"
                        >
                          {entry.timekeeper}
                        </Link>
                      </TableCell>
                      <TableCell>{entry.hours}h</TableCell>
                      <TableCell>${entry.rate}/hr</TableCell>
                      <TableCell>${entry.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fee Calculator Dialog */}
      <Dialog open={showFeeCalculator} onOpenChange={setShowFeeCalculator}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Fee Calculator</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Case Selection */}
            <div>
              <Label htmlFor="case-name">Case/Matter Name</Label>
              <Input
                id="case-name"
                value={feeCalculatorData.caseName}
                onChange={(e) => setFeeCalculatorData({...feeCalculatorData, caseName: e.target.value})}
                placeholder="Enter case name"
              />
            </div>

            {/* Lawyers Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Lawyers</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFeeCalculatorData({
                    ...feeCalculatorData,
                    lawyers: [...feeCalculatorData.lawyers, { name: "", hours: 0, rate: 200 }]
                  })}
                >
                  Add Lawyer
                </Button>
              </div>
              <div className="space-y-3">
                {feeCalculatorData.lawyers.map((lawyer, index) => (
                  <div key={index} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Label htmlFor={`lawyer-name-${index}`}>Name</Label>
                      <Input
                        id={`lawyer-name-${index}`}
                        value={lawyer.name}
                        onChange={(e) => {
                          const newLawyers = [...feeCalculatorData.lawyers];
                          newLawyers[index].name = e.target.value;
                          setFeeCalculatorData({...feeCalculatorData, lawyers: newLawyers});
                        }}
                        placeholder="Lawyer name"
                      />
                    </div>
                    <div className="w-24">
                      <Label htmlFor={`lawyer-hours-${index}`}>Hours</Label>
                      <Input
                        id={`lawyer-hours-${index}`}
                        type="number"
                        step="0.25"
                        value={lawyer.hours}
                        onChange={(e) => {
                          const newLawyers = [...feeCalculatorData.lawyers];
                          newLawyers[index].hours = parseFloat(e.target.value) || 0;
                          setFeeCalculatorData({...feeCalculatorData, lawyers: newLawyers});
                        }}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="w-24">
                      <Label htmlFor={`lawyer-rate-${index}`}>Rate ($/hr)</Label>
                      <Input
                        id={`lawyer-rate-${index}`}
                        type="number"
                        step="25"
                        value={lawyer.rate}
                        onChange={(e) => {
                          const newLawyers = [...feeCalculatorData.lawyers];
                          newLawyers[index].rate = parseFloat(e.target.value) || 0;
                          setFeeCalculatorData({...feeCalculatorData, lawyers: newLawyers});
                        }}
                        placeholder="200"
                      />
                    </div>
                    <div className="w-20">
                      <Label>Amount</Label>
                      <div className="text-sm font-medium p-2 bg-muted rounded">
                        ${(lawyer.hours * lawyer.rate).toLocaleString()}
                      </div>
                    </div>
                    {feeCalculatorData.lawyers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newLawyers = feeCalculatorData.lawyers.filter((_, i) => i !== index);
                          setFeeCalculatorData({...feeCalculatorData, lawyers: newLawyers});
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Expenses Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Expenses</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFeeCalculatorData({
                    ...feeCalculatorData,
                    expenses: [...feeCalculatorData.expenses, { description: "", amount: 0 }]
                  })}
                >
                  Add Expense
                </Button>
              </div>
              <div className="space-y-3">
                {feeCalculatorData.expenses.map((expense, index) => (
                  <div key={index} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Label htmlFor={`expense-desc-${index}`}>Description</Label>
                      <Input
                        id={`expense-desc-${index}`}
                        value={expense.description}
                        onChange={(e) => {
                          const newExpenses = [...feeCalculatorData.expenses];
                          newExpenses[index].description = e.target.value;
                          setFeeCalculatorData({...feeCalculatorData, expenses: newExpenses});
                        }}
                        placeholder="Expense description"
                      />
                    </div>
                    <div className="w-32">
                      <Label htmlFor={`expense-amount-${index}`}>Amount ($)</Label>
                      <Input
                        id={`expense-amount-${index}`}
                        type="number"
                        step="0.01"
                        value={expense.amount}
                        onChange={(e) => {
                          const newExpenses = [...feeCalculatorData.expenses];
                          newExpenses[index].amount = parseFloat(e.target.value) || 0;
                          setFeeCalculatorData({...feeCalculatorData, expenses: newExpenses});
                        }}
                        placeholder="0.00"
                      />
                    </div>
                    {feeCalculatorData.expenses.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newExpenses = feeCalculatorData.expenses.filter((_, i) => i !== index);
                          setFeeCalculatorData({...feeCalculatorData, expenses: newExpenses});
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tax and Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  step="0.01"
                  value={feeCalculatorData.taxRate}
                  onChange={(e) => setFeeCalculatorData({...feeCalculatorData, taxRate: parseFloat(e.target.value) || 0})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount ($)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  value={feeCalculatorData.discount}
                  onChange={(e) => setFeeCalculatorData({...feeCalculatorData, discount: parseFloat(e.target.value) || 0})}
                  placeholder="0.00"
                />
              </div>
            </div>

            <Separator />

            {/* Total Calculation */}
            <div className="space-y-2">
              {(() => {
                const lawyerTotal = feeCalculatorData.lawyers.reduce((sum, lawyer) => sum + (lawyer.hours * lawyer.rate), 0);
                const expenseTotal = feeCalculatorData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
                const subtotal = lawyerTotal + expenseTotal;
                const taxAmount = subtotal * (feeCalculatorData.taxRate / 100);
                const total = subtotal + taxAmount - feeCalculatorData.discount;

                return (
                  <>
                    <div className="flex justify-between">
                      <span>Lawyer Fees:</span>
                      <span>${lawyerTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expenses:</span>
                      <span>${expenseTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({feeCalculatorData.taxRate}%):</span>
                      <span>${taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>-${feeCalculatorData.discount.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Fee:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowFeeCalculator(false);
                  setFeeCalculatorData({
                    caseName: "",
                    lawyers: [{ name: "", hours: 0, rate: 200 }],
                    expenses: [{ description: "", amount: 0 }],
                    taxRate: 0,
                    discount: 0
                  });
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
