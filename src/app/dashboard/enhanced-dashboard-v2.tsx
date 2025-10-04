"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data for enhanced dashboard
const mockData = {
  stats: {
    activeCases: { value: 12, trend: "+15%", change: 2 },
    revenue: { value: 485000, trend: "+8.5%", change: 38500 },
    newClients: { value: 8, trend: "+33%", change: 2 },
    completionRate: { value: 87, trend: "+5%", change: 4 }
  },
  
  monthlyRevenue: [
    { month: "Jan", revenue: 42000, cases: 15 },
    { month: "Feb", revenue: 45000, cases: 18 },
    { month: "Mar", revenue: 52000, cases: 22 },
    { month: "Apr", revenue: 48000, cases: 19 },
    { month: "May", revenue: 55000, cases: 25 },
    { month: "Jun", revenue: 58000, cases: 28 }
  ],
  
  caseTypes: [
    { type: "Corporate", count: 45, percentage: 35 },
    { type: "Litigation", count: 38, percentage: 30 },
    { type: "Real Estate", count: 25, percentage: 20 },
    { type: "Family Law", count: 19, percentage: 15 }
  ],
  
  recentActivity: [
    { id: 1, type: "case", action: "New case opened", client: "TechCorp Inc", time: "2 min ago", priority: "high" },
    { id: 2, type: "document", action: "Contract signed", client: "Johnson Estate", time: "15 min ago", priority: "medium" },
    { id: 3, type: "payment", action: "Payment received", client: "Smith LLC", time: "1 hour ago", amount: "$15,500", priority: "low" },
    { id: 4, type: "appointment", action: "Meeting scheduled", client: "Williams Corp", time: "2 hours ago", priority: "medium" }
  ],
  
  upcomingDeadlines: [
    { title: "Discovery Response", case: "Johnson vs. TechCorp", due: "Today 5:00 PM", urgency: "critical" },
    { title: "Motion Filing", case: "Smith Estate", due: "Tomorrow 2:00 PM", urgency: "high" },
    { title: "Contract Review", case: "Williams Acquisition", due: "Friday 12:00 PM", urgency: "medium" }
  ]
};

export default function EnhancedDashboardV2() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [animatedStats, setAnimatedStats] = useState({
    activeCases: 0,
    revenue: 0,
    newClients: 0,
    completionRate: 0
  });

  // Animate stats on load
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateValue = (key: keyof typeof mockData.stats, target: number) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedStats(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, stepDuration);
    };

    Object.entries(mockData.stats).forEach(([key, data]) => {
      animateValue(key as keyof typeof mockData.stats, data.value);
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[urgency as keyof typeof colors] || '';
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      case: '📁',
      document: '📄',
      payment: '💰',
      appointment: '📅'
    };
    return icons[type as keyof typeof icons] || '📋';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Enhanced Dashboard</h1>
          <p className="text-lg text-gray-600">Real-time insights and analytics for your practice</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.activeCases}</div>
              <div className="flex items-center text-sm">
                <span className={getTrendColor(mockData.stats.activeCases.trend)}>{mockData.stats.activeCases.trend}</span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(animatedStats.revenue)}</div>
              <div className="flex items-center text-sm">
                <span className={getTrendColor(mockData.stats.revenue.trend)}>{mockData.stats.revenue.trend}</span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">New Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.newClients}</div>
              <div className="flex items-center text-sm">
                <span className={getTrendColor(mockData.stats.newClients.trend)}>{mockData.stats.newClients.trend}</span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.completionRate}%</div>
              <div className="flex items-center text-sm">
                <span className={getTrendColor(mockData.stats.completionRate.trend)}>{mockData.stats.completionRate.trend}</span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <Badge variant={activity.priority === 'high' ? 'destructive' : 'secondary'}>
                            {activity.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{activity.client}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.amount && (
                          <p className="text-sm font-medium text-green-600">{activity.amount}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900">{deadline.title}</h4>
                        <Badge className={getUrgencyColor(deadline.urgency)}>
                          {deadline.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{deadline.case}</p>
                      <p className="text-xs text-gray-500">{deadline.due}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Case Types Distribution */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Case Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.caseTypes.map((type, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{type.type}</span>
                        <span className="text-gray-900 font-medium">{type.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${type.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button asChild className="w-full">
                  <Link href="/cases/new">New Case</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/clients/new">Add Client</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/calendar/new">Schedule Meeting</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
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
