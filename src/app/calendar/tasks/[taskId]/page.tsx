"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, User, FileText } from "lucide-react";

interface Task {
  id: string;
  title: string;
  type: 'appointment' | 'deadline';
  client?: string;
  case?: string;
  caseId: string;
  date: string;
  time?: string;
  duration?: string;
  location?: string;
  status: string;
  priority?: string;
  description: string;
}

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.taskId as string;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would fetch from API
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Client Consultation - Johnson",
      type: "appointment",
      client: "Michael Johnson",
      caseId: "1",
      date: "2024-02-15",
      time: "10:00 AM",
      duration: "1 hour",
      location: "Office",
      status: "Confirmed",
      description: "Initial consultation with Michael Johnson regarding his legal matter. Discuss case details, review documents, and outline next steps. Client has expressed concerns about the timeline and wants to understand the process thoroughly."
    },
    {
      id: "2",
      title: "Court Hearing - Johnson vs. Smith",
      type: "appointment",
      client: "Michael Johnson",
      caseId: "1",
      date: "2024-02-20",
      time: "2:00 PM",
      duration: "2 hours",
      location: "Superior Court",
      status: "Confirmed",
      description: "Motion hearing for Johnson vs. Smith case. Prepare arguments regarding the motion to dismiss. Ensure all supporting documents are organized and ready for presentation. Review case law precedents and prepare rebuttals."
    },
    {
      id: "3",
      title: "File Motion to Dismiss",
      type: "deadline",
      case: "Johnson vs. Smith",
      caseId: "1",
      date: "2024-02-16",
      priority: "High",
      status: "Pending",
      description: "Motion to dismiss must be filed before the court deadline. This is a critical filing that could significantly impact the case outcome. Ensure all supporting documentation is complete and properly formatted according to court requirements."
    },
    {
      id: "4",
      title: "Submit Discovery Responses",
      type: "deadline",
      case: "Davis Divorce",
      caseId: "4",
      date: "2024-02-19",
      priority: "Medium",
      status: "In Progress",
      description: "Discovery responses due to opposing counsel. Review all interrogatories and document requests carefully. Ensure responses are accurate, complete, and submitted within the required timeframe. Coordinate with client for any additional information needed."
    }
  ];

  useEffect(() => {
    // Simulate API call
    const foundTask = mockTasks.find(t => t.id === taskId);
    setTask(foundTask || null);
    setLoading(false);
  }, [taskId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Task Not Found</h2>
        <Link href="/calendar">
          <Button>Back to Calendar</Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Court Hearing":
        return "bg-purple-100 text-purple-800";
      case "Consultation":
        return "bg-blue-100 text-blue-800";
      case "Meeting":
        return "bg-green-100 text-green-800";
      case "Deposition":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-6">
        <Link href="/calendar">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calendar
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
                {task.priority && (
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                )}
                <Badge className={task.type === 'appointment' ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}>
                  {task.type === 'appointment' ? 'Appointment' : 'Deadline'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {task.client && (
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Client</p>
                      <Link href={`/clients/${task.caseId}`} className="text-sm text-primary hover:underline">
                        {task.client}
                      </Link>
                    </div>
                  </div>
                )}
                
                {task.case && (
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Case</p>
                      <Link href={`/cases/${task.caseId}`} className="text-sm text-primary hover:underline">
                        {task.case}
                      </Link>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm">{new Date(task.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>

                {task.time && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Time</p>
                      <p className="text-sm">{task.time} {task.duration && `(${task.duration})`}</p>
                    </div>
                  </div>
                )}

                {task.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm">{task.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <Link href={`/cases/${task.caseId}`}>
                <Button variant="outline">
                  View Case
                </Button>
              </Link>
              <Link href="/calendar">
                <Button>
                  Back to Calendar
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
