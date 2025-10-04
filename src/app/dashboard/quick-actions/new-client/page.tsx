"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { clients, cases } from "@/lib/data";

export default function NewClientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    case: "",
  });
  const [conflicts, setConflicts] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API and return the created client ID
    console.log("Creating new client:", formData);
    
    // Simulate creating a new client with ID
    const newClientId = Math.floor(Math.random() * 1000) + 1;
    
    // Redirect to the client detail page to show the created item
    router.push(`/clients/${newClientId}`);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const checkConflicts = () => {
    const newConflicts: string[] = [];

    // Check for duplicate email
    const emailExists = clients.some(client => client.email.toLowerCase() === formData.email.toLowerCase());
    if (emailExists) newConflicts.push("A client with this email already exists.");

    // Check for duplicate phone
    const phoneExists = clients.some(client => client.phone === formData.phone);
    if (phoneExists) newConflicts.push("A client with this phone number already exists.");

    // Check for duplicate name
    const nameExists = clients.some(client => client.name.toLowerCase() === formData.name.toLowerCase());
    if (nameExists) newConflicts.push("A client with this name already exists.");

    // Check associated case
    if (formData.case) {
      const activeCases = cases.filter(c => c.status === "Active");
      const caseExists = activeCases.some(c => c.title.toLowerCase().includes(formData.case.toLowerCase()) || c.client.toLowerCase().includes(formData.case.toLowerCase()));
      if (caseExists) newConflicts.push("The associated case matches an active case. Please verify.");
    }

    setConflicts(newConflicts);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Client</h1>
        <p className="text-muted-foreground mt-2">
          Register a new client in your system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., John Smith"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="client@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street, City, State 12345"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="case">Associated Case (Optional)</Label>
                <Input
                  id="case"
                  placeholder="Case title or ID"
                  value={formData.case}
                  onChange={(e) => handleChange("case", e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={checkConflicts}>
                  Check Conflicts
                </Button>
                <Button type="submit" className="flex-1">
                  Add Client & View Details
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
            {conflicts.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <h3 className="text-red-800 font-semibold">Conflicts Detected:</h3>
                <ul className="list-disc list-inside text-red-700 mt-2">
                  {conflicts.map((conflict, index) => (
                    <li key={index}>{conflict}</li>
                  ))}
                </ul>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
