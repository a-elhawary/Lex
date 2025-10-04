"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  location: string;
  status: string;
  caseId: string;
}

interface Deadline {
  id: string;
  title: string;
  case: string;
  caseId: string;
  date: string;
  priority: string;
  status: string;
  description: string;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  // Sample data for the calendar
  const appointments: Appointment[] = [
    {
      id: "1",
      title: "Client Consultation - Johnson",
      client: "Michael Johnson",
      date: "2024-02-15",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Consultation",
      location: "Office",
      status: "Confirmed",
      caseId: "1",
    },
    {
      id: "2",
      title: "Court Hearing - Johnson vs. Smith",
      client: "Michael Johnson",
      date: "2024-02-20",
      time: "2:00 PM",
      duration: "2 hours",
      type: "Court Hearing",
      location: "Superior Court",
      status: "Confirmed",
      caseId: "1",
    },
  ];

  const deadlines: Deadline[] = [
    {
      id: "1",
      title: "File Motion to Dismiss",
      case: "Johnson vs. Smith",
      caseId: "1",
      date: "2024-02-16",
      priority: "High",
      status: "Pending",
      description: "Motion to dismiss must be filed before court deadline",
    },
    {
      id: "2",
      title: "Submit Discovery Responses",
      case: "Davis Divorce",
      caseId: "4",
      date: "2024-02-19",
      priority: "Medium",
      status: "In Progress",
      description: "Discovery responses due to opposing counsel",
    },
  ];

  // Get current month and year
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const currentDay = selectedDate.getDate();

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (date: string) => {
    const dayAppointments = appointments.filter(apt => apt.date === date);
    const dayDeadlines = deadlines.filter(dl => dl.date === date);
    return [...dayAppointments, ...dayDeadlines];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setSelectedDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const getWeekRange = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const getDayDisplay = () => {
    return selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Week view component
  const WeekView = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Week View</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                Previous Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                Next Week
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={index} className="border border-border rounded-lg p-2 min-h-[200px]">
                <div className="font-semibold text-sm mb-2">
                  {day.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' })}
                </div>
                <div className="space-y-1">
                  {getEventsForDate(day.toISOString().split('T')[0]).map((event, eventIndex) => (
                    <div key={eventIndex} className="text-xs p-1 bg-blue-100 rounded">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-muted-foreground">
                        {'time' in event ? event.time : 'Deadline'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Day view component
  const DayView = () => {
    const dayEvents = getEventsForDate(selectedDate.toISOString().split('T')[0]);

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Daily Schedule: {getDayDisplay()}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateDay('prev')}>
                Previous Day
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateDay('next')}>
                Next Day
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dayEvents.length > 0 ? (
              dayEvents.map((event, index) => {
                const isAppointment = 'client' in event;
                return (
                  <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="text-sm font-medium">
                        {'time' in event ? event.time : 'All Day'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {isAppointment ? event.client : event.case}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isAppointment ? event.location : 'Deadline'}
                      </div>
                    </div>
                    <div>
                      <Badge className={isAppointment ? getStatusColor(event.status) : getPriorityColor(event.priority)}>
                        {isAppointment ? event.status : event.priority}
                      </Badge>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-muted-foreground py-8">No events scheduled for this day</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Get upcoming events
  const upcomingEvents = [...appointments, ...deadlines]
    .filter(event => {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-2">
            Manage appointments, court dates, and deadlines
          </p>
        </div>
        <Link href="/dashboard/quick-actions/new-appointment">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            New Appointment
          </Button>
        </Link>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {viewMode === "month" && (
            <>
              <Button variant="outline" onClick={() => navigateMonth('prev')}>
                Previous
              </Button>
              <h2 className="text-xl font-semibold">{formatDate(selectedDate)}</h2>
              <Button variant="outline" onClick={() => navigateMonth('next')}>
                Next
              </Button>
            </>
          )}
          {viewMode === "week" && (
            <>
              <Button variant="outline" onClick={() => navigateWeek('prev')}>
                Previous
              </Button>
              <h2 className="text-xl font-semibold">{getWeekRange()}</h2>
              <Button variant="outline" onClick={() => navigateWeek('next')}>
                Next
              </Button>
            </>
          )}
          {viewMode === "day" && (
            <>
              <Button variant="outline" onClick={() => navigateDay('prev')}>
                Previous
              </Button>
              <h2 className="text-xl font-semibold">{getDayDisplay()}</h2>
              <Button variant="outline" onClick={() => navigateDay('next')}>
                Next
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("month")}
          >
            Month
          </Button>
          <Button 
            variant={viewMode === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("week")}
          >
            Week
          </Button>
          <Button 
            variant={viewMode === "day" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("day")}
          >
            Day
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Table (smaller) */}
        <div className="lg:col-span-2">
          {viewMode === "month" && (
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-px bg-gray-200 text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-gray-100 p-1 text-center font-medium text-xs">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {generateCalendarDays().map((day, index) => {
                    const date = day ? new Date(currentYear, currentMonth, day) : null;
                    const dateStr = date ? date.toISOString().split('T')[0] : '';
                    const events = getEventsForDate(dateStr);
                    
                    return (
                      <div
                        key={index}
                        className={`bg-white p-1 min-h-16 border border-gray-200 relative ${
                          day === currentDay ? 'bg-blue-50' : ''
                        }`}
                      >
                        {day && (
                          <>
                            <div className="font-bold text-xs mb-0.5">{day}</div>
                            {events.length > 0 && (
                              <div className="space-y-0.5">
                                {events.slice(0, 1).map((event, i) => (
                                  <div key={i} className="text-[10px] bg-blue-100 p-0.5 rounded truncate">
                                    {event.title}
                                  </div>
                                ))}
                                {events.length > 1 && (
                                  <div className="text-[8px] text-gray-500">+{events.length - 1}</div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
          {viewMode === "week" && <WeekView />}
          {viewMode === "day" && <DayView />}
        </div>

        {/* Upcoming Appointments Table */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <p className="text-sm text-muted-foreground">
                Next 5 scheduled events
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => {
                  const isAppointment = 'client' in event;
                  const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium text-sm">{event.title}</div>
                        <Badge className={isAppointment ? getStatusColor(event.status) : getPriorityColor(event.priority)}>
                          {isAppointment ? event.status : event.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isAppointment ? event.client : event.case}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.date}
                        {isAppointment && event.time && ` at ${event.time}`}
                        {daysUntil >= 0 && ` • ${daysUntil} days`}
                      </p>
                    </div>
                  );
                })}
                {upcomingEvents.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming events
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
