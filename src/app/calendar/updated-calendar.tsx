"use client";

import { useState } from "react";
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

export default function UpdatedCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const generateWeekDays = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    
    return weekDays;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayAppointments = appointments.filter(apt => apt.date === dateStr);
    const dayDeadlines = deadlines.filter(dl => dl.date === dateStr);
    
    return [...dayAppointments, ...dayDeadlines];
  };

  const hasEventsOnDate = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Week view component
  const WeekView = () => {
    const weekDays = generateWeekDays();
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Week View: {getWeekRange()}</CardTitle>
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
                  {getEventsForDate(day).map((event, eventIndex) => (
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
    const dayEvents = getEventsForDate(selectedDate);

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
              dayEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="text-sm font-medium">
                      {'time' in event ? event.time : 'All Day'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {'client' in event ? event.client : event.case}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {'location' in event ? event.location : 'Deadline'}
                    </div>
                  </div>
                  <div>
                    <Badge className={'status' in event ? getStatusColor(event.status) : getPriorityColor(event.priority)}>
                      {'status' in event ? event.status : event.priority}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No events scheduled for this day</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
      <div className="flex justify-between items-center">
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

      {/* View Content */}
      {viewMode === "month" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((day, index) => {
                    const date = day ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day) : null;
                    return (
                      <div
                        key={index}
                        className={`
                          aspect-square p-2 text-sm border border-border rounded
                          ${day ? 'hover:bg-accent cursor-pointer' : ''}
                          ${date && hasEventsOnDate(date) ? 'bg-primary/10 border-primary/30' : ''}
                          ${date && isWeekend(date) ? 'bg-red-50 border-red-200' : ''}
                        `}
                      >
                        {day && date && (
                          <div>
                            <span className={`font-medium ${isWeekend(date) ? 'text-red-700' : ''}`}>
                              {day}
                            </span>
                            {hasEventsOnDate(date) && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deadlines.map((deadline) => {
                    const daysUntil = Math.ceil((new Date(deadline.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={deadline.id} className="p-3 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Link href={`/cases/${deadline.caseId}`} className="font-medium text-foreground text-sm hover:underline">
                            {deadline.title}
                          </Link>
                          <Badge className={getPriorityColor(deadline.priority)} variant="outline">
                            {deadline.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <Link href={`/cases/${deadline.caseId}`} className="hover:underline">
                            {deadline.case}
                          </Link> • Due: {deadline.date}
                          {daysUntil >= 0 && ` • ${daysUntil} days remaining`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{deadline.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {viewMode === "week" && <WeekView />}
      {viewMode === "day" && <DayView />}

      {/* All Events and Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>All Events & Deadlines</CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete list of appointments and deadlines
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...appointments, ...deadlines].map((event, index) => {
              const isAppointment = 'client' in event;
              const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={index} className="flex justify-between items-center p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Badge className={isAppointment ? getStatusColor(event.status) : getPriorityColor(event.priority)}>
                        {isAppointment ? event.status : event.priority}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/cases/${event.caseId}`} className="font-medium text-foreground hover:underline">
                          {event.title}
                        </Link>
                        {isAppointment && (
                          <Badge className={getTypeColor(event.type)} variant="outline">
                            {event.type}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {isAppointment ? event.client : event.case} • {event.date}
                        {isAppointment && ` at ${event.time}`}
                        {daysUntil >= 0 && ` • ${daysUntil} days away`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isAppointment ? event.location : event.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/cases/${event.caseId}`}>
                      <Button variant="outline" size="sm">View Case</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
