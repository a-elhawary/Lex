"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square } from "lucide-react";

interface TimeEntry {
  id: string;
  description: string;
  client: string;
  case: string;
  hours: number;
  rate: number;
  amount: number;
}

interface Timer {
  id: string;
  client: string;
  case: string;
  description: string;
  startTime: Date;
  elapsedTime: number;
  isRunning: boolean;
}

export default function TimeTracker() {
  const [currentTimer, setCurrentTimer] = useState<Timer | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (client: string, caseName: string, description: string) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      client,
      case: caseName,
      description,
      startTime: new Date(),
      elapsedTime: 0,
      isRunning: true,
    };
    setCurrentTimer(newTimer);
  };

  const pauseTimer = () => {
    if (currentTimer) {
      setCurrentTimer({ ...currentTimer, isRunning: !currentTimer.isRunning });
    }
  };

  const stopTimer = () => {
    if (currentTimer) {
      const elapsed = Math.floor((Date.now() - currentTimer.startTime.getTime()) / 1000);
      const newEntry: TimeEntry = {
        id: currentTimer.id,
        description: currentTimer.description,
        client: currentTimer.client,
        case: currentTimer.case,
        hours: elapsed / 3600,
        rate: 150, // example rate
        amount: (elapsed / 3600) * 150,
      };
      setTimeEntries([...timeEntries, newEntry]);
      setCurrentTimer(null);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentTimer && currentTimer.isRunning) {
      interval = setInterval(() => {
        setCurrentTimer(prev => prev ? { ...prev, elapsedTime: Math.floor((Date.now() - prev.startTime.getTime()) / 1000) } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentTimer?.isRunning]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Time Tracker</h1>
          <p className="text-muted-foreground mt-2">
            Track time spent on cases and clients
          </p>
        </div>
        <Button onClick={() => startTimer("Example Client", "Example Case", "Work on case")}>
          Start Timer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Timer</CardTitle>
        </CardHeader>
        <CardContent>
          {currentTimer ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-mono">
                  {formatTime(currentTimer.elapsedTime)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTimer.client} - {currentTimer.case}
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => pauseTimer()}
                  variant={currentTimer.isRunning ? "outline" : "default"}
                >
                  {currentTimer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button onClick={() => stopTimer()} variant="destructive">
                  <Square className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No active timer
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{entry.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.client} • {entry.case} • {entry.hours.toFixed(2)}h @ ${entry.rate}/hr
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${entry.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
