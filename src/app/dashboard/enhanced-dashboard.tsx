"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function EnhancedDashboardPage() {
  const stats = [
    {
      title: "Active Cases",
      value: "12",
      description: "Currently in progress",
      trend: "+2 this week",
      trendDirection: "up",
      href: "/cases?status=Active",
      color: "blue",
    },
    {
      title: "Upcoming Appointments",
      value: "5",
      description: "Next 7 days",
      trend: "+1 tomorrow",
      trendDirection: "up",
      href: "/calendar?filter=upcoming",
      color: "green",
    },
    {
      title: "Pending Documents",
      value: "8",
      description: "Awaiting review",
      trend: "3 urgent",
      trendDirection: "warning",
      href: "/documents",
      color: "amber",
    },
    {
      title: "Outstanding Invoices",
      value: "$24,500",
      description: "Total amount due",
      trend: "$5,200 overdue",
      trendDirection: "down",
      href: "/billing?filter=overdue",
      color: "red",
    },
  ];

  const recentActivity = [
    {
      action: "New case filed",
      client: "Johnson vs. Smith",
      time: "2 hours ago",
      href: "/cases/1",
      type: "case",
      priority: "high",
    },
    {
      action: "Document uploaded",
      client: "Estate Planning - Williams",
      time: "4 hours ago",
      href: "/documents",
      type: "document",
      priority: "medium",
    },
    {
      action: "Appointment scheduled",
      client: "Corporate Law - TechCorp",
      time: "1 day ago",
      href: "/calendar",
      type: "appointment",
      priority: "low",
    },
    {
      action: "Invoice sent",
      client: "Personal Injury - Davis",
      time: "2 days ago",
      href: "/billing",
      type: "invoice",
      priority: "medium",
    },
  ];

  const upcomingDeadlines = [
    {
      title: "Motion to Dismiss Filing",
      case: "Johnson vs. Smith",
      dueDate: "Today, 5:00 PM",
      urgency: "critical",
    },
    {
      title: "Discovery Response",
      case: "Williams Estate",
      dueDate: "Tomorrow, 2:00 PM",
      urgency: "high",
    },
    {
      title: "Contract Review",
      case: "TechCorp Acquisition",
      dueDate: "Friday, 12:00 PM",
      urgency: "medium",
    },
  ];

  const caseProgress = [
    {
      name: "Johnson vs. Smith",
      progress: 75,
      stage: "Discovery",
      daysRemaining: 15,
    },
    {
      name: "Williams Estate Planning",
      progress: 45,
      stage: "Document Review",
      daysRemaining: 30,
    },
    {
      name: "TechCorp Merger",
      progress: 90,
      stage: "Final Review",
      daysRemaining: 5,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-200 bg-blue-50 hover:bg-blue-100",
      green: "border-green-200 bg-green-50 hover:bg-green-100",
      amber: "border-amber-200 bg-amber-50 hover:bg-amber-100",
      red: "border-red-200 bg-red-50 hover:bg-red-100",
    };
    return colors[color as keyof typeof colors] || "";
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      high: <Badge variant="destructive">High</Badge>,
      medium: <Badge variant="secondary">Medium</Badge>,
      low: <Badge variant="outline">Low</Badge>,
    };
    return badges[priority as keyof typeof badges] || null;
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      critical: "text-red-600 font-semibold",
      high: "text-orange-600 font-medium",
      medium: "text-yellow-600",
      low: "text-gray-600",
    };
    return colors[urgency as keyof typeof colors] || "";
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">
            Welcome back! Here's your practice overview for today.
          </p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button variant="outline" asChild>
            <Link href="/tasks/new">Quick Task</Link>
          </Button>
          <Button asChild>
            <Link href="/cases/new">New Case</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card
              className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer",
                getColorClasses(stat.color)
              )}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 mb-2">{stat.description}</p>
                <div
                  className={cn(
                    "text-xs font-medium",
                    stat.trendDirection === "up"
                      ? "text-green-600"
                      : stat.trendDirection === "warning"
                      ? "text-amber-600"
                      : "text-red-600"
                  )}
                >
                  {stat.trend}
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-white/20 transform rotate-45 translate-x-12 -translate-y-12" />
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">
                          {activity.action}
                        </p>
                        {getPriorityBadge(activity.priority)}
                      </div>
                      <p className="text-sm text-gray-600">{activity.client}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={activity.href}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Case Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Active Case Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {caseProgress.map((caseItem, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          {caseItem.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {caseItem.stage} • {caseItem.daysRemaining} days left
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {caseItem.progress}%
                      </span>
                    </div>
                    <Progress value={caseItem.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-gray-200"
                  >
                    <p className="font-medium text-gray-900 text-sm">
                      {deadline.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {deadline.case}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-2",
                        getUrgencyColor(deadline.urgency)
                      )}
                    >
                      {deadline.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/clients/new">Add New Client</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/appointments/new">Schedule Appointment</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/documents/upload">Upload Document</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/billing/new">Create Invoice</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
