"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Edit2, Trash2, Clock, AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  description: string;
  caseId: string;
  caseName: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "Review" | "Completed";
  category: "Document Review" | "Court Filing" | "Client Communication" | "Research" | "Discovery" | "Deposition" | "Negotiation" | "Trial Prep" | "Administrative";
  dueDate: string;
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
  billable: boolean;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
}

interface Case {
  id: string;
  name: string;
  client: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review Discovery Documents",
      description: "Review and analyze all discovery documents received from opposing counsel",
      caseId: "1",
      caseName: "Johnson vs. Smith",
      priority: "High",
      status: "In Progress",
      category: "Discovery",
      dueDate: "2024-02-20",
      assignedTo: "Attorney Smith",
      createdAt: "2024-02-10",
      billable: true,
      estimatedHours: 4,
      actualHours: 2.5,
      tags: ["urgent", "discovery"]
    },
    {
      id: "2",
      title: "Draft Motion to Dismiss",
      description: "Prepare motion to dismiss based on lack of jurisdiction",
      caseId: "2",
      caseName: "Williams Estate",
      priority: "Critical",
      status: "To Do",
      category: "Court Filing",
      dueDate: "2024-02-18",
      assignedTo: "Attorney Smith",
      createdAt: "2024-02-12",
      billable: true,
      estimatedHours: 3,
      actualHours: 0,
      tags: ["court", "deadline"]
    },
    {
      id: "3",
      title: "Client Consultation Follow-up",
      description: "Follow up with client regarding settlement options",
      caseId: "3",
      caseName: "Davis Divorce",
      priority: "Medium",
      status: "To Do",
      category: "Client Communication",
      dueDate: "2024-02-22",
      assignedTo: "Attorney Smith",
      createdAt: "2024-02-14",
      billable: false,
      estimatedHours: 1,
      actualHours: 0,
      tags: ["client", "communication"]
    }
  ]);

  const [cases] = useState<Case[]>([
    { id: "1", name: "Johnson vs. Smith", client: "Michael Johnson" },
    { id: "2", name: "Williams Estate", client: "Sarah Williams" },
    { id: "3", name: "Davis Divorce", client: "Jennifer Davis" },
    { id: "4", name: "TechCorp Contract", client: "TechCorp Inc." }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterCase, setFilterCase] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("priority");
  const [searchQuery, setSearchQuery] = useState("");

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    caseId: "",
    priority: "Medium",
    status: "To Do",
    category: "Document Review",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    assignedTo: "Attorney Smith",
    billable: true,
    estimatedHours: 1,
    actualHours: 0,
    tags: []
  });

  const categories: Task["category"][] = [
    "Document Review",
    "Court Filing",
    "Client Communication",
    "Research",
    "Discovery",
    "Deposition",
    "Negotiation",
    "Trial Prep",
    "Administrative"
  ];

  const priorities: Task["priority"][] = ["Critical", "High", "Medium", "Low"];
  const statuses: Task["status"][] = ["To Do", "In Progress", "Review", "Completed"];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Review": return "bg-purple-100 text-purple-800 border-purple-200";
      case "To Do": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Document Review": return "📄";
      case "Court Filing": return "⚖️";
      case "Client Communication": return "💬";
      case "Research": return "🔍";
      case "Discovery": return "📋";
      case "Deposition": return "🎤";
      case "Negotiation": return "🤝";
      case "Trial Prep": return "🎯";
      case "Administrative": return "📊";
      default: return "📌";
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filterStatus !== "all" && task.status !== filterStatus) return false;
      if (filterPriority !== "all" && task.priority !== filterPriority) return false;
      if (filterCase !== "all" && task.caseId !== filterCase) return false;
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !task.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.caseId) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || "",
      caseId: newTask.caseId,
      caseName: cases.find(c => c.id === newTask.caseId)?.name || "",
      priority: newTask.priority || "Medium",
      status: newTask.status || "To Do",
      category: newTask.category || "Document Review",
      dueDate: newTask.dueDate || format(new Date(), "yyyy-MM-dd"),
      assignedTo: newTask.assignedTo || "Attorney Smith",
      createdAt: format(new Date(), "yyyy-MM-dd"),
      billable: newTask.billable || false,
      estimatedHours: newTask.estimatedHours || 1,
      actualHours: newTask.actualHours || 0,
      tags: newTask.tags || []
    };
    
    setTasks([...tasks, task]);
    setShowCreateModal(false);
    setNewTask({
      title: "",
      description: "",
      caseId: "",
      priority: "Medium",
      status: "To Do",
      category: "Document Review",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      assignedTo: "Attorney Smith",
      billable: true,
      estimatedHours: 1,
      actualHours: 0,
      tags: []
    });
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setShowEditModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === "Completed" ? "To Do" : "Completed";
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === "Completed" ? format(new Date(), "yyyy-MM-dd") : undefined
        };
      }
      return task;
    }));
  };

  const TaskForm = ({ task, onSave, isEdit = false }: { task: Partial<Task>, onSave: (task: Task) => void, isEdit?: boolean }) => {
    const [formData, setFormData] = useState(task);

    return (
      <div className="space-y-4">
        <div>
          <Label>Task Title</Label>
          <Input
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter task title"
          />
        </div>
        
        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter task description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Case</Label>
            <Select
              value={formData.caseId || ""}
              onValueChange={(value) => setFormData({ ...formData, caseId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select case" />
              </SelectTrigger>
              <SelectContent>
                {cases.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={formData.category || "Document Review"}
              onValueChange={(value) => setFormData({ ...formData, category: value as Task["category"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Priority</Label>
            <Select
              value={formData.priority || "Medium"}
              onValueChange={(value) => setFormData({ ...formData, priority: value as Task["priority"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Status</Label>
            <Select
              value={formData.status || "To Do"}
              onValueChange={(value) => setFormData({ ...formData, status: value as Task["status"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={formData.dueDate || format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div>
            <Label>Estimated Hours</Label>
            <Input
              type="number"
              min="0.5"
              step="0.5"
              value={formData.estimatedHours || 1}
              onChange={(e) => setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={formData.billable || false}
            onCheckedChange={(checked) => setFormData({ ...formData, billable: checked as boolean })}
          />
          <Label>Billable Hours</Label>
        </div>

        <Button onClick={() => onSave({ ...formData, id: formData.id || Date.now().toString() } as Task)}>
          {isEdit ? "Update Task" : "Create Task"}
        </Button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Legal Tasks</h1>
          <p className="text-muted-foreground mt-2">
            Manage all legal tasks and deadlines in one place
          </p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Legal Task</DialogTitle>
            </DialogHeader>
            <TaskForm task={newTask} onSave={handleCreateTask} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorities.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Case</Label>
              <Select value={filterCase} onValueChange={setFilterCase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cases</SelectItem>
                  {cases.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="grid gap-4">
        {filteredTasks.map(task => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => handleToggleStatus(task.id)}
                    className="mt-1"
                  >
                    {task.status === "Completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{getCategoryIcon(task.category)}</span>
                      <h3 className={`font-semibold ${task.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      {task.billable && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Billable
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>
                        <Link href={`/cases/${task.caseId}`} className="hover:underline">
                          {task.caseName}
                        </Link>
                      </span>
                      <span className="flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                      </span>
                      <span>
                        Est: {task.estimatedHours}h
                        {task.actualHours > 0 && ` • Actual: ${task.actualHours}h`}
                      </span>
                    </div>
                    
                    {task.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingTask(task);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Legal Task</DialogTitle>
                      </DialogHeader>
                      {editingTask && (
                        <TaskForm task={editingTask} onSave={handleUpdateTask} isEdit />
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No tasks found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
